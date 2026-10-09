import React from 'react';

// Estructura de Cursos de Formación
interface CourseItem {
    id: string;
    type: 'Principal' | 'Complementario';
    title: string;
    provider: string;
}

// Estructura de Lecturas de Apoyo
interface ReadingItem {
    id: string;
    title: string;
    description: string;
    linkUrl: string;
}

const level1Courses: CourseItem[] = [
    {
        id: 'c1',
        type: 'Principal',
        title: 'Introducción a la Inteligencia Artificial',
        provider: 'Platzi',
    },
    {
        id: 'c2',
        type: 'Principal',
        title: 'Introduction to Generative AI',
        provider: 'Google',
    },
    {
        id: 'c3',
        type: 'Complementario',
        title: 'Artificial Intelligence Fundamentals',
        provider: 'IBM SkillsBuild',
    },
    {
        id: 'c4',
        type: 'Complementario',
        title: 'Introduction to Large Language Models',
        provider: 'Google',
    },
];

const level1Readings: ReadingItem[] = [
    {
        id: 'r1',
        title: 'What is artificial intelligence (AI)?',
        description: 'Identificar tareas en las que la IA puede ayudar y revisar sus resultados.',
        linkUrl: '#',
    },
    {
        id: 'r2',
        title: 'What is generative AI?',
        description: 'Comprender cómo se genera contenido y sus principales aplicaciones.',
        linkUrl: '#',
    },
    {
        id: 'r3',
        title: 'What is machine learning?',
        description: 'Ampliar fundamentos de aprendizaje automático, lenguaje y visión.',
        linkUrl: '#',
    },
    {
        id: 'r4',
        title: 'What are large language models (LLMs)?',
        description: 'Entender la arquitectura y funcionamiento básico de los modelos de lenguaje a gran escala.',
        linkUrl: '#',
    },
];

const additionalInfo = [
    'No requiere programación.',
    'En Google debe utilizarse el enlace al curso introductorio; no es necesario contratar una suscripción para otros laboratorios.',
    'IBM requiere una cuenta gratuita.',
    'Las lecturas son artículos públicos; algunas están en inglés.',
];

const requirements = [
    'Completar los dos cursos principales.',
    'Revisar sus dos lecturas asociadas y el video del nivel.',
    'Aprobar la evaluación interna con un mínimo de 80%.',
    'Entregar una tarea resuelta con IA, incluyendo instrucción, resultado y validación.',
    'Identificar una limitación o error y explicar cómo se atendió.',
    'Cargar las evidencias en Campus TI.',
];

const badgeLevels = [
    { id: 'maker', name: 'Maker', active: true },
    { id: 'builder', name: 'Builder', active: false },
    { id: 'creator', name: 'Creator', active: false },
    { id: 'architect', name: 'Architect', active: false },
    { id: 'master', name: 'Master Maker', active: false },
];

export const InsigniasMakers: React.FC = () => {
    return (
        <section
            id="insignias"
            className="w-full max-w-[1332px] mx-auto py-12 px-4 sm:px-6 lg:px-8 font-['Montserrat',sans-serif] text-white scroll-mt-[68px]"
        >
            {/* Frame 5: Encabezado principal */}
            <div className="w-full max-w-[677px] mx-auto flex flex-col items-center text-center gap-2 mb-12">
                <span className="font-bold text-[18px] leading-[22px] text-[#00D3F3] tracking-wide">
                    Insignias
                </span>
                <h2 className="font-bold text-[32px] sm:text-[40px] leading-[40px] sm:leading-[49px] text-white">
                    Rasgos de la comunidad Makers
                </h2>
                <p className="font-normal text-[16px] leading-[28px] text-white/90 max-w-[580px] mt-2">
                    En cada mesa de los Total Makers encontrarás un camino de desarrollo y reconocimiento continuo dentro de la organización.
                </p>
            </div>

            {/* Frame 43: Contenedor con Barra de Progresión e Insignias */}
            <div className="w-full flex flex-col gap-[50px]">
                {/* Stepper / Barra de Niveles de Insignias */}
                <div className="w-full overflow-x-auto pb-4 scrollbar-none">
                    <div className="min-w-[800px] flex items-center justify-between gap-2 px-4">
                        {badgeLevels.map((badge, index) => (
                            <React.Fragment key={badge.id}>
                                {/* Icono e Insignia */}
                                <div className="flex flex-col items-center gap-[8px] min-w-[80px]">
                                    <div
                                        className={`w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all ${
                                            badge.active
                                                ? 'bg-white/10 border border-white/20 shadow-[0px_0px_20px_rgba(255,255,255,0.25)]'
                                                : 'bg-[#C7C7C7]/20 border border-[#C7C7C7]/10'
                                        }`}
                                    >
                                        <svg
                                            width="28"
                                            height="32"
                                            viewBox="0 0 28 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-[28px] h-[32px]"
                                        >
                                            <g stroke={badge.active ? '#FFFFFF' : '#4B4B4B'} strokeWidth="1">
                                                <rect x="0" y="2" width="8" height="10" rx="1" fill={badge.active ? '#FFFFFF' : 'transparent'} />
                                                <rect x="0" y="11" width="8" height="10" rx="1" fill={badge.active ? '#FFFFFF' : 'transparent'} />
                                                <rect x="0" y="20" width="8" height="10" rx="1" fill={badge.active ? '#FFFFFF' : 'transparent'} />
                                                <rect x="10" y="6" width="8" height="10" rx="1" fill={badge.active ? '#FFFFFF' : 'transparent'} />
                                                <rect x="10" y="16" width="8" height="10" rx="1" fill={badge.active ? '#FFFFFF' : 'transparent'} />
                                                <rect x="20" y="11" width="8" height="10" rx="1" fill={badge.active ? '#FFFFFF' : 'transparent'} />
                                            </g>
                                        </svg>
                                    </div>
                                    <span
                                        className={`font-semibold text-[12px] leading-[15px] text-center ${
                                            badge.active ? 'text-white' : 'text-[#4B4B4B]'
                                        }`}
                                    >
                                        {badge.name}
                                    </span>
                                </div>

                                {index < badgeLevels.length - 1 && (
                                    <div className="flex-1 h-[1px] bg-[#4B4B4B] mx-2 -mt-5 min-w-[40px]" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Tarjeta Principal Glassmorphism (Nivel 1: Total Maker) */}
                <div className="w-full bg-black/20 border border-white/20 backdrop-blur-md shadow-[0px_2px_8px_rgba(0,0,0,0.2)] rounded-[20px] p-6 sm:p-8 flex flex-col gap-[36px]">

                    {/* Frame 33: Encabezado del Nivel */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-[30px] w-full">
                        {/* Ilustración / Insignia destacada */}
                        <div className="w-[72px] h-[88px] flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#00D3F3]/20 via-purple-600/20 to-transparent rounded-xl border border-white/20 shadow-lg">
                            <span className="font-bold text-[24px] text-[#00D3F3] tracking-wider">TM</span>
                        </div>

                        {/* Nivel + Título */}
                        <div className="flex flex-col justify-center gap-1 min-w-[159px]">
                            <span className="font-bold text-[18px] leading-[22px] text-[#00D3F3]">
                                Nivel 1 de 5
                            </span>
                            <h3 className="font-bold text-[26px] leading-[32px] text-white">
                                Total Maker
                            </h3>
                        </div>

                        {/* Descripción corta del Nivel */}
                        <p className="font-normal text-[16px] leading-[20px] text-white/90 flex-1 my-auto">
                            Punto de entrada a la comunidad. Asististe al evento y diste los primeros pasos en la adopción de herramientas de innovación e Inteligencia Artificial.
                        </p>
                    </div>

                    {/* Frame 34: Sección de Cursos de Formación */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-[18px] leading-[22px] text-[#35D8FF]">
                            Formación
                        </h4>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {level1Courses.map((course) => (
                                <div
                                    key={course.id}
                                    className="flex items-center justify-between p-3 sm:px-4 sm:py-3 bg-[#113C4F]/20 border border-[#25354B]/30 rounded-[10px] shadow-[0px_2px_8px_rgba(0,0,0,0.2)]"
                                >
                                    <div className="flex flex-col gap-2">
                                        <span
                                            className={`w-fit px-2 py-0.5 rounded-full text-[12px] font-semibold border ${
                                                course.type === 'Principal'
                                                    ? 'bg-[#CC8FFF]/10 border-[#CC8FFF]/20 text-[#A856F7]'
                                                    : 'bg-[#FFB372]/10 border-[#FFB372]/20 text-[#FFB372]'
                                            }`}
                                        >
                                            {course.type}
                                        </span>
                                        <span className="font-normal text-[15px] sm:text-[16px] leading-[20px] text-white">
                                            {course.title}
                                        </span>
                                    </div>

                                    <span className="px-2.5 py-1 bg-[#367BFF]/10 border border-[#367BFF]/20 rounded-full font-bold text-[13px] sm:text-[14px] text-[#38BDF8] flex-shrink-0">
                                        {course.provider}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contenedor Informativo Destacado */}
                    <div className="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-[12px] shadow-[0px_2px_8px_rgba(0,0,0,0.2)]">
                        <p className="font-normal text-[16px] leading-[20px] text-white">
                            Punto de entrada a la comunidad. Asististe al evento y diste los primeros pasos en la adopción de herramientas de innovación e Inteligencia Artificial.
                        </p>
                    </div>

                    {/* Vector 1 Divisor */}
                    <div className="w-full h-[1px] bg-[#4B4B4B]" />

                    {/* Frame 35: Lecturas de Apoyo por Curso */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-[18px] leading-[22px] text-[#00D3F3]">
                            Objetivo y lectura de apoyo por curso:
                        </h4>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {level1Readings.map((reading) => (
                                <div
                                    key={reading.id}
                                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 sm:p-4 bg-[#113C4F]/20 border border-[#25354B]/30 rounded-[10px]"
                                >
                                    <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md">
                                        <span className="text-[#0a0e1a] font-bold text-[14px]">
                                            TOTAL
                                        </span>
                                    </div>

                                    <div className="flex flex-col justify-between flex-1 gap-2 w-full">
                                        <div className="flex flex-col gap-1">
                                            <h5 className="font-semibold text-[16px] leading-[20px] text-white">
                                                {reading.title}
                                            </h5>
                                            <p className="font-normal text-[14px] leading-[20px] text-white/90">
                                                {reading.description}
                                            </p>
                                        </div>

                                        <div className="flex justify-end pt-1">
                                            <a
                                                href={reading.linkUrl}
                                                className="flex items-center gap-2 font-bold text-[16px] leading-[22px] text-[#38BDF8] hover:text-[#00D3F3] transition-colors group"
                                            >
                                                <span>Ir a lectura</span>
                                                <svg
                                                    className="w-5 h-5 text-[#38BDF8] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vector 2 Divisor */}
                    <div className="w-full h-[1px] bg-[#4B4B4B]" />

                    {/* Frame 36: Información Adicional */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-[18px] leading-[22px] text-[#35D8FF]">
                            Información adicional
                        </h4>

                        <div className="flex flex-col gap-2">
                            {additionalInfo.map((text, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-[30px] h-[30px] rounded-full bg-[#35D8FF]/10 border border-[#35D8FF]/20 flex items-center justify-center flex-shrink-0">
                                        <span className="font-bold text-[16px] leading-[20px] text-[#00D3F3]">
                                            {idx + 1}
                                        </span>
                                    </div>
                                    <p className="font-normal text-[16px] leading-[20px] text-white">
                                        {text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Requisitos para obtener Total Maker y desbloquear Total Builder */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-[18px] leading-[22px] text-[#35D8FF]">
                            Requisitos para obtener Total Maker y desbloquear Total Builder:
                        </h4>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-3">
                            {requirements.map((req, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-[30px] h-[30px] rounded-full bg-[#35D8FF]/10 border border-[#35D8FF]/20 flex items-center justify-center flex-shrink-0">
                                        <span className="font-bold text-[16px] leading-[20px] text-[#00D3F3]">
                                            {idx + 1}
                                        </span>
                                    </div>
                                    <p className="font-normal text-[16px] leading-[20px] text-white">
                                        {req}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Banner: Siguiente nivel */}
                    <div className="w-full px-4 py-3 bg-white/10 border border-white/5 rounded-[12px] shadow-[0px_2px_8px_rgba(0,0,0,0.2)]">
                        <span className="font-bold text-[18px] leading-[22px] text-white">
                            Siguiente nivel: Total Builder
                        </span>
                    </div>

                    {/* Frame 24: Botón Ver Menos */}
                    <div className="flex justify-end pt-2">
                        <button
                            type="button"
                            className="flex items-center gap-2 font-bold text-[18px] leading-[22px] text-[#38BDF8] hover:text-[#00D3F3] transition-colors cursor-pointer bg-transparent border-none"
                        >
                            Ver menos
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default InsigniasMakers;