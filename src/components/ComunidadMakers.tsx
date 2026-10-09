import React from 'react';
import com1 from '../assets/comunidad1.avif';
import com2 from '../assets/comunidad2.avif';
import com3 from '../assets/comunidad3.avif';
import com4 from '../assets/comunidad4.avif';
import com5 from '../assets/comunidad5.avif';
import com6 from '../assets/comunidad6.avif';
import com7 from '../assets/comunidad7.avif';

interface CommunitySectionProps {
    subtitle?: string;
    title?: string;
    description?: string;
    images?: {
        workshopTop?: string;
        presentation?: string;
        brainstorming1?: string;
        brainstorming2?: string;
        prototype?: string;
        workshopBottom1?: string;
        workshopBottom2?: string;
    };
}

export const ComunidadMakers: React.FC<CommunitySectionProps> = ({
                                                                     subtitle = 'Comunidad',
                                                                     title = 'Total Makers continúa después del evento',
                                                                     description = 'En cada mesa de los Total Makers encontrarás un banner con código QR para sumarte a la red e interactuar con la comunidad.',
                                                                     images = {
                                                                         workshopTop: com1,
                                                                         presentation: com2,
                                                                         brainstorming1: com3,
                                                                         brainstorming2: com4,
                                                                         prototype: com5,
                                                                         workshopBottom1: com6,
                                                                         workshopBottom2: com7,
                                                                     },
                                                                 }) => {
    return (
        <section className="w-full max-w-[1280px] mx-auto px-6 lg:px-[48px] py-12 flex flex-col items-center gap-[50px] font-['Montserrat',sans-serif]">
            {/* Frame 5: Encabezado */}
            <div className="w-full max-w-[882px] flex flex-col items-center text-center">
                {/* Subtítulo */}
                <span className="font-bold text-[18px] leading-[22px] text-[#00D3F3] tracking-wide">
          {subtitle}
        </span>

                {/* Título Principal */}
                <h2 className="font-bold text-[32px] sm:text-[40px] leading-[40px] sm:leading-[49px] text-white mt-2">
                    {title}
                </h2>

                {/* Parágrafo de Descripción */}
                <div className="w-full max-w-[580px] mt-4">
                    <p className="font-normal text-[16px] leading-[28px] text-white/90">
                        {description}
                    </p>
                </div>
            </div>

            {/* Container: Grid Bento / Galería */}
            <div className="w-full max-w-[1184px] flex flex-col gap-[14px]">
                {/* Fila Superior (Height 329.06px en Desktop) */}
                <div className="flex flex-col lg:flex-row gap-[14px] w-full lg:h-[329.06px]">
                    {/* Card 1: com1.avif (585px x 329.06px) */}
                    <div className="w-full lg:w-[585px] h-[250px] sm:h-[329.06px] bg-[#090B14] rounded-[16px] overflow-hidden flex-shrink-0">
                        <img
                            src={images.workshopTop}
                            alt="Equipo colaborando en workshop"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Card 2: com2.avif (285.5px x 329.06px) */}
                    <div className="w-full lg:w-[285.5px] h-[250px] sm:h-[329.06px] bg-[#090B14] rounded-[16px] overflow-hidden flex-shrink-0">
                        <img
                            src={images.presentation}
                            alt="Participante presentando proyecto"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Card 3 Stacked: com3.avif y com4.avif (2 imág. x 157.53px) */}
                    <div className="w-full lg:w-[285.5px] flex flex-col sm:flex-row lg:flex-col gap-[14px] h-full flex-shrink-0">
                        <div className="w-full h-[157.53px] bg-[#090B14] rounded-[16px] overflow-hidden flex-1">
                            <img
                                src={images.brainstorming1}
                                alt="Sesión de brainstorming 1"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="w-full h-[157.53px] bg-[#090B14] rounded-[16px] overflow-hidden flex-1">
                            <img
                                src={images.brainstorming2}
                                alt="Sesión de brainstorming 2"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Fila Inferior (Height 585px en Desktop) */}
                <div className="flex flex-col lg:flex-row gap-[14px] w-full lg:h-[585px]">
                    {/* Card 4: com5.avif (585px x 585px) */}
                    <div className="w-full lg:w-[585px] h-[350px] sm:h-[585px] bg-[#090B14] rounded-[16px] overflow-hidden flex-shrink-0">
                        <img
                            src={images.prototype}
                            alt="Prototipo en desarrollo"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Card 5 Stacked: com6.avif y com7.avif (2 imág. x 285.5px) */}
                    <div className="w-full lg:w-[585px] flex flex-col sm:flex-row lg:flex-col gap-[14px] h-full flex-shrink-0">
                        <div className="w-full h-[250px] sm:h-[285.5px] bg-[#090B14] rounded-[16px] overflow-hidden flex-1">
                            <img
                                src={images.workshopBottom1}
                                alt="Equipo colaborando en workshop 1"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="w-full h-[250px] sm:h-[285.5px] bg-[#090B14] rounded-[16px] overflow-hidden flex-1">
                            <img
                                src={images.workshopBottom2}
                                alt="Equipo colaborando en workshop 2"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComunidadMakers;