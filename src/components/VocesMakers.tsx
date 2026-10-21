import React, { useRef } from 'react';

import CHL from '../assets/CHL.avif';
import AM from '../assets/AM.avif';
import DM from '../assets/DM.avif';
import JCS from '../assets/JCS.avif';
import EC from '../assets/EC.avif';
import MIM from '../assets/MIM.avif';
import MN from '../assets/MN.avif';

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
        name: 'Christian Lozano',
        role: 'Director, Solutions Builder',
        company: 'Salesforce',
        topic: 'Claude Force',
        accentColor: '#186FEA',
        badgeBg: '#186FEA',
        badgeBorder: '#367BFF',
        cardBg: 'linear-gradient(140.06deg, rgba(0, 0, 0, 0.4) -0.01%, rgba(24, 111, 234, 0.35) 45%, rgba(0, 0, 0, 0.4) 99.99%)',
        topicBg: 'rgba(24, 111, 234, 0.15)',
        topicBorder: 'rgba(24, 111, 234, 0.35)',
        avatarUrl: CHL
    },
    {
        id: 2,
        name: 'Anaid Moncada',
        role: 'Regional Data 360 Specialist',
        company: 'Salesforce',
        topic: 'Claude Force',
        accentColor: '#00D3F3',
        badgeBg: '#00D3F3',
        badgeBorder: '#35D8FF',
        cardBg: 'linear-gradient(140.06deg, rgba(0, 0, 0, 0.4) -0.01%, rgba(53, 216, 255, 0.35) 45%, rgba(0, 0, 0, 0.4) 99.99%)',
        topicBg: 'rgba(53, 216, 255, 0.15)',
        topicBorder: 'rgba(53, 216, 255, 0.35)',
        avatarUrl: AM
    },
    {
        id: 3,
        name: 'Daniel Morales',
        role: 'Technical Account Manager',
        company: 'AWS',
        topic: 'Claude Code',
        accentColor: '#00D492',
        badgeBg: '#00D492',
        badgeBorder: '#367BFF',
        cardBg: 'linear-gradient(140.06deg, rgba(0, 0, 0, 0.4) -0.01%, rgba(0, 212, 146, 0.35) 45%, rgba(0, 0, 0, 0.4) 99.99%)',
        topicBg: 'rgba(0, 212, 146, 0.15)',
        topicBorder: 'rgba(0, 212, 146, 0.35)',
        avatarUrl: DM
    },
    {
        id: 4,
        name: 'Juan Carlos Sánchez',
        role: 'IP Network Strategy Executive',
        company: 'AWS',
        topic: 'Ciberseguridad',
        accentColor: '#FFD024',
        badgeBg: '#FFD024',
        badgeBorder: '#FF7438',
        cardBg: 'linear-gradient(140.06deg, rgba(0, 0, 0, 0.4) -0.01%, rgba(255, 208, 36, 0.35) 45%, rgba(0, 0, 0, 0.4) 99.99%)',
        topicBg: 'rgba(255, 208, 36, 0.15)',
        topicBorder: 'rgba(255, 208, 36, 0.35)',
        avatarUrl: JCS
    },
    {
        id: 5,
        name: 'Efrain Castilla',
        role: 'CTO, IT Director, Solutions Architect',
        company: 'Totalplay',
        topic: 'Kiro',
        accentColor: '#FF8904',
        badgeBg: '#FF8904',
        badgeBorder: '#FF7438',
        cardBg: 'linear-gradient(140.06deg, rgba(0, 0, 0, 0.4) -0.01%, rgba(255, 137, 4, 0.35) 45%, rgba(0, 0, 0, 0.4) 99.99%)',
        topicBg: 'rgba(255, 137, 4, 0.15)',
        topicBorder: 'rgba(255, 137, 4, 0.35)',
        avatarUrl: EC
    },
    {
        id: 6,
        name: 'Miguel Iza Moreno',
        role: 'Executive Partner',
        company: 'Deloitte',
        topic: 'Perspectivas Deloitte',
        accentColor: '#BD45FF',
        badgeBg: '#BD45FF',
        badgeBorder: '#8B5CFF',
        cardBg: 'linear-gradient(140.06deg, rgba(0, 0, 0, 0.4) -0.01%, rgba(189, 69, 255, 0.35) 45%, rgba(0, 0, 0, 0.4) 99.99%)',
        topicBg: 'rgba(189, 69, 255, 0.15)',
        topicBorder: 'rgba(189, 69, 255, 0.35)',
        avatarUrl: MIM
    },
    {
        id: 7,
        name: 'Mike Nava',
        role: 'Director IPTV',
        company: 'Totalplay',
        topic: 'Caso de éxito',
        accentColor: '#F9459E',
        badgeBg: '#F9459E',
        badgeBorder: '#E548FF',
        cardBg: 'linear-gradient(140.06deg, rgba(0, 0, 0, 0.4) -0.01%, rgba(249, 69, 158, 0.35) 45%, rgba(0, 0, 0, 0.4) 99.99%)',
        topicBg: 'rgba(249, 69, 158, 0.15)',
        topicBorder: 'rgba(249, 69, 158, 0.35)',
        avatarUrl: MN
    }
];

export const VocesMakers: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 323;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="flex flex-col items-start gap-[50px] w-full max-w-[1280px] mx-auto py-12 px-4 font-['Montserrat',sans-serif]">
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

                {/* Botones Anterior / Siguiente con Estilo Glassmorphism de Figma */}
                <div className="flex flex-row items-center gap-[12px]">
                    {/* Botón Izquierda (Anterior) */}
                    <button
                        onClick={() => scroll('left')}
                        aria-label="Anterior speaker"
                        className="flex items-center justify-center w-[48px] h-[48px] rounded-full backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer border-t border-l border-white/60 border-r border-b border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.3)] group hover:bg-white/10"
                        style={{
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)',
                        }}
                    >
                        <svg
                            className="w-5 h-5 text-white/50 group-hover:text-white transition-colors"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>

                    {/* Botón Derecha (Siguiente) */}
                    <button
                        onClick={() => scroll('right')}
                        aria-label="Siguiente speaker"
                        className="flex items-center justify-center w-[48px] h-[48px] rounded-full backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer border-t border-l border-white/60 border-r border-b border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.3)] group hover:bg-white/10"
                        style={{
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.04) 100%)',
                        }}
                    >
                        <svg
                            className="w-5 h-5 text-white group-hover:scale-105 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Carrusel de Speakers */}
            <div
                ref={scrollContainerRef}
                className="flex flex-row items-start gap-[20px] w-full overflow-x-auto scrollbar-none py-2 snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {speakersData.map((speaker) => (
                    <div
                        key={speaker.id}
                        className="flex flex-col items-start p-[28px_24px] gap-[12px] w-[303px] min-w-[303px] h-[285px] rounded-[20px] border-t border-l border-white/50 border-r border-b border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 snap-start overflow-hidden"
                        style={{ background: speaker.cardBg }}
                    >
                        {/* Foto + Indicador de Estado */}
                        <div className="relative w-[253px] h-[80px]">
                            <img
                                src={speaker.avatarUrl}
                                alt={speaker.name}
                                className="w-[80px] h-[80px] rounded-full object-cover"
                            />
                            <div
                                className="absolute w-[16px] h-[16px] left-[64px] top-[64px] rounded-full border-2 border-black"
                                style={{
                                    backgroundColor: speaker.badgeBg,
                                    boxShadow: `0px 0px 10px ${speaker.badgeBorder}`
                                }}
                            />
                        </div>

                        {/* Información Personal */}
                        <div className="flex flex-col items-start w-full h-[57px]">
                            <h3 className="font-bold text-[18px] leading-[22px] text-white truncate w-full">
                                {speaker.name}
                            </h3>
                            <p className="font-medium text-[14px] leading-[20px] text-[#38BDF8] truncate w-full mt-0.5">
                                {speaker.role}
                            </p>
                            <span className="font-normal text-[12px] leading-[15px] text-[#EDEDED] truncate w-full mt-0.5">
                                {speaker.company}
                            </span>
                        </div>

                        {/* Sección de Tema con bisel Glass */}
                        <div
                            className="flex flex-col items-start p-[10px_12px] w-full h-[66px] rounded-[10px] border-t border-l border-white/30 border-r border-b border-white/10 shadow-[0px_2px_8px_rgba(0,0,0,0.2)] mt-auto backdrop-blur-sm"
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
                            <p className="font-normal text-[14px] leading-[20px] text-white truncate w-full mt-1">
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