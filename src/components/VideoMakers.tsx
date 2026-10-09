

const VideoMakers = () => {
    return (
        <section className="flex flex-col items-center w-full bg-[#0a0e1a] py-16 font-montserrat px-4">
            <div className="flex flex-col items-center gap-[50px] w-full max-w-[1332px]">

                {/* Encabezado de la Sección */}
                <div className="flex flex-col items-center text-center max-w-[674px] gap-[8px]">
          <span className="font-bold text-[18px] leading-[22px] text-[#00D3F3]">
            Video
          </span>
                    <h2 className="font-bold text-[32px] sm:text-[40px] leading-[40px] sm:leading-[49px] text-white">
                        El poder de aprender, experimentar y construir juntos.
                    </h2>
                </div>

                {/* Reproductor de Video / Tarjeta Principal */}
                <div className="relative flex items-center justify-center w-full max-w-[860px] h-[483.75px] bg-white/[0.06] border border-white/14 backdrop-blur-[24px] rounded-[20px] overflow-hidden group cursor-pointer transition-all duration-300 hover:border-white/30">

                    {/* Fondo Gradiente Oscuro */}
                    <div className="absolute inset-[1px] rounded-[19px] bg-[linear-gradient(135deg,#090B14_0%,#0D1225_30%,#160D2E_60%,#0D0A1A_100%)] overflow-hidden">

                        {/* Luces Radiales de Fondo (Glows) */}
                        <div className="absolute w-[429px] h-[385.4px] left-[171.59px] top-[48.17px] bg-[radial-gradient(70.71%_70.71%_at_50%_50%,rgba(54,123,255,0.25)_0%,rgba(54,123,255,0)_70%)] blur-[40px] rounded-[203px] pointer-events-none" />
                        <div className="absolute w-[343.2px] h-[289.05px] left-[386.11px] top-[96.34px] bg-[radial-gradient(70.71%_70.71%_at_50%_50%,rgba(139,92,255,0.2)_0%,rgba(139,92,255,0)_70%)] blur-[50px] rounded-[157px] pointer-events-none" />
                        <div className="absolute w-[257.4px] h-[240.88px] left-[343.2px] top-[192.7px] bg-[radial-gradient(70.71%_70.71%_at_50%_50%,rgba(53,216,255,0.15)_0%,rgba(53,216,255,0)_70%)] blur-[40px] rounded-[124px] pointer-events-none" />

                        {/* Líneas Decorativas Verticales */}
                        <div className="absolute left-[128.7px] top-0 w-[3px] h-full bg-[linear-gradient(180deg,rgba(139,92,255,0)_0%,rgba(139,92,255,0.6)_50%,rgba(139,92,255,0)_100%)] opacity-[0.15]" />
                        <div className="absolute left-[300.3px] top-0 w-[2px] h-[385.4px] bg-[linear-gradient(180deg,rgba(139,92,255,0)_0%,rgba(139,92,255,0.6)_50%,rgba(139,92,255,0)_100%)] opacity-10" />
                        <div className="absolute left-[514.8px] top-0 w-[2px] h-[433.57px] bg-[linear-gradient(180deg,rgba(139,92,255,0)_0%,rgba(139,92,255,0.6)_50%,rgba(139,92,255,0)_100%)] opacity-[0.12]" />
                        <div className="absolute left-[686.4px] top-0 w-[3px] h-[337.22px] bg-[linear-gradient(180deg,rgba(139,92,255,0)_0%,rgba(139,92,255,0.6)_50%,rgba(139,92,255,0)_100%)] opacity-10" />
                    </div>

                    {/* Insignia de Duración (Esquina Superior Derecha) */}
                    <div className="absolute top-[17px] right-[17px] flex items-center justify-center px-[10px] py-[4px] bg-black/60 border border-white/15 backdrop-blur-[8px] rounded-[6px] z-10">
            <span className="font-semibold text-[12px] leading-[18px] text-white">
              1:30
            </span>
                    </div>

                    {/* Elemento Central: Botón Play y Título */}
                    <div className="relative z-10 flex flex-col items-center justify-center gap-[16px] text-center">
                        {/* Botón de Reproducción */}
                        <div className="flex items-center justify-center w-[72px] h-[72px] bg-white/[0.12] border-[1.5px] border-white/30 shadow-[0px_0px_30px_rgba(54,123,255,0.3)] backdrop-blur-[12px] rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/[0.2]">
                            <svg
                                className="w-[28px] h-[28px] text-white fill-current translate-x-[2px]"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>

                        {/* Texto de la Historia */}
                        <span className="font-medium text-[13.6px] leading-[20px] text-white/70">
              Historia de aprendizaje · Total Makers
            </span>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default VideoMakers;