import React from 'react';

interface AgendaTag {
    label: string;
    type:
        | 'recepcion'
        | 'apertura'
        | 'conferencia'
        | 'ia'
        | 'diseno'
        | 'caso_exito'
        | 'descanso'
        | 'cierre'
        | 'networking';
}

interface AgendaItem {
    id: string;
    time: string;
    title: string;
    tags: AgendaTag[];
    description: string;
    speaker?: string;
    location?: string;
    isBreak?: boolean;
}

const agendaData: AgendaItem[] = [
    {
        id: '1',
        time: '08:30',
        title: 'Recepción y registro',
        tags: [
            { label: 'Recepción', type: 'recepcion' },
            { label: 'Apertura', type: 'apertura' },
        ],
        description: 'Bienvenida institucional, presentación de la agenda',
        location: 'El Encanto Salón Campestre',
    },
    {
        id: '2',
        time: '08:40',
        title: 'Apertura y propósito del evento',
        tags: [{ label: 'Apertura', type: 'apertura' }],
        description: 'Bienvenida institucional, presentación de la agenda',
        speaker: 'Aurelio Saynes',
    },
    {
        id: '3',
        time: '09:10',
        title: 'Sales Cloud de Salesforce',
        tags: [{ label: 'Conferencia', type: 'conferencia' }],
        description: 'Bienvenida institucional, presentación de la agenda',
        speaker: 'Salesforce',
    },
    {
        id: '4',
        time: '09:40',
        title: 'AWS Cloud',
        tags: [{ label: 'Conferencia', type: 'conferencia' }],
        description: 'Bienvenida institucional, presentación de la agenda',
        speaker: 'AWS',
    },
    {
        id: '5',
        time: '10:10',
        title: 'Kiro: Desarrollo asistido por IA',
        tags: [{ label: 'Conferencia', type: 'conferencia' }],
        description: 'Bienvenida institucional, presentación de la agenda',
        speaker: 'AWS',
    },
    {
        id: '6',
        time: '10:40',
        title: 'Sesión Deloitte',
        tags: [{ label: 'Conferencia', type: 'conferencia' }],
        description: 'Bienvenida institucional, presentación de la agenda',
        speaker: 'Deloitte',
    },
    {
        id: '7',
        time: '11:10',
        title: 'Estrategia Digital e Innovación',
        tags: [{ label: 'Conferencia', type: 'conferencia' }],
        description: 'Bienvenida institucional, presentación de la agenda',
        speaker: 'Equipo Totalplay',
    },
    {
        id: '8',
        time: '11:40',
        title: 'Descanso',
        tags: [],
        description: 'Bienvenida institucional, presentación de la agenda',
        isBreak: true,
    },
    {
        id: '9',
        time: '11:50',
        title: 'App de Ventas',
        tags: [{ label: 'Caso de éxito', type: 'caso_exito' }],
        description: 'Bienvenida institucional, presentación de la agenda',
        speaker: 'Ana Ceci, Reynaldo Escobar y Felipe Jimenez',
    },
    {
        id: '10',
        time: '12:10',
        title: 'Nuevo Portal de Totalplay',
        tags: [{ label: 'Caso de éxito', type: 'caso_exito' }],
        description: 'Bienvenida institucional, presentación de la agenda',
        speaker: 'Ana Ceci, Mariana Quintos y Mariana Nogal',
    },
    {
        id: '11',
        time: '12:30',
        title: 'FFM Cobranza',
        tags: [{ label: 'Caso de éxito', type: 'caso_exito' }],
        description: 'Bienvenida institucional, presentación de la agenda',
        speaker: 'Andrea Figueroa, Randy Aguayo, Melina Castillo',
    },
    {
        id: '12',
        time: '12:50',
        title: 'Portal de PYMES',
        tags: [{ label: 'Caso de éxito', type: 'caso_exito' }],
        description: 'Bienvenida institucional, presentación de la agenda',
        speaker: 'Fernando Campos y Ricardo Moreno',
    },
    {
        id: '13',
        time: '13:10',
        title: 'Portal de Sellers',
        tags: [{ label: 'Caso de éxito', type: 'caso_exito' }],
        description: 'Bienvenida institucional, presentación de la agenda',
        speaker: 'Andrea Figueroa, César Delgado',
    },
    {
        id: '14',
        time: '13:30',
        title: 'IA aplicada al diseño',
        tags: [{ label: 'Caso de éxito', type: 'caso_exito' }],
        description: 'Bienvenida institucional, presentación de la agenda',
        speaker: 'Ramzy Hurrle y Melina Castillo',
    },
    {
        id: '15',
        time: '13:50',
        title: 'Palabras de cierre',
        tags: [{ label: 'Cierre', type: 'cierre' }],
        description: 'Bienvenida institucional, presentación de la agenda',
        speaker: 'Aurelio Saynes',
    },
    {
        id: '16',
        time: '14:00',
        title: 'Comida',
        tags: [],
        description: 'Bienvenida institucional, presentación de la agenda',
        isBreak: true,
    },
    {
        id: '17',
        time: '15:00',
        title: 'Convivencia',
        tags: [{ label: 'Networking', type: 'networking' }],
        description: 'Bienvenida institucional, presentación de la agenda',
    },
];

const getTagStyle = (type: AgendaTag['type']) => {
    switch (type) {
        case 'recepcion':
            return 'bg-[rgba(56,189,248,0.082)] border-[rgba(56,189,248,0.19)] text-[#38BDF8]';
        case 'apertura':
        case 'caso_exito':
            return 'bg-[rgba(189,69,255,0.082)] border-[rgba(189,69,255,0.19)] text-[#BD45FF]';
        case 'conferencia':
        case 'cierre':
        case 'networking':
            return 'bg-[rgba(54,123,255,0.082)] border-[rgba(54,123,255,0.19)] text-[#38BDF8]';
        case 'ia':
            return 'bg-[rgba(53,216,255,0.082)] border-[rgba(53,216,255,0.19)] text-[#35D8FF]';
        case 'diseno':
            return 'bg-[rgba(229,72,255,0.082)] border-[rgba(229,72,255,0.19)] text-[#E548FF]';
        case 'descanso':
        default:
            return 'bg-white/10 border-white/20 text-white';
    }
};

export const AgendaMakers: React.FC = () => {
    return (
        <section className="w-full bg-[#0a0e1a] text-white py-12 px-4 md:px-8 lg:px-12 flex justify-center font-['Montserrat',sans-serif]">
            <div className="w-full max-w-[1280px] flex flex-col gap-[50px]">
                {/* Encabezado */}
                <div className="w-full max-w-[526px] flex flex-col items-start gap-1">
          <span className="font-bold text-[18px] leading-[22px] text-[#BD45FF] text-left">
            Agenda
          </span>
                    <h2 className="font-bold text-[32px] sm:text-[40px] leading-[49px] text-white text-left">
                        Construye tu experiencia
                    </h2>
                </div>

                {/* Lista de Tarjetas */}
                <div className="flex flex-col gap-[12px] w-full">
                    {agendaData.map((item) => (
                        <div
                            key={item.id}
                            className={`w-full min-h-[92px] p-[20px_24px] rounded-[20px] border border-white/14 shadow-[0px_2px_8px_rgba(0,0,0,0.2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-300 hover:border-white/30 ${
                                item.isBreak ? 'bg-white/10 backdrop-blur-md' : 'bg-black/20 backdrop-blur-md'
                            }`}
                        >
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-[20px] w-full">
                                {/* Columna Hora */}
                                <div className="min-w-[60px] flex flex-col items-start justify-center">
                  <span className="font-bold text-[18px] leading-[22px] text-[#38BDF8]">
                    {item.time}
                  </span>
                                </div>

                                {/* Columna Contenido */}
                                <div className="flex flex-col justify-center gap-[8px] flex-1 w-full">
                                    {/* Fila Título + Tags */}
                                    <div className="flex flex-wrap items-center justify-between md:justify-start gap-[10px] w-full">
                                        <h3 className="font-bold text-[18px] leading-[22px] text-white text-left">
                                            {item.title}
                                        </h3>

                                        {/* Contenedor de Badges */}
                                        {item.tags.length > 0 && (
                                            <div className="flex items-center gap-[10px] flex-wrap">
                                                {item.tags.map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className={`px-[8px] py-[2px] rounded-full border text-[16px] font-bold leading-[20px] shadow-[0px_2px_8px_rgba(0,0,0,0.2)] ${getTagStyle(
                                                            tag.type
                                                        )}`}
                                                    >
                            {tag.label}
                          </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Descripción */}
                                    <p className="font-normal text-[16px] leading-[20px] text-white/90 text-left">
                                        {item.description}
                                    </p>

                                    {/* Ponente / Ubicación */}
                                    {(item.speaker || item.location) && (
                                        <div className="flex flex-wrap items-center gap-[16px] pt-1">
                                            {item.speaker && (
                                                <div className="flex items-center gap-[5px]">
                                                    <div className="w-[16px] h-[16px] flex items-center justify-center">
                                                        <svg
                                                            className="w-[14px] h-[14px] text-white"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                        >
                                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                            <circle cx="12" cy="7" r="4" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-normal text-[14px] leading-[20px] text-white">
                            {item.speaker}
                          </span>
                                                </div>
                                            )}

                                            {item.location && (
                                                <div className="flex items-center gap-[5px]">
                                                    <div className="w-[16px] h-[16px] flex items-center justify-center">
                                                        <svg
                                                            className="w-[14px] h-[14px] text-white"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                        >
                                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                            <circle cx="12" cy="10" r="3" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-normal text-[14px] leading-[20px] text-white">
                            {item.location}
                          </span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AgendaMakers;