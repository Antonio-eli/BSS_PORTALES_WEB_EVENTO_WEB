import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock } from 'lucide-react'
import Navbar from '../components/Navbar'

const Login = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    numeroEmpleado: '',
    password: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.numeroEmpleado.trim()) newErrors.numeroEmpleado = 'Campo requerido'
    if (!form.password.trim()) newErrors.password = 'Campo requerido'
    else if (form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres'
    return newErrors
  }

  const handleSubmit = async () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const API_URL = import.meta.env.VITE_API_URL
      const response = await fetch(`${API_URL}/eventos-web/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: form.numeroEmpleado,
          password: form.password,
        }),
      })

      if (!response.ok) throw new Error('Credenciales incorrectas')

      const raw = await response.json()
      const data = typeof raw.body === 'string' ? JSON.parse(raw.body) : raw
      if (!data.success) throw new Error('Login fallido')
      localStorage.setItem('AUTH_TOKEN', data.token)
      navigate('/dashboard')
    } catch (error) {
      setErrors({ general: 'Número de empleado o contraseña incorrectos' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex flex-col items-center">

      <Navbar />

      {/* Contenido */}
      <div className="flex flex-col flex-1 justify-center px-5 py-10 gap-8 w-full max-w-md">

        {/* Título */}
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-orbitron font-bold text-4xl bg-gradient-to-r from-[#51A2FF] to-[#C27AFF] bg-clip-text text-transparent">
            Bienvenido
          </h1>
          <p className="font-montserrat text-white/50 text-sm">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {/* Formulario */}
        <div className="flex flex-col gap-4">

          {/* Número de empleado */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 bg-[#0d1229] border border-white/10 rounded-xl px-4 py-4">
              <User size={18} className="text-blue-400 flex-shrink-0" />
              <input
                type="text"
                name="numeroEmpleado"
                placeholder="Número de empleado*"
                value={form.numeroEmpleado}
                onChange={handleChange}
                className="bg-transparent text-white placeholder-white/40 font-montserrat text-sm w-full outline-none"
              />
            </div>
            {errors.numeroEmpleado && (
              <span className="text-red-400 text-xs font-montserrat px-1">
                {errors.numeroEmpleado}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 bg-[#0d1229] border border-white/10 rounded-xl px-4 py-4">
              <Lock size={18} className="text-blue-400 flex-shrink-0" />
              <input
                type="password"
                name="password"
                placeholder="Contraseña*"
                value={form.password}
                onChange={handleChange}
                className="bg-transparent text-white placeholder-white/40 font-montserrat text-sm w-full outline-none"
              />
            </div>
            {errors.password && (
              <span className="text-red-400 text-xs font-montserrat px-1">
                {errors.password}
              </span>
            )}
          </div>

          {/* Error general */}
          {errors.general && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <p className="text-red-400 text-xs font-montserrat text-center">
                {errors.general}
              </p>
            </div>
          )}
        </div>

        {/* Botón ingresar */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 rounded-full font-montserrat font-semibold text-sm
            tracking-wide text-white bg-gradient-to-r from-blue-500 to-purple-600
            shadow-[0_0_24px_rgba(99,102,241,0.5)]
            hover:shadow-[0_0_36px_rgba(99,102,241,0.8)]
            hover:scale-105 disabled:opacity-50 disabled:scale-100
            transition-all duration-300"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>

      </div>
    </div>
  )
}

export default Login