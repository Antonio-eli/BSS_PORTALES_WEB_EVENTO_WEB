import React, { useRef, useEffect, useState } from 'react';
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
import FJ from '../assets/FJ.avif';
import MQ from '../assets/MQ.avif';
import FC from '../assets/FC.avif';
import RZ from '../assets/RZ.avif';
import NOG from '../assets/NOG.avif';
import AND from '../assets/AND.avif';
import MAR from '../assets/MAR.avif';
import CD from '../assets/CD.avif';

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
        role: 'Enterprise Solutions Manager',
        roleColor: '#38DD02', // Poison Green
        project: 'Nuevo Portal Totalplay',
        quote: 'La inteligencia artificial me permite acelerar el desarrollo de funcionalidades, detectar errores y generar pruebas con mayor rapidez. Así puedo concentrar mi experiencia en validar la lógica, optimizar el código y asegurar la calidad de cada implementación.',
        tools: ['GitHub Copilot', 'Codex'],
        avatarUrl: RM,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(56, 221, 2, 0.35) 85%, rgba(56, 221, 2, 0.1) 100%)',
    },
    {
        id: '2',
        name: 'Juan Carlos',
        role: 'AI & Intelligent Systems Manager',
        roleColor: '#1877FF', // Super Sonic Blue
        project: 'Nuevo Portal Totalplay',
        quote: 'Construir el Portal requería velocidad y precisión. Al integrar la IA como mi asistente de código, asigné la implementación del stack y aceleré todo el flujo. Así, concentré mi experiencia en asegurar una integración impecable con Salesforce manteniendo los estándares de calidad al máximo.',
        tools: ['Claude Fable 5', 'GitHub Copilot'],
        avatarUrl: JC,
        gradientBackground:
            'linear-gradient(315.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(24, 119, 255, 0.35) 85%, rgba(24, 119, 255, 0.1) 100%)',
    },
    {
        id: '3',
        name: 'Reynaldo Escobar',
        role: 'Mobile Engineering Manager',
        roleColor: '#3BF200', // Neon Green
        project: 'Rediseño App de Ventas Residencial',
        quote: 'Aproveché las capacidades de la Inteligencia Artificial para convertir los requerimientos en propuestas de interfaz, materiales de soporte y representaciones geográficas. Esto me permitió enfocarme en la validación técnica y la salida a producción.',
        tools: ['Claude Sonnet', 'Gemini Flash'],
        avatarUrl: RE,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(59, 242, 0, 0.35) 85%, rgba(59, 242, 0, 0.1) 100%)',
    },
    {
        id: '4',
        name: 'Omar Morgado',
        role: 'Mobile App Developer',
        roleColor: '#00D3F3', // Bluefish
        project: 'Rediseño App de Ventas Residencial',
        quote: 'Para la App de Ventas, asigné a la IA las pantallas, mapas y documentación. Así, pude enfocar mi criterio técnico en auditar el código e integrar la lógica para salir a producción.',
        tools: ['Claude Sonnet', 'Gemini Flash'],
        avatarUrl: OM,
        gradientBackground:
            'linear-gradient(315.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(0, 211, 243, 0.35) 85%, rgba(0, 211, 243, 0.1) 100%)',
    },
    {
        id: '5',
        name: 'Ana Ceci',
        role: 'Web Experience Manager',
        roleColor: '#00D492', // Billiard Aqua
        project: 'Nuevo Portal Totalplay, Rediseño App de Ventas Residencial',
        quote: 'Incorporé la inteligencia artificial para agilizar mi proceso de diseño UX/UI. A través de prompts, generé propuestas iniciales de pantallas y recorridos, lo que me permitió validar ideas, mejorar los flujos y adelantar detalles visuales.',
        tools: ['Figma Make', 'Open IA'],
        avatarUrl: AC,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(0, 212, 146, 0.35) 85%, rgba(0, 212, 146, 0.1) 100%)',
    },
    {
        id: '6',
        name: 'Randy Castillo',
        role: 'App Developer',
        roleColor: '#FF8904', // Orange
        project: 'FFM Cobranza',
        quote: 'Integré la IA a mi flujo de desarrollo en la Migración de Cobranza a Flutter como apoyo para diagnosticar, implementar y documentar. Con reglas claras de verificación y revisión humana, mi ciclo de trabajo es más rápido y deja menos retrabajo, y las decisiones siguen siendo mías.',
        tools: ['Claude Code'],
        avatarUrl: RA,
        gradientBackground:
            'linear-gradient(315.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(255, 137, 4, 0.35) 85%, rgba(255, 137, 4, 0.1) 100%)',
    },
    {
        id: '7',
        name: 'Melina Castillo',
        role: 'UI/UX Designer',
        roleColor: '#F9459E', // Fandango Pink
        project: 'Nuevo Portal Totalplay, Rediseño App de Ventas Residencial',
        quote: 'Utilizamos la inteligencia artificial como una herramienta de apoyo durante las primeras etapas de diseño. Con prompts enfocados en las necesidades de cada proyecto, obtuvimos una base para visualizar pantallas y flujos, detectar oportunidades de mejora y desarrollar propuestas visuales con mayor rapidez.',
        tools: ['Figma Make', 'Open IA'],
        avatarUrl: MC,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(249, 69, 158, 0.35) 85%, rgba(249, 69, 158, 0.1) 100%)',
    },
    {
        id: '8',
        name: 'Eliceo',
        role: 'Principal AI Architect',
        roleColor: '#AC14FF', // Afterparty Purple
        project: 'Nuevo Portal Totalplay',
        quote: 'La Inteligencia Artificial me apoyó en la implementación técnica, lo que aceleró el proceso y me permitió concentrarme en garantizar una integración sólida con Salesforce y mantener altos estándares de calidad.',
        tools: ['Vscode', 'Claude sonnet'],
        avatarUrl: E,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(172, 20, 255, 0.35) 85%, rgba(172, 20, 255, 0.1) 100%)',
    },
    {
        id: '9',
        name: 'Alfred',
        role: 'Head of Tech Innovation & Emerging Tech',
        roleColor: '#5E9BDE', // Little Boy Blue
        project: 'Nuevo Portal Totalplay, Rediseño App de Ventas Residencial',
        quote: 'Mediante la integración de plataformas como Claude Code, Notion y ChatGPT Codex, entre otras, fue posible rediseñar la nueva Torre NOC, transformar salas de juntas en espacios inteligentes, incorporar procesos agénticos en la nueva generación de FFM y desarrollar agentes que agilizan los procesos de diseño en Figma.',
        tools: ['Claude Code', 'Notion', 'OpenIA'],
        avatarUrl: AS,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(94, 155, 222, 0.35) 85%, rgba(94, 155, 222, 0.1) 100%)',
    },
    {
        id: '10',
        name: 'Ricardo Ruíz',
        role: 'Software Development Lead',
        roleColor: '#FDC601', // Lemone Chrome
        project: 'Nuevo Portal Totalplay, Rediseño App de Ventas Residencial',
        quote: 'Integro la inteligencia artificial en mi proceso de desarrollo para analizar requerimientos, explorar soluciones y simplificar tareas repetitivas. Esto me permite dedicar mayor atención a la arquitectura, las integraciones y la revisión técnica del producto.',
        tools: ['Claude Code', 'Github Copilot'],
        avatarUrl: RC,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(253, 198, 1, 0.35) 85%, rgba(253, 198, 1, 0.1) 100%)',
    },
    {
        id: '11',
        name: 'Felipe Jiménez',
        role: 'Lead AI Strategist',
        roleColor: '#97E8CF', // Dewdrops Aqua
        project: 'Rediseño App de Ventas Residencial',
        quote: 'La inteligencia artificial me ayuda a diseñar y probar soluciones basadas en modelos y agentes, agilizando la creación de prototipos y la evaluación de resultados. Mi enfoque se concentra en validar su funcionamiento, precisión, seguridad y viabilidad técnica.',
        tools: ['Claude Code', 'Codex'],
        avatarUrl: FJ,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(151, 232, 207, 0.35) 85%, rgba(151, 232, 207, 0.1) 100%)',
    },
    {
        id: '12',
        name: 'Mariana Quintos',
        role: 'Executive Leadership · Marketplace',
        roleColor: '#00B8DB', // River Blue
        project: 'Nuevo Portal Totalplay',
        quote: 'La inteligencia artificial me permite analizar información del marketplace, identificar oportunidades y convertir datos en decisiones estratégicas. También agiliza la preparación de reportes, la priorización de iniciativas y el seguimiento de los objetivos del equipo.',
        tools: ['ChatGPT Business', 'Notion AI.'],
        avatarUrl: MQ,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(0, 211, 243, 0.35) 85%, rgba(0, 211, 243, 0.1) 100%)',
    },
    {
        id: '13',
        name: 'Fernando Campos',
        role: 'Executive Leadership · Telco Systems, FFM & OSS',
        roleColor: '#38DD02', // Poison Green
        project: 'Nuevo Portal Totalplay, Rediseño App de Ventas Residencial',
        quote: 'La inteligencia artificial me ayuda a integrar información de distintos sistemas, analizar incidencias y visualizar dependencias operativas. Esto facilita la toma de decisiones, la priorización de iniciativas y la coordinación de soluciones para FFM, OSS y los sistemas de telecomunicaciones.',
        tools: ['Microsoft 365 Copilot', 'Notion'],
        avatarUrl: FC,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(59, 242, 0, 0.35) 85%, rgba(59, 242, 0, 0.1) 100%)',
    },
    {
        id: '14',
        name: 'Ramzy Hurrle',
        role: 'UI/UX Manager',
        roleColor: '#186FEA', // Brilliant Blue
        project: 'Nuevo Portal Totalplay, Rediseño App de Ventas Residencial',
        quote: 'La inteligencia artificial fortalece mi proceso de diseño al facilitar el análisis de requerimientos, la creación de flujos y la generación de prototipos. Esto me permite enfocar mi criterio en la estrategia de experiencia, la usabilidad y la calidad de las interfaces.',
        tools: ['Figma Make', 'ChatGPT Business'],
        avatarUrl: RZ,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(94, 155, 222, 0.35) 85%, rgba(94, 155, 222, 0.1) 100%)',
    },
    {
        id: '15',
        name: 'Mariana Nogal',
        role: 'Executive Leadership · Artificial Intelligence, Data & Big Data',
        roleColor: '#EEEB46', // Summer Sun
        project: 'Nuevo Portal Totalplay, Rediseño App de Ventas Residencial',
        quote: 'La inteligencia artificial me permite evaluar oportunidades, estructurar casos de uso y acelerar la definición de iniciativas estratégicas. Mi experiencia se enfoca en asegurar que cada solución genere valor, sea medible y se implemente bajo criterios responsables de gobierno y seguridad.',
        tools: ['ChatGPT Business', 'Notion AI'],
        avatarUrl: NOG,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(238, 235, 70, 0.35) 85%, rgba(238, 235, 70, 0.1) 100%)',
    },
    {
        id: '16',
        name: 'Andrea Figueroa',
        role: 'Executive Leadership · Financial Systems, Credit & Collections',
        roleColor: '#00D3F3', // Bluefish
        project: 'Nuevo Portal Totalplay, Rediseño App de Ventas Residencial',
        quote: 'La inteligencia artificial me ayuda a analizar procesos de cobranza, identificar oportunidades de automatización y estructurar requerimientos con mayor rapidez. Esto facilita la toma de decisiones y la evolución de soluciones orientadas a mejorar la eficiencia operativa y el seguimiento.',
        tools: ['Cloude Fable 5', 'GitHub Copilot'],
        avatarUrl: AND,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(0, 211, 243, 0.35) 85%, rgba(0, 211, 243, 0.1) 100%)',
    },
    {
        id: '17',
        name: 'Marisol Laborie',
        role: 'Customer Journey & Process Orchestration Lead',
        roleColor: '#F9459E', // Fandango Pink
        project: 'Nuevo Portal Totalplay, Rediseño App de Ventas Residencial',
        quote: 'La inteligencia artificial me permite analizar procesos y recorridos de cliente, detectar puntos de fricción y organizar hallazgos de diferentes fuentes. Así puedo concentrarme en diseñar experiencias más claras, eficientes y alineadas con las necesidades de los usuarios.',
        tools: ['Miro AI', 'ChatGPT Business'],
        avatarUrl: MAR,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(252, 0, 119, 0.35) 85%, rgba(252, 0, 119, 0.1) 100%)',
    },
    {
        id: '18',
        name: 'César Delgado',
        role: 'Marketplace Systems Lead',
        roleColor: '#BD45FF', // Purple Flower
        project: 'Nuevo Portal Totalplay, Rediseño App de Ventas Residencial',
        quote: 'La inteligencia artificial me ayuda a acelerar el desarrollo de funcionalidades para Marketplace, revisar integraciones y generar pruebas técnicas. Esto me permite enfocarme en asegurar un código estable, escalable y alineado con las necesidades del negocio.',
        tools: ['Claude Code', 'GitHub Copilot'],
        avatarUrl: CD,
        gradientBackground:
            'linear-gradient(135.12deg, rgba(0, 0, 0, 0.4) 30%, rgba(151, 57, 239, 0.35) 85%, rgba(151, 57, 239, 0.1) 100%)',
    },
];

interface MakersCarouselProps {
    makers?: MakerCardItem[];
}

export const HistoriasMakers: React.FC<MakersCarouselProps> = ({
                                                                   makers = defaultMakersData,
                                                               }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Función de Scroll Manual
    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -338 : 338;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Efecto para Autoscroll / Movimiento Automático
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused && scrollRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

                // Si llega al final del scroll, regresa suavemente al inicio
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollRef.current.scrollBy({ left: 338, behavior: 'smooth' });
                }
            }
        }, 2500); // Avanza automáticamente cada 2.5 segundos

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <section
            id="historias"
            className="w-full max-w-[1280px] mx-auto py-12 px-4 md:px-8 font-['Montserrat',sans-serif] scroll-mt-[68px]"
        >
            {/* Encabezado de la Sección */}
            <div className="w-full max-w-[577px] mx-auto flex flex-col items-center text-center mb-6">
                <span className="font-bold text-[28px] leading-[22px] text-[#FFD024] text-center tracking-wide">
                    Nuestras historias de éxito
                </span>

                <div className="w-full max-w-[577px] min-h-[100px] sm:min-h-[147px] flex items-center justify-center mt-2">
                    <h2 className="font-bold text-[32px] sm:text-[40px] leading-[40px] sm:leading-[49px] text-white text-center">
                        Conoce a los Total Makers detrás de la transformación
                    </h2>
                </div>
            </div>

            {/* Contenedor con Scroll Horizontal (Automático + Manual + Pausa en Hover) */}
            <div
                ref={scrollRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
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

                        {/* Tarjeta con altura estricta fija y colores vibrantes estilo Figma */}
                        <div
                            className="w-[318px] h-[456.28px] pt-[60px] px-[16px] pb-[16px] flex flex-col justify-between items-center gap-[6px] border-t border-white/50 border-x border-b border-white/20 rounded-[20px] backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-transform duration-300 hover:-translate-y-1 flex-shrink-0 overflow-hidden"
                            style={{
                                background: maker.gradientBackground,
                            }}
                        >
                            {/* Información Personal */}
                            <div className="flex flex-col items-center text-center w-full min-h-[45px] justify-center flex-shrink-0 px-1">
                                <h3 className="font-bold text-[20px] leading-[24px] text-white truncate max-w-full">
                                    {maker.name}
                                </h3>
                                <span
                                    className="font-bold text-[14px] leading-[18px] mt-0.5 text-center max-w-full line-clamp-2 break-words"
                                    style={{ color: maker.roleColor }}
                                >
                                    {maker.role}
                                </span>
                            </div>

                            {/* Proyecto */}
                            <div className="w-full flex justify-center items-center h-[36px] flex-shrink-0">
                                <p className="font-semibold text-[14px] leading-[18px] text-center text-white line-clamp-2">
                                    {maker.project}
                                </p>
                            </div>

                            {/* Testimonio ajustado para inicio superior y scroll interno perfecto */}
                            <div
                                className="w-full flex-1 my-1 overflow-y-auto pr-1 flex items-start justify-start"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                <p className="font-normal text-[13px] leading-[18px] text-white/90 text-left align-top">
                                    {maker.quote}
                                </p>
                            </div>

                            {/* Insignias de Herramientas con efecto Glassmorphism realista (Sin restricciones de altura fija) */}
                            <div className="w-full flex flex-wrap items-center justify-start gap-[6px] flex-shrink-0 pt-1 pb-1">
                                {maker.tools.map((tool, index) => (
                                    <span
                                        key={index}
                                        className="px-[12px] py-[3px] rounded-full font-bold text-[12px] leading-[16px] text-white backdrop-blur-md transition-all flex-shrink-0 border-t border-l border-white/60 border-r border-b border-white/20 shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
                                        style={{
                                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.05) 100%)',
                                        }}
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botones de navegación inferiores */}
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