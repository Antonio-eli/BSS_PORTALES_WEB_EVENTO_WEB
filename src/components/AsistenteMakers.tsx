import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, X } from 'lucide-react';
import cascoImg from '../assets/AsistenteIA.avif';
import ojosImg from '../assets/AsistenteIA-ojos.avif';

// URL del asistente de IA; se puede sobrescribir con VITE_ASISTENTE_URL en el .env
const ASISTENTE_URL =
    import.meta.env.VITE_ASISTENTE_URL ||
    'https://fde-ui-rag-dev-001-h3ebg6b4b4h5cpb6.a03.azurefd.net/asistente?token=sdfsfewefrwfsdf2342&emp=0190597422&name=Omar%20Said&area=totalplay-generic';

// Preguntas de ejemplo que se "teclean" en la burbuja para invitar a preguntar
const PREGUNTAS_EJEMPLO = [
    '¿Qué es un agente de IA?',
    '¿Cómo uso la IA en mi día?',
    'Dame ideas para innovar',
    '¿Qué es la IA generativa?',
];

const prefiereMenosMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Casco del asistente. Los ojos van en otra capa (mismo recorte) para que parpadeen y miren a los lados
const CascoAsistente: React.FC<{ className?: string; vivo?: boolean }> = ({ className = '', vivo = false }) => (
    <span aria-hidden="true" className={`relative block aspect-[413/354] ${className}`}>
        <img src={cascoImg} alt="" draggable={false} className="absolute inset-0 w-full h-full" />
        <span className={`absolute inset-0 ${vivo ? 'animate-mirar motion-reduce:animate-none' : ''}`}>
            <img
                src={ojosImg}
                alt=""
                draggable={false}
                className={`w-full h-full origin-[50%_49%] ${vivo ? 'animate-parpadear motion-reduce:animate-none' : ''}`}
            />
        </span>
    </span>
);

// Escribe y borra las preguntas de ejemplo una por una
const PreguntaEscrita: React.FC = () => {
    const [texto, setTexto] = useState(() => (prefiereMenosMovimiento() ? PREGUNTAS_EJEMPLO[0] : ''));

    useEffect(() => {
        if (prefiereMenosMovimiento()) return;

        let indice = 0;
        let posicion = 0;
        let borrando = false;
        let timer: number;

        const paso = () => {
            const pregunta = PREGUNTAS_EJEMPLO[indice];
            posicion += borrando ? -1 : 1;
            setTexto(pregunta.slice(0, posicion));

            if (!borrando && posicion === pregunta.length) {
                borrando = true;
                timer = window.setTimeout(paso, 2200);
            } else if (borrando && posicion === 0) {
                borrando = false;
                indice = (indice + 1) % PREGUNTAS_EJEMPLO.length;
                timer = window.setTimeout(paso, 400);
            } else {
                timer = window.setTimeout(paso, borrando ? 25 : 60);
            }
        };

        timer = window.setTimeout(paso, 800);
        return () => window.clearTimeout(timer);
    }, []);

    return (
        <span className="block mt-[6px] min-h-[22px] font-medium text-[16px] leading-[22px] text-white">
            {texto}
            <span className="inline-block w-[2px] h-[18px] ml-[2px] align-[-3px] bg-[#38BDF8] animate-parpadeo motion-reduce:hidden" />
        </span>
    );
};

// Agente flotante en la esquina inferior derecha que abre el asistente en una ventana pequeña
export const AsistenteMakers: React.FC = () => {
    const [abierto, setAbierto] = useState(false);
    // El iframe se monta en la primera apertura y se conserva para no perder la conversación
    const [montado, setMontado] = useState(false);
    const [cargando, setCargando] = useState(true);
    // En el hero el agente es grande y muestra la burbuja; al bajar por la página se compacta
    const [enHero, setEnHero] = useState(true);
    // La burbuja entra un momento después que el agente
    const [listo, setListo] = useState(false);
    const agenteRef = useRef<HTMLButtonElement>(null);
    const botonCerrarRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const actualizar = () => setEnHero(window.scrollY < window.innerHeight * 0.4);
        actualizar();
        window.addEventListener('scroll', actualizar, { passive: true });
        window.addEventListener('resize', actualizar);
        const timer = window.setTimeout(() => setListo(true), 1100);

        return () => {
            window.removeEventListener('scroll', actualizar);
            window.removeEventListener('resize', actualizar);
            window.clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (!abierto) return;

        botonCerrarRef.current?.focus();
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setAbierto(false);
                agenteRef.current?.focus();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [abierto]);

    const alternar = () => {
        setMontado(true);
        setAbierto((valor) => !valor);
    };

    const cerrar = () => {
        setAbierto(false);
        agenteRef.current?.focus();
    };

    const compacto = abierto || !enHero;
    const burbujaVisible = listo && !compacto;

    return (
        <>
            <div className="group fixed z-40 right-4 bottom-4 sm:right-8 sm:bottom-8 flex font-['Montserrat',sans-serif] text-white">
                {/* Burbuja de diálogo a la izquierda del agente (decorativa: el control accesible es el agente) */}
                <div className="hidden sm:flex absolute right-full top-0 bottom-0 items-center pr-[16px] pointer-events-none">
                    <div
                        aria-hidden="true"
                        onClick={alternar}
                        className={`relative w-[272px] px-[18px] py-[14px] rounded-[18px] text-left bg-[#0b1024]/80 backdrop-blur-md border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-500 ${
                            burbujaVisible
                                ? 'opacity-100 translate-x-0 pointer-events-auto cursor-pointer group-hover:-translate-y-1 group-hover:border-[#38BDF8]/60'
                                : 'opacity-0 translate-x-4'
                        }`}
                    >
                        <span className="flex items-center gap-[8px] font-semibold text-[12px] leading-[16px] uppercase tracking-[0.12em] text-[#38BDF8]">
                            <span className="w-[7px] h-[7px] rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                            Asistente IA
                        </span>
                        <PreguntaEscrita />
                        <span className="flex items-center gap-[6px] mt-[10px] pt-[10px] border-t border-white/10 text-[13px] leading-[18px] text-white/70 transition-colors group-hover:text-white">
                            Haz clic y pregúntame
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </span>
                        {/* Pico apuntando al agente (solo la mitad derecha, para no encimarse con el fondo) */}
                        <span className="absolute top-1/2 -right-[7px] w-[14px] h-[14px] -translate-y-1/2 rotate-45 bg-[#0b1024]/80 border-t border-r border-white/15 [clip-path:polygon(0_0,100%_0,100%_100%)] transition-colors duration-300 group-hover:border-[#38BDF8]/60" />
                    </div>
                </div>

                {/* Agente flotante */}
                <button
                    ref={agenteRef}
                    type="button"
                    onClick={alternar}
                    aria-haspopup="dialog"
                    aria-expanded={abierto}
                    aria-label={abierto ? 'Cerrar el asistente de IA' : 'Abrir el asistente de IA para hacer preguntas'}
                    className={`relative flex-shrink-0 rounded-full cursor-pointer animate-aparecer motion-reduce:animate-none transition-[width,height] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                        compacto ? 'w-[60px] h-[60px] sm:w-[72px] sm:h-[72px]' : 'w-[80px] h-[80px] sm:w-[112px] sm:h-[112px]'
                    }`}
                >
                    {/* Luz que el casco proyecta debajo: se encoge cuando sube (va al ritmo de animate-flotar) */}
                    <span className="absolute left-[20%] right-[20%] -bottom-[8%] h-[12%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(192,132,252,0.6),transparent)] animate-sombra motion-reduce:animate-none" />

                    <span className="absolute inset-0 animate-flotar motion-reduce:animate-none">
                        {/* Halo que respira */}
                        <span className="absolute -inset-[40%] rounded-full bg-[radial-gradient(circle,rgba(232,121,249,0.45)_0%,rgba(139,92,246,0.2)_45%,transparent_70%)] animate-respirar motion-reduce:animate-none" />
                        {/* Ondas que se expanden */}
                        <span className="absolute inset-0 rounded-full border border-fuchsia-200/50 animate-onda motion-reduce:hidden" />
                        <span className="absolute inset-0 rounded-full border border-fuchsia-200/50 animate-onda [animation-delay:1.5s] motion-reduce:hidden" />

                        {/* El casco se mece mientras flota */}
                        <span className="absolute inset-0 flex items-center animate-mecer motion-reduce:animate-none">
                            <span className="relative w-full transition-transform duration-300 group-hover:scale-[1.08]">
                                <CascoAsistente vivo className="w-full drop-shadow-[0_6px_18px_rgba(232,121,249,0.55)]" />

                                {/* Con la ventana abierta, el casco sirve para cerrarla */}
                                <span
                                    className={`absolute inset-y-0 inset-x-[7%] flex items-center justify-center rounded-full bg-[#0b1024]/60 transition-opacity duration-300 ${
                                        abierto ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <X className="w-[26px] h-[26px]" />
                                </span>
                            </span>
                        </span>

                        {/* Indicador de chat: puntos "escribiendo" */}
                        <span
                            className={`absolute -top-[2px] -left-[6px] h-[22px] px-[7px] flex items-center gap-[3px] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-opacity duration-300 ${
                                abierto ? 'opacity-0' : 'opacity-100'
                            }`}
                        >
                            <span className="w-[5px] h-[5px] rounded-full bg-[#7c3aed] animate-puntos motion-reduce:animate-none" />
                            <span className="w-[5px] h-[5px] rounded-full bg-[#7c3aed] animate-puntos [animation-delay:0.15s] motion-reduce:animate-none" />
                            <span className="w-[5px] h-[5px] rounded-full bg-[#7c3aed] animate-puntos [animation-delay:0.3s] motion-reduce:animate-none" />
                        </span>
                    </span>
                </button>
            </div>

            {/* Ventana pequeña con el asistente, encima del agente */}
            {montado &&
                createPortal(
                    <div
                        role="dialog"
                        aria-label="Asistente virtual Totalplay"
                        className={`${abierto ? 'flex animate-ventana' : 'hidden'} fixed z-[60] inset-x-3 bottom-3 top-[80px] sm:inset-x-auto sm:top-auto sm:right-8 sm:bottom-[116px] sm:w-[380px] sm:h-[min(600px,calc(100dvh_-_200px))] p-[2px] rounded-[22px] bg-[linear-gradient(135deg,#f0d47e_0%,#cfe68c_45%,#f2a66c_100%)] shadow-[0_24px_60px_rgba(0,0,0,0.55)] origin-bottom-right font-['Montserrat',sans-serif] text-white`}
                    >
                        <div className="flex flex-col w-full h-full rounded-[20px] overflow-hidden bg-[linear-gradient(135deg,#0e47b3_0%,#132064_55%,#1b0f36_100%)]">
                            <div className="flex items-center gap-[12px] px-[16px] py-[12px] border-b border-white/10 bg-black/15">
                                <CascoAsistente className="w-[38px] flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-[14px] leading-[18px] truncate">Asistente Totalplay</p>
                                    <p className="flex items-center gap-[6px] text-[12px] leading-[16px] text-white/70">
                                        <span className="w-[6px] h-[6px] rounded-full bg-emerald-400 flex-shrink-0" />
                                        En línea
                                    </p>
                                </div>
                                <a
                                    href={ASISTENTE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Abrir en una pestaña nueva"
                                    aria-label="Abrir el asistente en una pestaña nueva"
                                    className="w-[34px] h-[34px] flex items-center justify-center flex-shrink-0 rounded-[10px] text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <ExternalLink className="w-[18px] h-[18px]" />
                                </a>
                                <button
                                    ref={botonCerrarRef}
                                    type="button"
                                    onClick={cerrar}
                                    aria-label="Cerrar asistente"
                                    className="w-[34px] h-[34px] flex items-center justify-center flex-shrink-0 rounded-[10px] text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                    <X className="w-[20px] h-[20px]" />
                                </button>
                            </div>

                            <div className="relative flex-1">
                                {cargando && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[16px] text-[14px] text-white/80">
                                        <CascoAsistente vivo className="w-[96px] animate-flotar motion-reduce:animate-none" />
                                        Conectando con el asistente…
                                    </div>
                                )}
                                <iframe
                                    src={ASISTENTE_URL}
                                    title="Asistente virtual Totalplay"
                                    allow="microphone; clipboard-write"
                                    onLoad={() => setCargando(false)}
                                    className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${cargando ? 'opacity-0' : 'opacity-100'}`}
                                />
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
        </>
    );
};

export default AsistenteMakers;
