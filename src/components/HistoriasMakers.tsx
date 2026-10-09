import React, { useRef } from 'react';
import RM from '../assets/RM.avif';
import JC from '../assets/JC.avif';
import RE from '../assets/RE.avif';
import OM from '../assets/OM.avif';
import AC from '../assets/AC.avif';
import RA from '../assets/RA.avif';
import MC from '../assets/MC.avif';
import E from '../assets/E.avif';
import AS from '../assets/AS.avif';
import RC from '../assets/RC.avif';

export interface MakerCardItem {
    id: string;
    name: string;
    role: string;
    roleColor: string;
    project: string;
    quote: string;
    tools: string[];
    avatarUrl: string;
    gradientBackground: string;
}

const defaultMakersData: MakerCardItem[] = [
    {
        id: '1',
        name: 'Ricardo Moreno',
        role: 'Líder de proyecto',
        roleColor: '#38DD02', // Poison Green
        project: 'Nuevo Portal Totalplay',
        quote: 'Utilizamos la inteligencia artificial como una herramienta de apoyo durante las primeras etapas de diseño. Con prompts enfocados en las necesidades de cada proyecto, obtuvimos una base para visualizar pantallas y flujos, detectar oportunidades de mejora y desarrollar propuestas visuales con mayor rapidez.',
        tools: ['Vscode', 'Claude (Claude sonnet)', 'Copilot (Claude sonnet)'],
        avatarUrl: RM,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.2) 41.27%, rgba(56, 221, 2, 0.1) 85.29%, rgba(56, 221, 2, 0) 100.08%)',
    },
    {
        id: '2',
        name: 'Juan Carlos',
        role: 'Arquitecto de Software',
        roleColor: '#1877FF', // Super Sonic Blue
        project: 'Nuevo Portal Totalplay',
        quote: 'Construir el Portal requería velocidad y precisión. Al integrar la IA como mi asistente de código, asigné la implementación del stack y aceleré todo el flujo. Así, concentré mi experiencia en asegurar una integración impecable con Salesforce manteniendo los estándares de calidad al máximo.',
        tools: ['Claude Fable 5', 'GitHub Copilot'],
        avatarUrl: JC,
        gradientBackground:
            'linear-gradient(315.12deg, rgba(0, 0, 0, 0.2) 41.86%, rgba(24, 119, 255, 0.1) 85.88%, rgba(24, 119, 255, 0) 100.66%)',
    },
    {
        id: '3',
        name: 'Reynaldo Escobar',
        role: 'Gerente de Aplicaciones Móviles',
        roleColor: '#3BF200', // Neon Green
        project: 'Rediseño App de Ventas Residencial',
        quote: 'Aproveché las capacidades de la Inteligencia Artificial para convertir los requerimientos en propuestas de interfaz, materiales de soporte y representaciones geográficas. Esto me permitió enfocarme en la validación técnica y la salida a producción.',
        tools: ['Claude Sonnet/Opus', 'Gemini Flash (Antigravity IDE)'],
        avatarUrl: RE,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.2) 41.27%, rgba(59, 242, 0, 0.1) 85.29%, rgba(59, 242, 0, 0) 100.08%)',
    },
    {
        id: '4',
        name: 'Omar Morgado',
        role: 'Desarrollador de Aplicaciones Móviles',
        roleColor: '#00D3F3', // Bluefish
        project: 'Rediseño App de Ventas Residencial',
        quote: 'Para la App de Ventas, asigné a la IA las pantallas, mapas y documentación. Así, pude enfocar mi criterio técnico en auditar el código e integrar la lógica para salir a producción.',
        tools: ['Claude Sonnet/Opus', 'Gemini Flash (Antigravity IDE)'],
        avatarUrl: OM,
        gradientBackground:
            'linear-gradient(315.12deg, rgba(0, 0, 0, 0.2) 41.86%, rgba(0, 211, 243, 0.1) 85.88%, rgba(0, 211, 243, 0) 100.66%)',
    },
    {
        id: '5',
        name: 'Ana Ceci',
        role: 'Gerente de Portal Público',
        roleColor: '#00D492', // Billiard Aqua
        project: 'Nuevo Portal Totalplay, Rediseño App de Ventas Residencial',
        quote: 'Incorporé la inteligencia artificial para agilizar mi proceso de diseño UX/UI. A través de prompts, generé propuestas iniciales de pantallas y recorridos, lo que me permitió validar ideas, mejorar los flujos y adelantar detalles visuales.',
        tools: ['Figma Make', 'Open IA'],
        avatarUrl: AC,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.2) 41.27%, rgba(0, 212, 146, 0.1) 85.29%, rgba(0, 212, 146, 0) 100.08%)',
    },
    {
        id: '6',
        name: 'Randy Castillo',
        role: 'Líder de Diseño UX',
        roleColor: '#FF8904', // Orange
        project: 'FFM Cobranza',
        quote: 'Integré la IA a mi flujo de desarrollo en la Migración de Cobranza a Flutter como apoyo para diagnosticar, implementar y documentar. Con reglas claras de verificación y revisión humana, mi ciclo de trabajo es más rápido y deja menos retrabajo, y las decisiones siguen siendo mías.',
        tools: ['Claude Code'],
        avatarUrl: RA,
        gradientBackground:
            'linear-gradient(315.12deg, rgba(0, 0, 0, 0.2) 41.86%, rgba(255, 137, 4, 0.1) 85.88%, rgba(255, 137, 4, 0) 100.66%)',
    },
    {
        id: '7',
        name: 'Melina Castillo',
        role: 'Lider de Diseño UX UI',
        roleColor: '#F9459E', // Fandango Pink
        project: 'Nuevo Portal Totalplay, Rediseño App de Ventas Residencial',
        quote: 'Utilizamos la inteligencia artificial como una herramienta de apoyo durante las primeras etapas de diseño. Con prompts enfocados en las necesidades de cada proyecto, obtuvimos una base para visualizar pantallas y flujos, detectar oportunidades de mejora y desarrollar propuestas visuales con mayor rapidez.',
        tools: ['Figma Make', 'Open IA'],
        avatarUrl: MC,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.2) 41.27%, rgba(249, 69, 158, 0.1) 85.29%, rgba(249, 69, 158, 0) 100.08%)',
    },
    {
        id: '8',
        name: 'Eliceo',
        role: 'Lider de proyecto',
        roleColor: '#AC14FF', // Afterparty Purple
        project: 'Nuevo Portal Totalplay',
        quote: 'La Inteligencia Artificial me apoyó en la implementación técnica, lo que aceleró el proceso y me permitió concentrarme en garantizar una integración sólida con Salesforce y mantener altos estándares de calidad.',
        tools: ['Vscode', 'Claude (Claude sonnet)', 'Copilot (Claude sonnet)'],
        avatarUrl: E,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.2) 41.27%, rgba(172, 20, 255, 0.1) 85.29%, rgba(172, 20, 255, 0) 100.08%)',
    },
    {
        id: '9',
        name: 'Alfred',
        role: 'Líder de Tecnología e Innovación',
        roleColor: '#5E9BDE', // Little Boy Blue
        project: 'Nuevo Portal Totalplay, Rediseño App de Ventas Residencial',
        quote: 'Mediante la integración de plataformas como Claude Code, Notion y ChatGPT Codex, entre otras, fue posible rediseñar la nueva Torre NOC, transformar salas de juntas en espacios inteligentes, incorporar procesos agénticos en la nueva generación de FFM y desarrollar agentes que agilizan los procesos de diseño en Figma.',
        tools: ['Claude Code', 'Notion', 'OpenIA'],
        avatarUrl: AS,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.2) 41.27%, rgba(94, 155, 222, 0.1) 85.29%, rgba(94, 155, 222, 0) 100.08%)',
    },
    {
        id: '10',
        name: 'Ricardo Carmona',
        role: 'Head de Diseño UX UI',
        roleColor: '#FDC601', // Lemone Chrome
        project: 'Nuevo Portal Totalplay, Rediseño App de Ventas Residencial',
        quote: 'Utilizamos la inteligencia artificial como una herramienta de apoyo durante las primeras etapas de diseño. Con prompts enfocados en las necesidades de cada proyecto, obtuvimos una base para visualizar pantallas y flujos, detectar oportunidades de mejora y desarrollar propuestas visuales con mayor rapidez.',
        tools: ['Figma Make', 'Open IA'],
        avatarUrl: RC,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.2) 41.27%, rgba(253, 198, 1, 0.1) 85.29%, rgba(253, 198, 1, 0) 100.08%)',
    },
];

interface MakersCarouselProps {
    makers?: MakerCardItem[];
}

export const HistoriasMakers: React.FC<MakersCarouselProps> = ({
                                                                   makers = defaultMakersData,
                                                               }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -338 : 338;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section
            id="historias"
            className="w-full max-w-[1280px] mx-auto py-12 px-4 md:px-8 font-['Montserrat',sans-serif] scroll-mt-[68px]"
        >
            {/* Frame 5: Encabezado de la Sección */}
            <div className="w-full max-w-[577px] mx-auto flex flex-col items-center text-center mb-6">
                {/* Subtítulo: Nuestras historias de éxito */}
                <span className="font-bold text-[18px] leading-[22px] text-[#FFD024] text-center tracking-wide">
                    Nuestras historias de éxito
                </span>

                {/* Frame 22: Título H2 */}
                <div className="w-full max-w-[577px] min-h-[100px] sm:min-h-[147px] flex items-center justify-center mt-2">
                    <h2 className="font-bold text-[32px] sm:text-[40px] leading-[40px] sm:leading-[49px] text-white text-center">
                        Conoce a los Total Makers detrás de la transformación
                    </h2>
                </div>
            </div>

            {/* Frame 10: Contenedor con Scroll Horizontal (Manual + Touch) */}
            <div
                ref={scrollRef}
                className="flex items-start gap-[20px] overflow-x-auto pt-[50px] pb-4 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {makers.map((maker) => (
                    <div
                        key={maker.id}
                        className="relative flex flex-col items-center flex-shrink-0 w-[318px] h-[506.28px] snap-start select-none"
                    >
                        {/* Fotografía / Avatar con Contorno Bicolor */}
                        <div
                            className="w-[100px] h-[100px] rounded-full p-[1px] z-10 -mb-[50px] flex-shrink-0 shadow-lg"
                            style={{
                                background: `linear-gradient(180deg, #000000 20%, ${maker.roleColor} 100%)`,
                            }}
                        >
                            <div className="w-full h-full rounded-full overflow-hidden bg-[#090B14]">
                                <img
                                    src={maker.avatarUrl}
                                    alt={`Fotografía de ${maker.name}`}
                                    className="w-full h-full object-cover pointer-events-none"
                                    onError={(e) => {
                                        (e.target as HTMLElement).style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Tarjeta con altura estricta fija */}
                        <div
                            className="w-[318px] h-[456.28px] pt-[60px] px-[16px] pb-[20px] flex flex-col justify-between items-center gap-[8px] border border-white/30 rounded-[20px] backdrop-blur-md shadow-[0px_2px_8px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:-translate-y-1 flex-shrink-0 overflow-hidden"
                            style={{
                                background: maker.gradientBackground,
                            }}
                        >
                            {/* Información Personal: Nombre + Rol */}
                            <div className="flex flex-col items-center text-center w-full h-[45px] justify-center flex-shrink-0">
                                <h3 className="font-bold text-[20px] leading-[24px] text-white truncate max-w-full">
                                    {maker.name}
                                </h3>
                                <span
                                    className="font-bold text-[14px] leading-[20px] mt-0.5 truncate max-w-full"
                                    style={{ color: maker.roleColor }}
                                >
                                    {maker.role}
                                </span>
                            </div>

                            {/* Proyecto */}
                            <div className="w-full flex justify-center items-center h-[40px] flex-shrink-0">
                                <p className="font-semibold text-[15px] leading-[20px] text-center text-white line-clamp-2">
                                    {maker.project}
                                </p>
                            </div>

                            {/* Párrafo / Testimonio con Scroll Interno Discreto */}
                            <div
                                className="w-full h-[195px] my-auto overflow-y-auto pr-1 flex items-start"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                <p className="font-normal text-[14px] leading-[20px] text-white/90 text-left my-auto">
                                    {maker.quote}
                                </p>
                            </div>

                            {/* Insignias de Herramientas */}
                            <div className="w-full h-[62px] flex flex-wrap items-end justify-start gap-[6px] overflow-hidden flex-shrink-0 pt-1">
                                {maker.tools.map((tool, index) => (
                                    <span
                                        key={index}
                                        className="px-[10px] py-[3px] bg-white/10 backdrop-blur-sm shadow-[0px_2px_8px_rgba(0,0,0,0.2)] rounded-[20px] font-semibold text-[12px] leading-[16px] text-white border border-white/10 flex-shrink-0"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botones de navegación inferiores (Centrados) */}
            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    onClick={() => scroll('left')}
                    aria-label="Anterior"
                    className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer shadow-md"
                >
                    &larr;
                </button>
                <button
                    onClick={() => scroll('right')}
                    aria-label="Siguiente"
                    className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer shadow-md"
                >
                    &rarr;
                </button>
            </div>
        </section>
    );
};

export default HistoriasMakers;