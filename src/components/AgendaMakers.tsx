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
    endTime?: string;
    title: string;
    tags: AgendaTag[];
    description: string;
    speaker?: string;
    location?: string;
    isBreak?: boolean;
    isHighlight?: boolean;
}

const agendaData: AgendaItem[] = [
    {
        id: '1',
        time: '08:30 - 09:00',
        title: 'Recepción y registro',
        tags: [
            { label: 'Recepción', type: 'recepcion' },
            { label: 'Apertura', type: 'apertura' },
        ],
        description: 'Llegada y registro de los asistentes',
        location: 'El Encanto Salón Campestre',
    },
    {
        id: '2',
        time: '09:00 - 09:10',
        title: 'Palabras de Bienvenida',
        tags: [{ label: 'Apertura', type: 'apertura' }],
        description: 'Apertura del evento y presentación de objetivos',
        speaker: 'Aurelio Saynes',
    },
    {
        id: '3',
        time: '09:10 - 09:25',
        title: 'Nuevo Portal de Totalplay',
        tags: [{ label: 'Conferencia', type: 'conferencia' }],
        description: 'Presentación de la experiencia y capacidades del nuevo portal',
        speaker: 'Ana Ceci, Mariana Quintos, Mariana Nogal, JC y Eliceo',
    },
    {
        id: '4',
        time: '09:25 - 09:55',
        title: 'ClaudeForce de Salesforce',
        tags: [{ label: 'Conferencia', type: 'conferencia' }],
        description: 'Presentación de capacidades y oportunidades de Sales Cloud',
        speaker: 'Anaid Moncada y Christian Lozano',
    },
    {
        id: '5',
        time: '09:55 - 10:10',
        title: 'IA para agilizar el Desarrollo Móvil',
        tags: [{ label: 'Caso de éxito', type: 'caso_exito' }],
        description: 'Experiencia y evolución de la IA en el desarrollo móvil',
        speaker: 'Miguel Ángel Nava',
    },
    {
        id: '6',
        time: '10:10 - 10:40',
        title: 'AWS Kiro',
        tags: [{ label: 'Conferencia', type: 'conferencia' }],
        description: 'Nuevas formas de acelerar el desarrollo con IA',
        speaker: 'Efraín Castilla',
    },
    {
        id: '7',
        time: '10:40 - 10:50',
        title: 'Descanso',
        tags: [],
        description: 'Pausa de 10 minutos',
        isBreak: true,
    },
    {
        id: '8',
        time: '10:50 - 11:05',
        title: 'FFM Cobranza',
        tags: [{ label: 'Conferencia', type: 'caso_exito' }],
        description: 'Aplicación de tecnología para optimizar la operación  y gestión de cobranza',
        speaker: 'Andrea Figueroa, Randy Castillo y Melina Castillo',
    },
    {
        id: '9',
        time: '11:05 - 11:35',
        title: 'Sesión Deloitte',
        tags: [{label: 'Conferencia', type: 'conferencia' }],
        description: 'Perspectivas y soluciones para la transformación digital',
        speaker: 'Miguel Iza Moreno',
    },
    {
        id: '10',
        time: '11:35 - 11:50',
        title: 'Caso de Éxito del Centro de Soluciones',
        tags: [{ label: 'Caso de éxito', type: 'caso_exito' }],
        description: 'Centro de Soluciones',
        speaker: 'Mariana Nogal, Eliceo, Carlos López',

    },
    {
        id: '11',
        time: '11:50 - 12:20',
        title: 'Google',
        tags: [{ label: 'Conferencia', type: 'conferencia' }],
        description: 'Google',
        speaker: 'Miguel López',
    },
    {
        id: '12',
        time: '12:20 -12:35',
        title: 'App de Ventas',
        tags: [{ label: 'Caso de éxito', type: 'caso_exito' }],
        description: 'Experiencia y evolución de la nueva solución comercial',
        speaker: 'Ana Ceci, Reynaldo Escobar , Omar Morgado y Felipe Jimenez',
    },
    {
        id: '13',
        time: '12:35 - 13:05',
        title: 'AWS Cloud',
        tags: [{ label: 'Conferencia', type: 'conferencia' }],
        description: 'Soluciones y capacidades de nube para impulsar la innovación',
        speaker: 'Daniel Morales',
    },
    {
        id: '14',
        time: '13:05 - 13:20',
        title: 'Portal de PYMES',
        tags: [{ label: 'Caso de éxito', type: 'caso_exito' }],
        description: 'Soluciones enfocadas en la experiencia del segmento empresarial',
        speaker: 'Fernando Campos, Ricardo Moreno y Ricardo Ruíz',
    },
    {
        id: '15',
        time: '13:20 - 13:35',
        title: 'Caso de Éxito Auditoria',
        tags: [{ label: 'Caso de éxito', type: 'caso_exito' }],
        description: 'Caso de Éxito Auditoria',
        speaker: 'Carlos Pereyra',
    },
    {
        id: '16',
        time: '13:35 - 13:45',
        title: 'Descanso',
        tags: [],
        description: 'Pausa de 10 minutos',
        isBreak: true,
    },
    {
        id: '17',
        time: '13:45 - 14:00',
        title: 'Portal de Sellers para Marketplace',
        tags: [{ label: 'Caso de éxito', type: 'caso_exito' }],
        description: 'Evolución de las herramientas digitales para la gestión comercial',
        speaker: 'Andrea Figueroa, César Delgado',
    },
    {
        id: '18',
        time: '14:00 - 14:15',
        title: 'IA aplicada al diseño',
        tags: [{ label: 'Caso de éxito', type: 'caso_exito' }],
        description: 'Uso de Inteligencia Artificial para potenciar el  proceso de diseño de interfaces.',
        speaker: 'Ramzy Hurrle, Marisol Laborie y Melina Castillo',
    },
    {
        id: '19',
        time: '14:15 - 14:30',
        title: 'Arquitectura IA Ready',
        tags: [{ label: 'Caso de éxito', type: 'caso_exito' }],
        description: 'Uso de Inteligencia Artificial',
        speaker: 'Mariana Nogal',
    },
    {
        id: '20',
        time: '14:30 - 14:45',
        title: 'Adopción de Claude Enterprise',
        tags: [{ label: 'Caso de éxito', type: 'caso_exito' }],
        description: 'Claude Enterprise',
        speaker: 'Alfredo Suárez',
    },
    {
        id: '21',
        time: '14:45 - 15:00',
        title: 'Palabras de cierre',
        tags: [{ label: 'Cierre', type: 'cierre' }],
        description: 'Conclusiones y mensaje final de la jornada',
        speaker: 'Aurelio Saynes',
    },
    {
        id: '22',
        time: '15:00',
        endTime: '19:00',
        title: 'Comida & Convivencia',
        tags: [{ label: 'Networking', type: 'networking' }],
        description: 'Espacio de integración y networking.',
        isHighlight: true,
    },
];

const getTagStyle = (type: AgendaTag['type']) => {
    switch (type) {
        case 'recepcion':
            return {
                textColor: 'text-[#38BDF8]',
                bgGradient: 'linear-gradient(180deg, rgba(56, 189, 248, 0.22) 0%, rgba(56, 189, 248, 0.05) 100%)',
                borderColor: 'border-t border-l border-[#38BDF8]/60 border-r border-b border-[#38BDF8]/20',
            };
        case 'apertura':
        case 'caso_exito':
            return {
                textColor: 'text-[#BD45FF]',
                bgGradient: 'linear-gradient(180deg, rgba(189, 69, 255, 0.22) 0%, rgba(189, 69, 255, 0.05) 100%)',
                borderColor: 'border-t border-l border-[#BD45FF]/60 border-r border-b border-[#BD45FF]/20',
            };
        case 'conferencia':
        case 'cierre':
        case 'networking':
            return {
                textColor: 'text-[#38BDF8]',
                bgGradient: 'linear-gradient(180deg, rgba(54, 123, 255, 0.22) 0%, rgba(54, 123, 255, 0.05) 100%)',
                borderColor: 'border-t border-l border-[#367BFF]/60 border-r border-b border-[#367BFF]/20',
            };
        case 'ia':
            return {
                textColor: 'text-[#35D8FF]',
                bgGradient: 'linear-gradient(180deg, rgba(53, 216, 255, 0.22) 0%, rgba(53, 216, 255, 0.05) 100%)',
                borderColor: 'border-t border-l border-[#35D8FF]/60 border-r border-b border-[#35D8FF]/20',
            };
        case 'diseno':
            return {
                textColor: 'text-[#E548FF]',
                bgGradient: 'linear-gradient(180deg, rgba(229, 72, 255, 0.22) 0%, rgba(229, 72, 255, 0.05) 100%)',
                borderColor: 'border-t border-l border-[#E548FF]/60 border-r border-b border-[#E548FF]/20',
            };
        case 'descanso':
        default:
            return {
                textColor: 'text-white',
                bgGradient: 'linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.05) 100%)',
                borderColor: 'border-t border-l border-white/60 border-r border-b border-white/20',
            };
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
                                item.isHighlight
                                    ? 'bg-white/10 backdrop-blur-md border-white/20'
                                    : item.isBreak
                                        ? 'bg-white/10 backdrop-blur-md'
                                        : 'bg-black/20 backdrop-blur-md'
                            }`}
                        >
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
                                {/* Contenedor Izquierda + Centro (Hora y Contenido) */}
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-[20px] flex-1 w-full">
                                    {/* Columna Hora */}
                                    <div className="min-w-[70px] flex flex-col items-start justify-center gap-1">
                                        <span className="font-bold text-[18px] leading-[22px] text-[#38BDF8]">
                                            {item.time}
                                        </span>
                                        {item.endTime && (
                                            <>
                                                <div className="w-[49px] h-[0px] border-b border-[#C7C7C7] my-0.5" />
                                                <span className="font-bold text-[18px] leading-[22px] text-[#38BDF8]">
                                                    {item.endTime}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    {/* Columna Contenido */}
                                    <div className="flex flex-col justify-center gap-[8px] flex-1 w-full">
                                        <h3 className="font-bold text-[18px] leading-[22px] text-white text-left">
                                            {item.title}
                                        </h3>

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

                                {/* Contenedor Derecha: Badges con Efecto Glass Mejorado */}
                                {item.tags.length > 0 && (
                                    <div className="flex items-center gap-[10px] flex-wrap md:justify-end self-start md:self-center flex-shrink-0">
                                        {item.tags.map((tag, idx) => {
                                            const tagStyle = getTagStyle(tag.type);
                                            return (
                                                <span
                                                    key={idx}
                                                    className={`px-[12px] py-[4px] rounded-full backdrop-blur-md text-[14px] font-bold leading-[18px] shadow-[0px_4px_10px_rgba(0,0,0,0.35)] ${tagStyle.textColor} ${tagStyle.borderColor}`}
                                                    style={{ background: tagStyle.bgGradient }}
                                                >
                                                    {tag.label}
                                                </span>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AgendaMakers;