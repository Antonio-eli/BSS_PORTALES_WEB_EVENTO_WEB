import { Link } from 'react-router-dom'

const CTAFinal = () => {
  return (
    <section className="bg-[#0a0e1a] px-6 py-12 flex flex-col items-center text-center gap-6 relative overflow-hidden">

      {/* Glow decorativo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full bg-purple-600/10 blur-3xl" />
      </div>

      {/* Texto pequeño arriba */}
      <p className="relative z-10 font-montserrat font-normal text-base leading-[1.3125rem] tracking-normal text-center text-white/60
                    w-full max-w-[22.6875rem] h-[2.625rem] opacity-100">
        Antes de continuar con el formulario, debes tener tu itinerario de vuelo.
      </p>

      {/* Título grande */}
      <h2 className="relative z-10 font-orbitron font-semibold text-[2.5rem] leading-[2.5625rem] tracking-normal text-center 
                     bg-gradient-to-r from-[#00D3F3] via-[#2B7FFF] to-[#9810FA] bg-clip-text text-transparent
                     w-full max-w-[22.6875rem] h-[5.125rem] opacity-100">
        Llena el formulario
      </h2>

      {/* Subtítulo */}
      <span className="relative z-10 font-montserrat font-semibold text-[1.375rem] leading-[1.9375rem] tracking-normal text-center 
                       text-[#BEDBFFCC] w-full max-w-[22.6875rem] h-[1.9375rem] opacity-100 -mt-4">
        y elige tus actividades
      </span>

      {/* Nota informativa */}
                    <div className="bg-[#0d1229] border border-white/10 rounded-xl px-4 py-4">
                        <p className="font-montserrat text-white/60 text-xs leading-relaxed text-center">
                            VUELOS AUTORIZADOS SOLO POR CONVENIO CON{' '}
                            <span className="text-blue-400"> VIVAAEROBUS®.</span>{' '}
                            PARA REALIZAR LA COMPRA DE TU VUELO, SOLICÍTALO A TU ASISTENTE O ADMINISTRADOR. 
                        </p>
                    </div>

      {/* Botón */}
      <Link
        to="/registro"
        className="flex items-center justify-center flex-shrink-0
                   w-[16.6625rem] h-[4.25rem] rounded-full
                   border-[3px] border-[#682B9B] text-white
                   shadow-[0_0_40px_0_#682B9B66]
                   font-montserrat font-normal text-sm
                   hover:shadow-[0_0_60px_0_#682B9BCC]
                   hover:border-[#9827D7]
                   transition-all duration-500"
      >
        Registrarse Ahora
      </Link>

    </section>
  )
}

export default CTAFinal
