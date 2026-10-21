import React from 'react';
import heroBg from '../assets/hero.avif';
import LogoTotalMakers from '../assets/Logo_TotalMakers.svg';
//import Exclude from '../assets/Exclude.avif';

export const HeroMakers: React.FC = () => {
    const handleScrollToAgenda = (e: React.MouseEvent) => {
        e.preventDefault();
        const agendaElement = document.getElementById('agenda');
        if (agendaElement) {
            const headerOffset = 68;
            const elementPosition = agendaElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section
            id="evento"
            className="relative w-full min-h-screen px-6 sm:px-12 lg:px-[100px] pt-[100px] pb-[30px] flex flex-col items-center justify-between gap-[36px] bg-cover bg-center bg-no-repeat font-['Montserrat',sans-serif] text-white overflow-hidden scroll-mt-[68px]"
            style={{
                backgroundImage: `url(${heroBg}), linear-gradient(180deg, #0a0e1a 0%, #0d1326 100%)`,
            }}
        >
            {/* Frame 3: Superior Derecha (Insignia Vectorial 49x49px) */}
            <div className="w-full max-w-[1306px] h-[49px] flex justify-end items-start gap-[10px]">
                <div className="relative w-[49px] h-[49px] flex items-center justify-center flex-shrink-0">
                    {/* Base vectorial de la figura en blanco sólido */}
                    <svg
                        width="49"
                        height="49"
                        viewBox="0 0 49 49"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[49px] h-[49px]"
                    >

                        <g fill="#FFFFFF">
                            <rect x="20.915" y="0" width="7.17" height="49" rx="2" />
                            <rect x="0" y="20.915" width="49" height="7.17" rx="2" />
                            <rect
                                x="20.915"
                                y="0"
                                width="7.17"
                                height="49"
                                rx="2"
                                transform="rotate(45 24.5 24.5)"
                            />
                            <rect
                                x="20.915"
                                y="0"
                                width="7.17"
                                height="49"
                                rx="2"
                                transform="rotate(-45 24.5 24.5)"
                            />
                        </g>
                    </svg>

                    <span className="absolute z-10 text-black font-mono font-bold text-[12px] leading-none tracking-tight select-none">
                        &lt;/&gt;
                    </span>
                </div>
            </div>

            {/* Container Principal Hero */}
            <div className="w-full max-w-[1306px] flex flex-col items-start gap-[36px] my-auto">
                {/* Subtítulo Top: Logo + Línea Gradiente + Edición 2026 */}
                <div className="flex items-center gap-[12px] h-[36px] py-[8px]">
                    <span className="w-[28px] h-[1px] bg-gradient-to-r from-transparent to-white rounded-[2px]" />
                    <img
                        src={LogoTotalMakers}
                        alt="Total Makers Logo"
                        className="h-[22px] w-auto object-contain"
                        onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                        }}
                    />
                    <div className="flex items-center gap-[10px]">
                        <span className="font-normal text-[14px] leading-[20px] text-white tracking-wide">
                            · Edición 2026
                        </span>
                    </div>
                </div>

                {/* Frame 2: Encabezado + Descripción */}
                <div className="flex flex-col items-start gap-[16px] max-w-[745px]">
                    <h1 className="font-bold text-[36px] sm:text-[48px] lg:text-[60px] leading-[1.15] lg:leading-[73px] text-white tracking-tight">
                        Conviértete en un agente de innovación
                    </h1>

                    <p className="font-medium text-[16px] sm:text-[18px] lg:text-[20px] leading-[22px] text-white/90 max-w-[560px]">
                        Un espacio para aprender, experimentar y transformar los retos diarios en soluciones tecnológicas con inteligencia artificial.
                    </p>
                </div>

                {/* Metadata de Fecha, Lugar y Horario */}
                <div className="flex flex-wrap items-center gap-[20px] max-w-[700px] text-white/90 font-normal text-[15px] sm:text-[16px]">
                    <div className="flex items-center gap-[6px] h-[24px]">
                        <div className="w-[24px] h-[24px] flex items-center justify-center">
                            <svg
                                className="w-[20px] h-[20px] text-[#38BDF8]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <span>22 Octubre, 2026</span>
                    </div>

                    {/* Enlace Interactivo de Ubicación */}
                    <a
                        href="https://maps.app.goo.gl/S7bYUL6PzyDpR2YV8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-[8px] h-[24px] hover:text-[#38BDF8] transition-colors group cursor-pointer"
                        title="Ver ubicación en Google Maps"
                    >
                        <div className="w-[24px] h-[24px] flex items-center justify-center">
                            <svg
                                className="w-[20px] h-[20px] text-[#38BDF8] group-hover:scale-110 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </div>
                        <span className="underline decoration-[#38BDF8]/40 group-hover:decoration-[#38BDF8] underline-offset-4">
                            El Encanto Salón Campestre
                        </span>
                    </a>

                    <div className="flex items-center gap-[8px] h-[24px]">
                        <div className="w-[24px] h-[24px] flex items-center justify-center">
                            <svg
                                className="w-[20px] h-[20px] text-[#38BDF8]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <span>08:30 — 19:00 hrs</span>
                    </div>
                </div>

                {/* Botón CTA: Conoce la agenda */}
                <div className="flex items-center gap-[14px] pt-2">
                    <button
                        onClick={handleScrollToAgenda}
                        className="w-[184px] h-[48px] px-[16px] py-[12px] flex items-center justify-center gap-[8px] rounded-[12px] border border-[#38BDF8] shadow-[0px_2px_8px_rgba(0,0,0,0.2)] font-bold text-[16px] leading-[22px] text-white transition-all duration-300 hover:scale-105 hover:bg-[#38BDF8]/20 cursor-pointer"
                        style={{
                            background:
                                'linear-gradient(109.8deg, rgba(56, 189, 248, 0.1) 0.53%, rgba(59, 130, 246, 0.1) 100.53%)',
                        }}
                    >
                        Conoce la agenda
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroMakers;