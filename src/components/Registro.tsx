import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Calendar, Plane } from 'lucide-react'
import Navbar from './Navbar'

const Registro = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState(() => {
        const saved = localStorage.getItem('registro_draft')
        if (saved) {
            try { return JSON.parse(saved) } catch { /* ignore */ }
        }
        return {
            nombre: '',
            correo: '',
            fechaSalida: '',
            fechaRegreso: '',
            numeroReservacion: '',
        }
    })

    // Guardar borrador en localStorage cuando cambia el form
    useEffect(() => {
        localStorage.setItem('registro_draft', JSON.stringify(form))
    }, [form])

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [generalError, setGeneralError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: '' })
        if (generalError) setGeneralError('')
    }

    const validate = () => {
        const newErrors: Record<string, string> = {}
        if (!form.nombre.trim()) newErrors.nombre = 'Campo requerido'
        if (!form.correo.trim()) newErrors.correo = 'Campo requerido'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo))
            newErrors.correo = 'Correo inválido'
        if (!form.fechaSalida) newErrors.fechaSalida = 'Campo requerido'
        if (!form.fechaRegreso) newErrors.fechaRegreso = 'Campo requerido'
        if (!form.numeroReservacion.trim())
            newErrors.numeroReservacion = 'Campo requerido'
        return newErrors
    }

    const handleSubmit = () => {
        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setGeneralError('Es necesario que introduzcas todos los datos para seguir adelante')
            return
        }
        setGeneralError('')
        
        // Guardar datos en sessionStorage para usarlos en el siguiente paso
        sessionStorage.setItem('registroInvitado', JSON.stringify(form))
        // Limpiar borrador al avanzar
        localStorage.removeItem('registro_draft')
        
        // Navegar a selección de actividades
        navigate('/registro/actividades')
    }

    return (
        <div className="min-h-screen bg-[#0a0e1a] flex flex-col items-center">

            <Navbar />

            {/* Contenido */}
            <div className="flex flex-col px-5 pt-24 pb-10 gap-8 w-full max-w-md">

                {/* Título */}
                <h1 className="font-orbitron font-semibold text-[2.25rem] leading-[2.5rem] tracking-normal text-center bg-gradient-to-r from-[#51A2FF] to-[#C27AFF] bg-clip-text text-transparent">
                    Registro
                </h1>

                <p className="font-montserrat font-normal text-white/60 text-[1rem] leading-[1.3125rem] tracking-normal text-center w-[20.8125rem] h-[2.5625rem] mx-auto">
                    Antes de continuar con el formulario, debes tener tu itinerario de vuelo.
                </p>

                {/* Sección: Información del invitado */}
                <div className="flex flex-col gap-4">
                    <h2 className="font-montserrat font-bold text-[1.25rem] leading-[1.75rem] tracking-normal text-center bg-gradient-to-r from-[#51A2FF] to-[#C27AFF] bg-clip-text text-transparent">
                        Información del invitado
                    </h2>

                    {/* Nombre completo */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3 bg-[#0d1229] border border-white/10 rounded-xl px-4 py-4">
                            <User size={18} className="text-blue-400 flex-shrink-0" />
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre completo*"
                                value={form.nombre}
                                onChange={handleChange}
                                className="bg-transparent text-white placeholder-white/40 font-montserrat text-sm w-full outline-none"
                            />
                        </div>
                        {errors.nombre && (
                            <span className="text-red-400 text-xs font-montserrat px-1">{errors.nombre}</span>
                        )}
                    </div>

                    {/* Correo corporativo */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3 bg-[#0d1229] border border-white/10 rounded-xl px-4 py-4">
                            <Mail size={18} className="text-blue-400 flex-shrink-0" />
                            <input
                                type="email"
                                name="correo"
                                placeholder="Correo corporativo*"
                                value={form.correo}
                                onChange={handleChange}
                                className="bg-transparent text-white placeholder-white/40 font-montserrat text-sm w-full outline-none"
                            />
                        </div>
                        {errors.correo && (
                            <span className="text-red-400 text-xs font-montserrat px-1">{errors.correo}</span>
                        )}
                    </div>
                </div>

                {/* Sección: Vuelos */}
                <div className="flex flex-col gap-4">
                    <h2 className="font-montserrat font-semibold text-base text-center bg-gradient-to-r from-[#51A2FF] to-[#C27AFF] bg-clip-text text-transparent">
                        Vuelos
                    </h2>

                    {/* Fecha de salida */}
                    <div className="flex flex-col gap-1">
                        <label className="font-montserrat text-white/60 text-sm px-1 text-left">
                            Fecha de salida*
                        </label>
                        <div className="flex items-center gap-3 bg-[#0d1229] border border-white/10 rounded-xl px-4 py-4">
                            <Calendar size={18} className="text-blue-400 flex-shrink-0" />
                            <input
                                type="date"
                                name="fechaSalida"
                                placeholder="Fecha de salida*"
                                value={form.fechaSalida}
                                onChange={handleChange}
                                className="bg-transparent text-white placeholder-white/40 font-montserrat text-sm w-full outline-none [color-scheme:dark]"
                            />
                        </div>
                        {errors.fechaSalida && (
                            <span className="text-red-400 text-xs font-montserrat px-1">{errors.fechaSalida}</span>
                        )}
                    </div>

                    {/* Fecha de regreso */}
                    <div className="flex flex-col gap-1">
                        <label className="font-montserrat text-white/60 text-sm px-1 text-left">
                            Fecha de regreso*
                        </label>
                        <div className="flex items-center gap-3 bg-[#0d1229] border border-white/10 rounded-xl px-4 py-4">
                            <Calendar size={18} className="text-blue-400 flex-shrink-0" />
                            <input
                                type="date"
                                name="fechaRegreso"
                                placeholder="Fecha de regreso*"
                                value={form.fechaRegreso}
                                onChange={handleChange}
                                className="bg-transparent text-white placeholder-white/40 font-montserrat text-sm w-full outline-none [color-scheme:dark]"
                            />
                        </div>
                        {errors.fechaRegreso && (
                            <span className="text-red-400 text-xs font-montserrat px-1">{errors.fechaRegreso}</span>
                        )}
                    </div>

                    {/* Número de reservación */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3 bg-[#0d1229] border border-white/10 rounded-xl px-4 py-4">
                            <Plane size={18} className="text-blue-400 flex-shrink-0" />
                            <input
                                type="text"
                                name="numeroReservacion"
                                placeholder="Número de reservación*"
                                value={form.numeroReservacion}
                                onChange={handleChange}
                                className="bg-transparent text-white placeholder-white/40 font-montserrat text-sm w-full outline-none"
                            />
                        </div>
                        {errors.numeroReservacion && (
                            <span className="text-red-400 text-xs font-montserrat px-1">{errors.numeroReservacion}</span>
                        )}
                    </div>

                    {/* Nota informativa */}
                    <div className="bg-[#0d1229] border border-white/10 rounded-xl px-4 py-4">
                        <p className="font-montserrat text-white/60 text-xs leading-relaxed text-center">
                            VUELOS AUTORIZADOS SOLO POR CONVENIO CON{' '}
                            <span className="text-blue-400"> VIVAAEROBUS®.</span>{' '}
                            PARA REALIZAR LA COMPRA DE TU VUELO, SOLICÍTALO A TU ASISTENTE O ADMINISTRADOR. 
                        </p>
                    </div>
                </div>

                {/* Mensaje general de error */}
                {generalError && (
                    <p className="text-red-400 text-sm font-montserrat text-center">
                        {generalError}
                    </p>
                )}

                {/* Botón continuar */}
                <button
                    onClick={handleSubmit}
                    className="w-full py-4 rounded-full border border-purple-500 text-white font-montserrat
            font-semibold text-sm tracking-wide
            hover:bg-purple-500/10 transition-all duration-300"
                >
                    Continuar con las actividades
                </button>

            </div>
        </div>
    )
}

export default Registro