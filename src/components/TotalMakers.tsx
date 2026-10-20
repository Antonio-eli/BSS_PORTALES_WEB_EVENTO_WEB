import React from 'react';
import AprendeImg from '../assets/Aprende.avif';
import ExperimentaImg from '../assets/Experimenta.avif';
import ComparteImg from '../assets/Comparte.avif';

const TotalMakers: React.FC = () => {
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
                        Total Makers conecta a las personas que imaginan y desarrollan mejores formas de trabajar. En nuestra edición 2026, exploraremos cómo la inteligencia artificial deja de ser un concepto y se vuelve tu mejor herramienta para agilizar procesos y abrir nuevas oportunidades.
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
                        <div className="w-[52px] h-[52px] min-w-[52px] rounded-[14px] bg-[#35D8FF]/10 border border-[#35D8FF]/20 shadow-[0px_2px_8px_rgba(0,0,0,0.2)] flex items-center justify-center p-2.5 overflow-hidden">
                            <img
                                src={AprendeImg}
                                alt="Aprende"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex flex-col items-start gap-[4px] flex-1 text-left">
                            <h3 className="font-bold text-[16.8px] leading-[25px] text-[#00D3F3]">
                                Descubre
                            </h3>
                            <p className="font-normal text-[16px] leading-[20px] text-white">
                                Explora el potencial de la inteligencia artificial y aprende a integrar nuevas tecnologías en tus actividades de todos los días.
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
                        <div className="w-[52px] h-[52px] min-w-[52px] rounded-[14px] bg-[#F9459E]/10 border border-[#F9459E]/20 shadow-[0px_2px_8px_rgba(0,0,0,0.2)] flex items-center justify-center p-2.5 overflow-hidden">
                            <img
                                src={ExperimentaImg}
                                alt="Experimenta"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex flex-col items-start gap-[4px] flex-1 text-left">
                            <h3 className="font-bold text-[16.8px] leading-[25px] text-[#F9459E]">
                                Experimenta
                            </h3>
                            <p className="font-normal text-[16px] leading-[20px] text-white">
                                Convierte la información en resultados. Utiliza la tecnología para diseñar y adapatar herramientes que agillicen tu trabajo.
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
                        <div className="w-[52px] h-[52px] min-w-[52px] rounded-[14px] bg-[#BD45FF]/10 border border-[#BD45FF]/20 shadow-[0px_2px_8px_rgba(0,0,0,0.2)] flex items-center justify-center p-2.5 overflow-hidden">
                            <img
                                src={ComparteImg}
                                alt="Comparte"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex flex-col items-start gap-[4px] flex-1 text-left">
                            <h3 className="font-bold text-[16.8px] leading-[25px] text-[#BD45FF]">
                                Comparte
                            </h3>
                            <p className="font-normal text-[16px] leading-[20px] text-white">
                                Conecta con una red de innovación Makers. Comparte buenas prácticas, resuelve retos en equipo y potencia tu desarrollo profesional.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default TotalMakers;