import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Confirmacion = () => {
    return (
        <div className="min-h-screen bg-[#0a0e1a] flex flex-col">

            {/* Navbar */}
            <Navbar />

            {/* Contenido centrado */}
            <div className="flex flex-col flex-1 items-center justify-center px-6 gap-8">

                {/* Logo + título del evento */}
                {/* Título */}
                <h1 className="font-orbitron font-bold text-[2.5rem] leading-[3rem] text-white mb-4">
                    <span className="block">Líderes</span>
                    <span className="block">Estrategia</span>
                    <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mt-1">
                        y Tecnología
                    </span>
                </h1>

                {/* Separador */}
                <div className="w-full border-t border-white/10" />

                {/* Mensaje de éxito */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <h2 className="font-nunito font-black text-white text-3xl leading-tight">
                        Reserva confirmada <br /> con éxito
                    </h2>
                    <p className="font-montserrat text-white/60 text-base">
                        ¡Tu aventura te espera!
                    </p>
                    <p className="font-montserrat text-white/60 text-base">
                        A su llegada, contarán con transporte programado desde el aeropuerto para su traslado al hotel.
                    </p>
                </div>

                {/* Botón regresar */}
                <Link
                    to="/inicio"
                    className="flex items-center justify-center flex-shrink-0
                     w-[16.6625rem] h-[4.25rem] rounded-full
                     border-[3px] border-[#682B9B] text-white
                     shadow-[0_0_40px_0_#682B9B66]
                     font-montserrat font-normal text-sm
                     hover:shadow-[0_0_60px_0_#682B9BCC]
                     hover:border-[#9827D7]
                     transition-all duration-500"
                >
                    Regresar al inicio
                </Link>

            </div>
        </div>
    )
}

export default Confirmacion