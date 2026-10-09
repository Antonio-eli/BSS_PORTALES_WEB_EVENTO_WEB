

const TotalMakers = () => {
    return (
        <section className="w-full bg-[#0a0e1a] text-white py-12 px-6 lg:px-12 flex justify-center font-['Montserrat',sans-serif]">
            <div className="w-full max-w-[1332px] flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-12">

                {/* Columna Izquierda: Información de la Sección */}
                <div className="w-full lg:w-[562px] flex flex-col items-start gap-[24px]">
                    <div className="flex flex-col items-start gap-[8px] w-full">
            <span className="font-bold text-[20px] leading-[24px] text-white text-left">
              ¿Qué es Total Makers?
            </span>
                        <h2 className="font-bold text-[32px] sm:text-[40px] leading-[40px] sm:leading-[49px] text-white text-left">
                            Una comunidad que convierte ideas en soluciones.
                        </h2>
                    </div>
                    <p className="font-medium text-[16px] sm:text-[18px] leading-[22px] text-white/90 text-left">
                        Total Makers reúne a las personas que imaginan nuevas posibilidades y las hacen realidad. Es un espacio de colaboración donde la tecnología y la creatividad se unen para generar un impacto real.
                    </p>
                </div>

                {/* Columna Derecha: Tarjetas de Características */}
                <div className="w-full lg:w-[640px] flex flex-col items-start gap-[16px]">

                    {/* Tarjeta 1: Aprende */}
                    <div
                        className="w-full p-[24px] rounded-[20px] border border-white/14 shadow-[0px_2px_8px_rgba(0,0,0,0.2)] flex flex-row items-start gap-[16px]"
                        style={{
                            background:
                                'linear-gradient(93.61deg, rgba(0, 0, 0, 0.25) 39.02%, rgba(53, 216, 255, 0.025) 69.51%, rgba(53, 216, 255, 0.15) 100%)',
                        }}
                    >
                        <div className="w-[52px] h-[52px] min-w-[52px] rounded-[14px] bg-[#35D8FF]/10 border border-[#35D8FF]/20 shadow-[0px_2px_8px_rgba(0,0,0,0.2)] flex items-center justify-center">
                            {/* Ícono Aprende */}
                            <svg className="w-[28px] h-[28px] text-[#00D3F3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                            </svg>
                        </div>
                        <div className="flex flex-col items-start gap-[4px] flex-1 text-left">
                            <h3 className="font-bold text-[16.8px] leading-[25px] text-[#00D3F3]">
                                Aprende
                            </h3>
                            <p className="font-normal text-[16px] leading-[20px] text-white">
                                Descubre nuevas herramientas, metodologías y formas de trabajar con tecnología e inteligencia artificial.
                            </p>
                        </div>
                    </div>

                    {/* Tarjeta 2: Experimenta */}
                    <div
                        className="w-full p-[24px] rounded-[20px] border border-white/14 shadow-[0px_2px_8px_rgba(0,0,0,0.2)] flex flex-row items-start gap-[16px]"
                        style={{
                            background:
                                'linear-gradient(266.03deg, rgba(0, 0, 0, 0.25) 43.69%, rgba(249, 69, 158, 0.025) 71.85%, rgba(249, 69, 158, 0.15) 100%)',
                        }}
                    >
                        <div className="w-[52px] h-[52px] min-w-[52px] rounded-[14px] bg-[#F9459E]/10 border border-[#F9459E]/20 shadow-[0px_2px_8px_rgba(0,0,0,0.2)] flex items-center justify-center">
                            {/* Ícono Experimenta */}
                            <svg className="w-[28px] h-[28px] text-[#F9459E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10 2v7.5M14 2v7.5M8.5 2h7M14 9.5a5.5 5.5 0 1 1-4 0" />
                                <path d="M8.5 14h7" />
                            </svg>
                        </div>
                        <div className="flex flex-col items-start gap-[4px] flex-1 text-left">
                            <h3 className="font-bold text-[16.8px] leading-[25px] text-[#F9459E]">
                                Experimenta
                            </h3>
                            <p className="font-normal text-[16px] leading-[20px] text-white">
                                Aplica el conocimiento en retos reales, pon a prueba tus ideas y construye prototipos funcionales.
                            </p>
                        </div>
                    </div>

                    {/* Tarjeta 3: Comparte */}
                    <div
                        className="w-full p-[24px] rounded-[20px] border border-white/14 shadow-[0px_2px_8px_rgba(0,0,0,0.2)] flex flex-row items-start gap-[16px]"
                        style={{
                            background:
                                'linear-gradient(93.61deg, rgba(0, 0, 0, 0.25) 39.02%, rgba(189, 69, 255, 0.025) 69.51%, rgba(189, 69, 255, 0.15) 100%)',
                        }}
                    >
                        <div className="w-[52px] h-[52px] min-w-[52px] rounded-[14px] bg-[#BD45FF]/10 border border-[#BD45FF]/20 shadow-[0px_2px_8px_rgba(0,0,0,0.2)] flex items-center justify-center">
                            {/* Ícono Comparte */}
                            <svg className="w-[28px] h-[28px] text-[#BD45FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
                            </svg>
                        </div>
                        <div className="flex flex-col items-start gap-[4px] flex-1 text-left">
                            <h3 className="font-bold text-[16.8px] leading-[25px] text-[#BD45FF]">
                                Comparte
                            </h3>
                            <p className="font-normal text-[16px] leading-[20px] text-white">
                                Conecta con otros creadores, intercambia experiencias y potencia el talento colectivo dentro de la comunidad.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default TotalMakers;