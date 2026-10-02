import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { enviarRegistroInvitado } from '../services/api'

interface Actividad {
  id: string
  nombre: string
}

interface Dia {
  dia: string
  fecha: string
  actividades: Actividad[]
}

const agenda: Dia[] = [
  {
    dia: 'Miércoles',
    fecha: '22',
    actividades: [
      { id: 'mie-1', nombre: 'Actividades Acuáticas | Jetsky (Moto acuática), Seabob, Kayak, Standup Paddle y Boogie Boards.' },
      { id: 'mie-2', nombre: 'Spa | Zen Grand' },
    ],
  },
  {
    dia: 'Jueves',
    fecha: '23',
    actividades: [
      { id: 'jue-1', nombre: 'Actividades Acuáticas | Ruta de pesca, ruta sailing snorkel y ruta kayak & snorkel.' },
      { id: 'jue-2', nombre: 'Torneo de Golf amistoso | Gran Coyote' },
    ],
  }
]

const Actividades = () => {
  const navigate = useNavigate()

  // Estados con persistencia en localStorage
  const [seleccionadas, setSeleccionadas] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('actividades_draft_sel')
    if (saved) { try { return JSON.parse(saved) } catch { /* ignore */ } }
    return {}
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [tallas, setTallas] = useState(() => {
    const saved = localStorage.getItem('actividades_draft_tallas')
    if (saved) { try { return JSON.parse(saved) } catch { /* ignore */ } }
    return {
      tallaPlayera: '',
      tallaGuante: '',
      mano: '',
      handicap: '',
      equipo: '',
    }
  })

  // Guardar borradores en localStorage
  useEffect(() => {
    localStorage.setItem('actividades_draft_sel', JSON.stringify(seleccionadas))
  }, [seleccionadas])

  useEffect(() => {
    localStorage.setItem('actividades_draft_tallas', JSON.stringify(tallas))
  }, [tallas])

  // Constantes para opciones de golf
  const tallasPlayera = ['Extra chica', 'Chica', 'Mediana', 'Grande', 'Extra grande', 'Extra extra grande']
  const tallasGuante = ['Chico', 'Mediano', 'Grande']
  const manos = ['Diestro', 'Zurdo']
  const opcionesEquipo = ['Llevo mis propios palos de golf', 'Quiero rentar mi equipo']

  const handleSelect = (diaKey: string, actividadId: string) => {
    setSeleccionadas({ ...seleccionadas, [diaKey]: actividadId })
    setError('')
    // Si deselecciona golf, limpiar las tallas
    if (diaKey === '23' && actividadId !== 'jue-2') {
      setTallas({ tallaPlayera: '', tallaGuante: '', mano: '', handicap: '', equipo: '' })
    }
  }

  const handleTallaChange = (campo: 'tallaPlayera' | 'tallaGuante' | 'mano' | 'handicap' | 'equipo', valor: string) => {
    console.log(`Cambiando ${campo} a:`, valor)
    setTallas({ ...tallas, [campo]: valor })
    setError('') // Limpiar error cuando llena un campo
  }

  const handleSubmit = async () => {
    console.log('=== INICIO SUBMIT ===')
    console.log('Tallas actuales:', tallas)
    console.log('Actividades seleccionadas:', seleccionadas)
    
    // Validar que seleccionó al menos una actividad
    const diasConActividad = agenda.filter(
      (dia) => seleccionadas[dia.fecha]
    )
    if (diasConActividad.length === 0) {
      setError('Selecciona al menos una actividad')
      return
    }

    // Si seleccionó golf, validar que llenó todos los campos
    if (seleccionadas['23'] === 'jue-2') {
      console.log('Golf seleccionado, validando tallas...')
      if (!tallas.tallaPlayera || !tallas.tallaGuante || !tallas.mano || !tallas.handicap.trim() || !tallas.equipo) {
        console.log('Falta llenar campos de golf')
        setError('Por favor completa todos los campos de golf')
        return
      }
      console.log('Todos los campos de golf completos ✓')
    }

    // Obtener datos del registro inicial
    const datosRegistro = sessionStorage.getItem('registroInvitado')
    console.log('Datos en sessionStorage:', datosRegistro)
    
    if (!datosRegistro) {
      setError('Error: No se encontraron los datos del registro. Por favor inicia de nuevo.')
      setTimeout(() => navigate('/registro'), 2000)
      return
    }

    try {
      setLoading(true)
      setError('')

      const registroInicial = JSON.parse(datosRegistro)

      // Mapear actividades seleccionadas con sus nombres
      const actividadesSeleccionadas = Object.entries(seleccionadas).map(([fecha, actividadId]) => {
        const dia = agenda.find(d => d.fecha === fecha)
        const actividad = dia?.actividades.find(a => a.id === actividadId)
        
        const actividadData: any = {
          fecha,
          dia: dia?.dia,
          actividadId,
          nombre: actividad?.nombre
        }

        // Si es golf, agregar las tallas
        if (actividadId === 'jue-2') {
          actividadData.opciones = {
            tallaPlayera: tallas.tallaPlayera,
            tallaGuante: tallas.tallaGuante,
            mano: tallas.mano,
            handicap: tallas.handicap,
            equipo: tallas.equipo
          }
        }

        return actividadData
      })

      // Combinar todo
      const registroCompleto = {
        ...registroInicial,
        actividades: actividadesSeleccionadas
      }

      // Enviar registro al backend
      await enviarRegistroInvitado(registroCompleto)
      
      // Limpiar sessionStorage y borradores
      sessionStorage.removeItem('registroInvitado')
      localStorage.removeItem('actividades_draft_sel')
      localStorage.removeItem('actividades_draft_tallas')
      localStorage.removeItem('registro_draft')
      
      // Navegar a confirmación
      navigate('/registro/confirmacion')

    } catch (err: any) {
      console.error('Error enviando registro:', err)
      setError(err.message || 'Error al enviar el registro. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex flex-col">

      <Navbar />

      {/* Contenido */}
      <div className="flex flex-col px-5 pt-24 pb-10 gap-8">

        {/* Título */}
        <h1 className="font-orbitron font-bold text-4xl text-center bg-gradient-to-r from-[#51A2FF] to-[#C27AFF] bg-clip-text text-transparent leading-tight">
          Agenda tus actividades
        </h1>

        {/* Días y actividades */}
        <div className="flex flex-col gap-8">
          {agenda.map((dia) => (
            <div key={dia.fecha} className="flex flex-col gap-4">

              {/* Título del día */}
              <h2 className="font-montserrat font-bold text-lg bg-gradient-to-r from-[#51A2FF] to-[#C27AFF] bg-clip-text text-transparent text-left">
                {dia.dia} {dia.fecha}
              </h2>

              {/* Actividades */}
              <div className="flex flex-col gap-3">
                {dia.actividades.map((actividad) => {
                  const selected = seleccionadas[dia.fecha] === actividad.id
                  return (
                    <button
                      key={actividad.id}
                      onClick={() => handleSelect(dia.fecha, actividad.id)}
                      className={`flex items-center justify-between px-5 py-5 rounded-2xl
                        border transition-all duration-300 text-left
                        ${selected
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-white/10 bg-[#0d1229] hover:border-white/20'
                        }`}
                    >
                      <span className="font-montserrat text-white text-sm">
                        {actividad.nombre}
                      </span>

                      {/* Radio circle */}
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                        ${selected ? 'border-purple-500' : 'border-white/30'}`}>
                        {selected && (
                          <div className="w-3 h-3 rounded-full bg-purple-500" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Campos extra solo si seleccionó Golf */}
              {seleccionadas['23'] === 'jue-2' && dia.fecha === '23' && (
                <div className="bg-gradient-to-br from-[rgba(173,70,255,0.1)] to-[rgba(225,42,251,0.1)] border border-white/10 rounded-2xl px-5 py-5 flex flex-col gap-5">

                  {/* Talla de playera */}
                  <div className="flex flex-col gap-3">
                    <span className="font-montserrat text-white/60 text-sm text-left">
                      Talla de playera marca Lululemon
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {tallasPlayera.map((talla) => (
                        <button
                          key={talla}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTallaChange('tallaPlayera', talla)
                          }}
                          className={`px-4 py-2 rounded-full border text-sm font-montserrat transition-all duration-300
                            ${tallas.tallaPlayera === talla
                              ? 'border-purple-500 bg-purple-500/10 text-white'
                              : 'border-white/20 text-white/70 hover:border-white/40'
                            }`}
                        >
                          {talla}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Talla de guante */}
                  <div className="flex flex-col gap-3">
                    <span className="font-montserrat text-white/60 text-sm text-left">
                      Talla de guante
                    </span>
                    <div className="flex flex-col gap-2">
                      {tallasGuante.map((talla) => (
                        <button
                          key={talla}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTallaChange('tallaGuante', talla)
                          }}
                          className={`w-full py-4 rounded-xl border text-sm font-montserrat transition-all duration-300
                            ${tallas.tallaGuante === talla
                              ? 'border-purple-500 bg-purple-500/10 text-white'
                              : 'border-white/10 bg-[#0a0e1a] text-white/70 hover:border-white/30'
                            }`}
                        >
                          {talla}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Zurdo o diestro */}
                  <div className="flex flex-col gap-3">
                    <span className="font-montserrat text-white/60 text-sm text-left">
                      ¿Eres zurdo o diestro?
                    </span>
                    <div className="flex flex-col gap-2">
                      {manos.map((mano) => (
                        <button
                          key={mano}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTallaChange('mano', mano)
                          }}
                          className={`w-full py-4 rounded-xl border text-sm font-montserrat transition-all duration-300
                            ${tallas.mano === mano
                              ? 'border-purple-500 bg-purple-500/10 text-white'
                              : 'border-white/10 bg-[#0a0e1a] text-white/70 hover:border-white/30'
                            }`}
                        >
                          {mano}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Handicap */}
                  <div className="flex flex-col gap-3">
                    <span className="font-montserrat text-white/60 text-sm text-left">
                      Handicap
                    </span>
                    <div className="flex items-center gap-3 bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-4">
                      <input
                        type="text"
                        value={tallas.handicap}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleTallaChange('handicap', e.target.value)}
                        placeholder="Ingresa tu handicap"
                        className="bg-transparent text-white placeholder-white/40 font-montserrat text-sm w-full outline-none"
                      />
                    </div>
                  </div>

                  {/* Equipo de golf */}
                  <div className="flex flex-col gap-3">
                    <span className="font-montserrat text-white/60 text-sm text-left">
                      ¿Llevas tus propios palos de golf o requieres renta de equipo?
                    </span>
                    <div className="flex flex-col gap-2">
                      {opcionesEquipo.map((opcion) => (
                        <button
                          key={opcion}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTallaChange('equipo', opcion)
                          }}
                          className={`w-full py-4 rounded-xl border text-sm font-montserrat transition-all duration-300
                            ${tallas.equipo === opcion
                              ? 'border-purple-500 bg-purple-500/10 text-white'
                              : 'border-white/10 bg-[#0a0e1a] text-white/70 hover:border-white/30'
                            }`}
                        >
                          {opcion}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
            <p className="text-red-400 text-xs font-montserrat text-center">{error}</p>
          </div>
        )}

        {/* Botón enviar */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 rounded-full border border-purple-500 text-white
            font-montserrat font-semibold text-sm tracking-wide
            hover:bg-purple-500/10 transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Enviando...' : 'Enviar registro'}
        </button>

      </div>
    </div>
  )
}

export default Actividades
