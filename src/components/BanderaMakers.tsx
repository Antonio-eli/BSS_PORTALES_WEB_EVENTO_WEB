import flagImg from '../assets/Flag.avif';

const steps = [
    {
        step: 'Paso 01',
        symbol: '◎',
        description: 'Busca el escritorio  con el banderín del Total Maker que te interesa',
    },
    {
        step: 'Paso 02',
        symbol: '◈',
        description: 'Acércate, preséntate y cuéntale en qué área trabajas',
    },
    {
        step: 'Paso 03',
        symbol: '◇',
        description: 'Haz tu pregunta, comparte tu proyecto o pide orientación',
    },
    {
        step: 'Paso 04',
        symbol: '◉',
        description: 'Conecta en la comunidad para seguir la conversación',
    },
];

const BanderaMakers = () => {
    return (
        <section className="w-full bg-[#0a0e1a] text-white py-12 px-6 lg:px-12 flex justify-center font-['Montserrat',sans-serif]">
            <div className="w-full max-w-[1332px] flex flex-col items-center gap-[60px] lg:gap-[100px]">

                {/* Frame 23: Imagen + Información de los Makers */}
                <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:items-start gap-[40px] lg:gap-[50px]">

                    {/* Imagen Lateral (Flag.avif) */}
                    <div className="w-full lg:w-[408px] h-[350px] sm:h-[396px] flex-shrink-0 rounded-[20px] overflow-hidden shadow-[0px_2px_8px_rgba(0,0,0,0.2)]">
                        <img
                            src={flagImg}
                            alt="Banderín Total Maker"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Frame 13: Encabezado + Pasos */}
                    <div className="w-full lg:w-[874px] flex flex-col items-center gap-[40px] lg:gap-[50px]">

                        {/* Frame 5: Encabezado */}
                        <div className="w-full max-w-[583px] flex flex-col items-center text-center">
              <span className="font-bold text-[18px] leading-[22px] text-[#00D3F3] mb-[8px]">
                Makers del día de hoy
              </span>
                            <h2 className="font-bold text-[32px] sm:text-[40px] leading-[40px] sm:leading-[49px] text-white mb-[16px]">
                                Identifica a los Total Makers
                            </h2>
                            <p className="font-normal text-[16px] leading-[28px] text-white">
                                En cada escritorio de los Total Makers encontrarás un banderín con su nombre y especialidad. Acércate, hazles preguntas, comparte tu idea o simplemente escucha su experiencia. Están ahí para conectar contigo.
                            </p>
                        </div>

                        {/* Container de Pasos (Glassmorphism Grid) */}
                        <div className="w-full border border-white/10 rounded-[20px] shadow-[0px_2px_8px_rgba(0,0,0,0.2)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
                            {steps.map((item, index) => (
                                <div
                                    key={index}
                                    className={`bg-white/[0.03] p-[24px_10px] flex flex-col items-center gap-[12px] text-center ${
                                        index !== steps.length - 1
                                            ? 'border-b sm:border-b-0 sm:border-r border-white/[0.07]'
                                            : ''
                                    }`}
                                >
                                    {/* Símbolo / Ícono */}
                                    <div className="h-[34px] flex items-center justify-center font-normal text-[22.4px] leading-[34px] text-[#367BFF]">
                                        {item.symbol}
                                    </div>

                                    {/* Número de Paso */}
                                    <span className="font-bold text-[16px] leading-[20px] text-[#8B5CFF]">
                    {item.step}
                  </span>

                                    {/* Descripción */}
                                    <p className="font-normal text-[13.12px] leading-[21px] text-[#B9BED0] max-w-[197px]">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

                {/* Banner Informativo Inferior */}
                <div className="w-full max-w-[1332px] min-h-[82px] bg-[rgba(54,123,255,0.06)] border border-[rgba(54,123,255,0.15)] rounded-[16px] p-[20px_24px] shadow-[0px_2px_8px_rgba(0,0,0,0.2)] flex items-center justify-center text-center">
                    <p className="font-bold text-[16px] leading-[20px] text-[#35D8FF] max-w-[1134px]">
                        ¿No sabes con quién hablar? Acércate a cualquier mesa con banderín y cuéntales en qué área trabajas. Ellos te orientarán hacia la persona o sesión indicada para ti.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default BanderaMakers;