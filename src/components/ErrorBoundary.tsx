import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom'

const ErrorBoundary = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  const is404 =
    isRouteErrorResponse(error) && error.status === 404

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex flex-col items-center justify-center px-6 text-center gap-8">

      {/* Glow decorativo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-purple-600/10 blur-3xl" />
      </div>

      {/* Código de error */}
      <h1 className="relative z-10 font-orbitron font-bold text-8xl bg-gradient-to-r from-[#51A2FF] to-[#C27AFF] bg-clip-text text-transparent">
        {is404 ? '404' : 'Error'}
      </h1>

      {/* Mensaje */}
      <div className="relative z-10 flex flex-col gap-2">
        <h2 className="font-nunito font-black text-white text-2xl">
          {is404 ? 'Página no encontrada' : 'Algo salió mal'}
        </h2>
        <p className="font-montserrat text-white/50 text-sm">
          {is404
            ? 'La página que buscas no existe.'
            : 'Ocurrió un error inesperado. Intenta de nuevo.'}
        </p>
      </div>

      {/* Botones */}
      <div className="relative z-10 flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={() => navigate('/')}
          className="w-full py-4 rounded-full font-montserrat font-semibold text-sm
            tracking-wide text-white bg-gradient-to-r from-blue-500 to-purple-600
            shadow-[0_0_24px_rgba(99,102,241,0.5)]
            hover:shadow-[0_0_36px_rgba(99,102,241,0.8)]
            hover:scale-105 transition-all duration-300"
        >
          Ir al inicio
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full py-4 rounded-full border border-purple-500 text-white
            font-montserrat font-semibold text-sm tracking-wide
            hover:bg-purple-500/10 transition-all duration-300"
        >
          Regresar
        </button>
      </div>
    </div>
  )
}

export default ErrorBoundary