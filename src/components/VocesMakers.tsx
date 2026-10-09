import React, { useRef } from 'react';

interface Speaker {
    id: number;
    name: string;
    role: string;
    company: string;
    topic: string;
    accentColor: string;
    badgeBg: string;
    badgeBorder: string;
    cardBg: string;
    topicBg: string;
    topicBorder: string;
    avatarUrl: string;
}

const speakersData: Speaker[] = [
    {
        id: 1,
        name: 'Sofía Vargas',
        role: 'Lead AI Engineer',
        company: 'AWS',
        topic: 'Del prompt al prototipo funcional',
        accentColor: '#FF8904',
        badgeBg: '#FF8904',
        badgeBorder: '#FF7438',
        cardBg: 'linear-gradient(140.06deg, rgba(0, 0, 0, 0.02) -0.01%, rgba(255, 137, 4, 0.1) 29.54%, rgba(0, 0, 0, 0.02) 99.99%)',
        topicBg: 'rgba(255, 116, 56, 0.05)',
        topicBorder: 'rgba(255, 116, 56, 0.145)',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Andrea Martínez',
        role: 'Directora de Producto Digital',
        company: 'Totalplay',
        topic: 'Crear en la era de la inteligencia artificial',
        accentColor: '#00D3F3',
        badgeBg: '#00D3F3',
        badgeBorder: '#35D8FF',
        cardBg: 'linear-gradient(140.06deg, rgba(0, 0, 0, 0.02) -0.01%, rgba(53, 216, 255, 0.1) 29.54%, rgba(0, 0, 0, 0.02) 99.99%)',
        topicBg: 'rgba(53, 216, 255, 0.05)',
        topicBorder: 'rgba(53, 216, 255, 0.145)',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Luis Hernández',
        role: 'Senior Backend Engineer',
        company: 'Totalplay',
        topic: 'Automatización de procesos con LLMs',
        accentColor: '#186FEA',
        badgeBg: '#186FEA',
        badgeBorder: '#367BFF',
        cardBg: 'linear-gradient(140.06deg, rgba(0, 0, 0, 0.02) -0.01%, rgba(24, 111, 234, 0.1) 29.54%, rgba(0, 0, 0, 0.02) 99.99%)',
        topicBg: 'rgba(24, 111, 234, 0.05)',
        topicBorder: 'rgba(24, 111, 234, 0.145)',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    },
    {
        id: 4,
        name: 'Mariana Torres',
        role: 'AI Research Specialist',
        company: 'Totalplay',
        topic: 'Automatización de procesos con LLMs',
        accentColor: '#BD45FF',
        badgeBg: '#BD45FF',
        badgeBorder: '#8B5CFF',
        cardBg: 'linear-gradient(140.06deg, rgba(0, 0, 0, 0.02) -0.01%, rgba(189, 69, 255, 0.1) 29.54%, rgba(0, 0, 0, 0.02) 99.99%)',
        topicBg: 'rgba(189, 69, 255, 0.05)',
        topicBorder: 'rgba(189, 69, 255, 0.145)',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop'
    },
    {
        id: 5,
        name: 'Carlos Ramírez',
        role: 'DevOps & Infrastructure Lead',
        company: 'Totalplay',
        topic: 'IA aplicada a infraestructura y operaciones',
        accentColor: '#F9459E',
        badgeBg: '#F9459E',
        badgeBorder: '#E548FF',
        cardBg: 'linear-gradient(140.06deg, rgba(0, 0, 0, 0.02) -0.01%, rgba(249, 69, 158, 0.1) 29.54%, rgba(0, 0, 0, 0.02) 99.99%)',
        topicBg: 'rgba(249, 69, 158, 0.05)',
        topicBorder: 'rgba(249, 69, 158, 0.145)',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    }
];

const VocesMakers: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="flex flex-col items-start gap-[50px] w-full max-w-[1280px] mx-auto py-12 px-4 font-montserrat">
            {/* Encabezado y Navegación */}
            <div className="flex flex-row justify-between items-end w-full min-h-[71px] gap-[20px]">
                <div className="flex flex-col items-start max-w-[691px]">
          <span className="font-bold text-[18px] leading-[22px] text-[#BD45FF]">
            Speakers
          </span>
                    <h2 className="font-bold text-[32px] sm:text-[40px] leading-[40px] sm:leading-[49px] text-white">
                        Escucha nuestras voces expertas
                    </h2>
                </div>

                {/* Botones Anterior / Siguiente */}
                <div className="flex flex-row items-start gap-[10px] w-[98px] h-[44px]">
                    <button
                        onClick={() => scroll('left')}
                        aria-label="Anterior speaker"
                        className="flex items-center justify-center w-[44px] h-[44px] bg-white/[0.02] border border-white/10 rounded-full shadow-[0px_2px_8px_rgba(0,0,0,0.2)] hover:bg-white/10 transition-all duration-200"
                    >
                        <svg
                            className="w-4 h-4 text-[#4B4B4B]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        aria-label="Siguiente speaker"
                        className="flex items-center justify-center w-[44px] h-[44px] bg-black/20 border border-white/15 rounded-full shadow-[0px_2px_8px_rgba(0,0,0,0.2)] hover:bg-black/40 transition-all duration-200"
                    >
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Carrusel de Speakers */}
            <div
                ref={scrollContainerRef}
                className="flex flex-row items-start gap-[20px] w-full overflow-x-auto scrollbar-hide py-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {speakersData.map((speaker) => (
                    <div
                        key={speaker.id}
                        className="flex flex-col items-start p-[28px_24px] gap-[12px] w-[280px] min-w-[280px] h-[305px] rounded-[20px] border border-white/14 shadow-[0px_2px_8px_rgba(0,0,0,0.2)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1"
                        style={{ background: speaker.cardBg }}
                    >
                        {/* Foto + Indicador de Estado */}
                        <div className="relative w-[230px] h-[80px]">
                            <img
                                src={speaker.avatarUrl}
                                alt={speaker.name}
                                className="w-[80px] h-[80px] rounded-full object-cover"
                            />
                            <div
                                className="absolute w-[16px] h-[16px] left-[64px] top-[64px] rounded-full border-2 border-black"
                                style={{
                                    backgroundColor: speaker.badgeBg,
                                    boxShadow: `0px 0px 8px ${speaker.badgeBorder}`
                                }}
                            />
                        </div>

                        {/* Información Personal */}
                        <div className="flex flex-col items-start w-[230px]">
                            <h3 className="font-bold text-[18px] leading-[22px] text-white truncate w-full">
                                {speaker.name}
                            </h3>
                            <p className="font-medium text-[14px] leading-[20px] text-[#38BDF8] truncate w-full">
                                {speaker.role}
                            </p>
                            <span className="font-normal text-[12px] leading-[15px] text-[#EDEDED] truncate w-full">
                {speaker.company}
              </span>
                        </div>

                        {/* Sección de Tema */}
                        <div
                            className="flex flex-col items-start p-[10px_12px] w-full h-[86px] rounded-[10px] border shadow-[0px_2px_8px_rgba(0,0,0,0.2)] mt-auto"
                            style={{
                                backgroundColor: speaker.topicBg,
                                borderColor: speaker.topicBorder
                            }}
                        >
              <span
                  className="font-bold text-[16px] leading-[20px]"
                  style={{ color: speaker.accentColor }}
              >
                Tema
              </span>
                            <p className="font-normal text-[14px] leading-[20px] text-white line-clamp-2 mt-1">
                                {speaker.topic}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VocesMakers;