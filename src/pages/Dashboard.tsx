import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout, obtenerRegistrosInvitados } from "../services/api";

interface RegistroInvitado {
  id?: string;
  nombre: string;
  correo: string;
  fechaSalida: string;
  fechaRegreso: string;
  numeroReservacion: string;
  actividades?: any[];
  fechaRegistro?: string;
  [key: string]: any;
}

const DASHBOARD_CACHE_KEY = 'dashboard_cache'
const DASHBOARD_TTL = 5 * 60 * 1000 // 5 minutos

const Dashboard: React.FC = () => {
  const [invitados, setInvitados] = useState<RegistroInvitado[]>(() => {
    const cached = localStorage.getItem(DASHBOARD_CACHE_KEY)
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < DASHBOARD_TTL) return data
      } catch { /* ignore */ }
    }
    return []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      const data = await obtenerRegistrosInvitados();
      setInvitados(data);
      localStorage.setItem(DASHBOARD_CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al cargar datos";
      setError(errorMessage);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = (): void => {
    logout();
    navigate("/auth-login");
  };

  const camposExcluidos = ['activo', 'eventoId'];

  const formatearActividades = (actividades: any[]): string => {
    if (!Array.isArray(actividades) || actividades.length === 0) return 'Sin actividades';
    return actividades.map((act) => {
      let texto = `${act.dia || ''} ${act.fecha || ''}: ${act.nombre || ''}`;
      if (act.opciones) {
        const opts = act.opciones;
        const detalles = [
          opts.tallaPlayera && `Playera: ${opts.tallaPlayera}`,
          opts.tallaGuante && `Guante: ${opts.tallaGuante}`,
          opts.mano && `Mano: ${opts.mano}`,
          opts.handicap && `Handicap: ${opts.handicap}`,
          opts.equipo && `Equipo: ${opts.equipo}`,
        ].filter(Boolean).join(' | ');
        if (detalles) texto += ` (${detalles})`;
      }
      return texto;
    }).join('\n');
  };

  const formatearValor = (key: string, value: any): string => {
    if (key === 'actividades' && Array.isArray(value)) {
      return formatearActividades(value);
    }
    if (typeof value === 'object' && value !== null) return JSON.stringify(value);
    return String(value ?? '');
  };

  const filtrarCampos = (record: any) => {
    const filtered: any = {};
    for (const key of Object.keys(record)) {
      if (!camposExcluidos.includes(key)) {
        filtered[key] = formatearValor(key, record[key]);
      }
    }
    return filtered;
  };

  const downloadExcel = async (data: any[], filename: string): Promise<void> => {
    if (data.length === 0) {
      alert("No hay datos para descargar");
      return;
    }

    const XLSX = await import("xlsx");
    const dataFiltrada = data.map(filtrarCampos);
    const ws = XLSX.utils.json_to_sheet(dataFiltrada);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registros");
    XLSX.writeFile(wb, `${filename}_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Cargando datos...</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ margin: 0 }}>Dashboard - Administración</h1>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ff4444",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          color: "red",
          backgroundColor: "#ffebee",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "20px"
        }}>
          {error}
        </div>
      )}

      {/* Actions */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => downloadExcel(invitados, 'registros_invitados')}
          disabled={invitados.length === 0}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: invitados.length === 0 ? 'not-allowed' : 'pointer',
            opacity: invitados.length === 0 ? 0.5 : 1,
          }}
        >
          Descargar Excel ({invitados.length} registros)
        </button>
        
      </div>

      {/* Table */}
      <h2>Invitados Registrados ({invitados.length})</h2>
      <div style={{ overflowX: "auto", maxHeight: "70vh", overflowY: "auto", border: "1px solid #ddd", borderRadius: "8px" }}>
        {invitados.length === 0 ? (
          <p style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            No hay invitados registrados
          </p>
        ) : (
          <table style={{ minWidth: "1200px", width: "100%", borderCollapse: "collapse", backgroundColor: "white", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", tableLayout: "auto" }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5", position: "sticky", top: 0, zIndex: 1 }}>
                {invitados[0] && Object.keys(invitados[0]).filter(k => !camposExcluidos.includes(k)).map((key) => (
                  <th
                    key={key}
                    style={{
                      border: "1px solid #ddd",
                      padding: "10px 14px",
                      textAlign: "left",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      whiteSpace: "nowrap",
                      fontSize: "14px",
                      color: "#1a1a1a"
                    }}
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invitados.map((record, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "#f9f9f9" }}>
                  {Object.entries(record).filter(([key]) => !camposExcluidos.includes(key)).map(([key, value], i) => (
                    <td
                      key={i}
                      style={{
                        border: "1px solid #ddd",
                      padding: "10px 14px",
                      minWidth: "120px",
                      maxWidth: "350px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "pre-line",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#1a1a1a",
                      verticalAlign: "top"
                      }}
                      title={formatearValor(key, value)}
                    >
                      {formatearValor(key, value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;