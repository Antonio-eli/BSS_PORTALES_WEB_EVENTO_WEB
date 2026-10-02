import axios from "axios";
import { isAxiosError } from "axios";
import type { AxiosInstance } from "axios";

// Tipos de datos
interface User {
  usuario: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface Registro {
  id?: string;
  nombre: string;
  evento: string;
  imagen?: string;  
  fechaCreacion?: string;
  [key: string]: any;
}

interface RegistroFormData {
  nombre: string;
  evento: string;
  imagen: File;
}

interface RegistroInvitado {
  nombre: string;
  correo: string;
  fechaSalida: string;
  fechaRegreso: string;
  numeroReservacion: string;
  actividades: Array<{
    fecha: string;
    dia: string;
    actividadId: string;
    nombre: string;
    opciones?: {
      tallaPlayera?: string;
      tallaGuante?: string;
      mano?: string;
    };
  }>;
}

// Tipo para las APIs
type AuthAPI = {
  formData: User;
}

type RegistroAPI = {
  formData: RegistroFormData;
  registroId: Registro['id'];
}

// Variables de entorno
const API_URL = import.meta.env.VITE_API_URL as string;

// Configurar axios para incluir el token automáticamente
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API Functions
export async function authenticateUser({ formData }: Pick<AuthAPI, 'formData'>) {
  try {
    const { data } = await axios.post<LoginResponse>(`${API_URL}/eventos-login`, formData);
    localStorage.setItem("AUTH_TOKEN", data.token);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.error || "Error de autenticación");
    }
    throw new Error("Error de conexión");
  }
}

// Registro API Functions
export async function createRegistro({ formData }: Pick<RegistroAPI, 'formData'>) {
  try {
    // Enviar como multipart/form-data para subida de imágenes a S3
    const form = new FormData();
    form.append("nombre", formData.nombre.trim());
    form.append("evento", formData.evento);
    form.append("imagen", formData.imagen);

    const { data } = await api.post<string>("/negocios", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.error || "Error al crear registro");
    }
    throw new Error("Error de conexión");
  }
}

export async function getRegistros(): Promise<Registro[]> {
  try {
    const { data: raw } = await api.get("/eventos-web");
    const parsed = typeof raw.body === 'string' ? JSON.parse(raw.body) : raw;
    return parsed.registros || parsed || [];
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.error || "Error al obtener registros");
    }
    throw new Error("Error de conexión");
  }
}

export async function getRegistroById({ registroId }: Pick<RegistroAPI, 'registroId'>) {
  try {
    const url = `/${registroId}`;
    const { data } = await api.get<Registro>(url);
    
    // Aquí podrías agregar validación con schema
    // const response = registroSchema.safeParse(data);
    // if (response.success) {
    //   return response.data;
    // }
    
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.error || "Error al obtener registro");
    }
    throw new Error("Error de conexión");
  }
}

export async function updateRegistro({ registroId, formData }: Pick<RegistroAPI, 'registroId' | 'formData'>) {
  try {
    // Enviar como multipart/form-data para subida de imágenes a S3
    const form = new FormData();
    form.append("nombre", formData.nombre.trim());
    form.append("evento", formData.evento);
    form.append("imagen", formData.imagen);

    const url = `/negocios/${registroId}`;
    const { data } = await api.put<string>(url, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.error || "Error al actualizar registro");
    }
    throw new Error("Error de conexión");
  }
}

export async function deleteRegistro({ registroId }: Pick<RegistroAPI, 'registroId'>) {
  try {
    const url = `/negocios/${registroId}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.error || "Error al eliminar registro");
    }
    throw new Error("Error de conexión");
  }
}

// Utility Functions
export function logout(): void {
  localStorage.removeItem("AUTH_TOKEN");
}

export function getAuthToken(): string | null {
  return localStorage.getItem("AUTH_TOKEN");
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

// ===================================================
// REGISTRO DE INVITADOS CON ACTIVIDADES
// ===================================================
export async function enviarRegistroInvitado(datos: RegistroInvitado) {
  try {
    const { data } = await axios.post(`${API_URL}/eventos-web`, datos, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || error.response.data?.error || "Error al enviar el registro");
    }
    throw new Error("Error de conexión con el servidor");
  }
}

// ===================================================
// OBTENER REGISTROS DE INVITADOS
// ===================================================
export async function obtenerRegistrosInvitados() {
  try {
    const { data: raw } = await axios.get(`${API_URL}/eventos-web?tipo=registros`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsed = typeof raw.body === 'string' ? JSON.parse(raw.body) : raw;
    return parsed.registros || [];
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || error.response.data?.error || "Error al obtener registros");
    }
    throw new Error("Error de conexión con el servidor");
  }
}

// Mantener compatibilidad con el código existente (deprecated)
export const authAPI = {
  login: (usuario: string, password: string) => 
    authenticateUser({ formData: { usuario, password } }),
};

export const negociosAPI = {
  registro: (formData: FormData) => {
    // Convertir FormData a nuestro tipo
    const nombre = formData.get("nombre") as string;
    const evento = formData.get("evento") as string;
    const imagen = formData.get("imagen") as File;
    
    return createRegistro({ formData: { nombre, evento, imagen } });
  },
  getRegistros,
};

export default api;