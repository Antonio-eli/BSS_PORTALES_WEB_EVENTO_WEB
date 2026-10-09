import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ResourceCard {
    id: string;
    courseName: string;
    category: string;
    instructor: string;
    description: string;
    avatarUrl: string;
    actionText: string;
    gradientClass: string;
}

const resourcesData: ResourceCard[] = [
    {
        id: 'res-1',
        courseName: 'IA en Operaciones',
        category: 'Inteligencia Artificial',
        instructor: 'Andrea Martínez',
        description: 'Automatizamos un proceso operativo utilizando IA para optimizar tiempos de respuesta.',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
        actionText: 'Reserva espacio',
        gradientClass: 'bg-gradient-to-br from-black/20 via-[#00D3F3]/10 to-transparent'
    },
    {
        id: 'res-2',
        courseName: 'Diseño para IA',
        category: 'UX / UI Design',
        instructor: 'Andrea Martínez',
        description: 'Estrategias y patrones de diseño para interfaces impulsadas por modelos de lenguaje.',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
        actionText: 'Reserva espacio',
        gradientClass: 'bg-gradient-to-bl from-black/20 via-[#00D3F3]/10 to-transparent'
    },
    {
        id: 'res-3',
        courseName: 'Prompt Engineering',
        category: 'Desarrollo Web',
        instructor: 'Carlos Mendoza',
        description: 'Técnicas avanzadas para estructurar prompts eficientes en aplicaciones empresariales.',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        actionText: 'Reserva espacio',
        gradientClass: 'bg-gradient-to-br from-black/20 via-[#00D3F3]/10 to-transparent'
    },
    {
        id: 'res-4',
        courseName: 'Microservicios',
        category: 'Arquitectura Cloud',
        instructor: 'Luis Hernández',
        description: 'Patrones de arquitectura e integración continua de servicios escalables.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        actionText: 'Reserva espacio',
        gradientClass: 'bg-gradient-to-bl from-black/20 via-[#00D3F3]/10 to-transparent'
    }
];

const RecursosMakers: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section id="recursos" className="flex flex-col items-start gap-[50px] w-full max-w-[1280px] mx-auto py-12 px-4 font-montserrat">
            {/* Encabezado */}
            <div className="flex flex-col items-start w-full max-w-[517px] gap-1">
                <span className="font-bold text-[18px] leading-[22px] text-[#BD45FF]">
                    Recursos
                </span>
                <h2 className="font-bold text-[32px] sm:text-[40px] leading-[40px] sm:leading-[49px] text-white">
                    Para seguir aprendiendo
                </h2>
            </div>

            {/* Grid de Tarjetas de Recursos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] w-full pt-[50px]">
                {resourcesData.map((item) => (
                    <div key={item.id} className="relative flex flex-col items-center w-full">
                        {/* Fotografía de Ponente */}
                        <div className="absolute -top-[50px] w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-white/20 shadow-lg z-10 bg-gray-800">
                            <img
                                src={item.avatarUrl}
                                alt={`Fotografía de ${item.instructor}`}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Contenedor Glassmorphism */}
                        <div
                            className={`box-border flex flex-col justify-between items-center w-full min-h-[341px] pt-[60px] pb-[28px] px-[28px] gap-[16px] border border-white/30 rounded-[20px] backdrop-blur-md shadow-[0px_2px_8px_rgba(0,0,0,0.2)] transition-all hover:border-white/50 ${item.gradientClass}`}
                        >
                            {/* Información Principal del Curso */}
                            <div className="flex flex-col items-center gap-[16px] w-full">
                                <div className="flex flex-col items-center text-center gap-1 w-full">
                                    <h3 className="font-bold text-[18px] leading-[22px] text-white">
                                        {item.courseName}
                                    </h3>
                                    <span className="font-bold text-[16px] leading-[20px] text-[#00D3F3]">
                                        {item.category}
                                    </span>
                                </div>

                                <span className="font-bold text-[14px] leading-[20px] text-center text-white">
                                    {item.instructor}
                                </span>

                                <p className="font-normal text-[14.4px] leading-[24px] text-white/90 text-center line-clamp-3">
                                    "{item.description}"
                                </p>
                            </div>

                            {/* Botón de Acceso (Redirección al Formulario) */}
                            <div className="flex flex-col items-end w-full pt-2">
                                <button
                                    onClick={() => navigate('/registro')}
                                    className="flex flex-row justify-center items-center gap-2 h-[24px] text-[#38BDF8] hover:text-[#00D3F3] transition-colors group cursor-pointer bg-transparent border-none"
                                >
                                    <span className="font-bold text-[16px] leading-[22px] text-center">
                                        {item.actionText}
                                    </span>
                                    <svg
                                        className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
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
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecursosMakers;