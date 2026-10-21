import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ExternalLink, Flame, X, Zap } from 'lucide-react';
import { PERSONAJE_POR_DEFECTO, PERSONAJES, type Personaje } from './personajes';
import { crearFuego } from './fuego';

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

// Lo que el agente lanza al hacer clic; cada modo se enciende y apaga con su tecla y solo uno a la vez
const MODOS = {
    rayos: { tecla: 'a', encendido: 'Rayos encendidos: haz clic para lanzar', apagado: 'Rayos apagados' },
    fuego: { tecla: 'f', encendido: 'Fuego encendido: haz clic para lanzar', apagado: 'Fuego apagado' },
} as const;
type Modo = keyof typeof MODOS;

type Punto = [number, number];

interface Rayo {
    id: number;
    impacto: Punto;
    // Formas distintas del mismo rayo que se encienden una tras otra para que chisporrotee
    destellos: { troncos: string[]; ramas: string[] }[];
}

// Rayo por desplazamiento del punto medio: en cada nivel cada tramo se parte en dos y su centro se mueve de lado
const caminoRayo = (desde: Punto, hasta: Punto, niveles = 6): Punto[] => {
    let puntos: Punto[] = [desde, hasta];
    let amplitud = Math.min(Math.hypot(hasta[0] - desde[0], hasta[1] - desde[1]) / 5, 140);
    for (let nivel = 0; nivel < niveles; nivel++) {
        const siguiente: Punto[] = [puntos[0]];
        for (let i = 1; i < puntos.length; i++) {
            const [ax, ay] = puntos[i - 1];
            const [bx, by] = puntos[i];
            const largo = Math.hypot(bx - ax, by - ay) || 1;
            const desvio = (Math.random() - 0.5) * amplitud;
            siguiente.push([(ax + bx) / 2 - ((by - ay) / largo) * desvio, (ay + by) / 2 + ((bx - ax) / largo) * desvio], puntos[i]);
        }
        puntos = siguiente;
        amplitud /= 2;
    }
    return puntos;
};

// Una o dos bifurcaciones cortas que salen del tronco, desviadas 20–45° de la dirección del cursor
const ramasDe = (tronco: Punto[], destino: Punto): Punto[][] =>
    Array.from({ length: 1 + Math.round(Math.random()) }, () => {
        const desde = tronco[Math.floor(tronco.length * (0.3 + Math.random() * 0.5))];
        const lado = Math.random() < 0.5 ? -1 : 1;
        const angulo = Math.atan2(destino[1] - desde[1], destino[0] - desde[0]) + lado * (0.35 + Math.random() * 0.45);
        const largo = Math.hypot(destino[0] - desde[0], destino[1] - desde[1]) * (0.2 + Math.random() * 0.2);
        return caminoRayo(desde, [desde[0] + Math.cos(angulo) * largo, desde[1] + Math.sin(angulo) * largo], 4);
    });

const aPuntos = (camino: Punto[]) => camino.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

const crearRayo = (id: number, ojos: Punto[], destino: Punto): Rayo => ({
    id,
    impacto: destino,
    destellos: [0, 1, 2].map(() => {
        const troncos = ojos.map((ojo) => caminoRayo(ojo, destino));
        return {
            troncos: troncos.map(aPuntos),
            ramas: troncos.flatMap((tronco) => ramasDe(tronco, destino)).map(aPuntos),
        };
    }),
});

// Colores del personaje como variables CSS, para que el halo, las ondas y los rayos tomen su tono
const variablesDeColor = (personaje: Personaje) =>
    ({ '--color': personaje.color, '--color-profundo': personaje.colorProfundo }) as React.CSSProperties;

// Tonos de los rayos: claro (cuerpo) y medio y profundo (resplandor), a partir del color del personaje
const RAYO_CLARO = { stroke: 'color-mix(in srgb, rgb(var(--color)) 55%, white)' };
const RAYO_MEDIO = { stroke: 'rgb(var(--color))' };
const RAYO_PROFUNDO = { stroke: 'rgb(var(--color-profundo))' };

// Avatar del personaje, centrado en un cuadro para que los personajes altos no se salgan. Si trae capa de ojos,
// cada ojo parpadea sobre su propio centro; al mirar a los lados se mueven las pupilas o, sin ellas, el ojo completo
const AvatarAsistente: React.FC<{
    personaje: Personaje;
    className?: string;
    vivo?: boolean;
    disparando?: boolean;
    // Al disparar fuego el brillo es naranja en lugar del color del personaje
    fuego?: boolean;
}> = ({ personaje, className = '', vivo = false, disparando = false, fuego = false }) => {
    const { ojos } = personaje;
    const mirar = vivo ? 'animate-mirar motion-reduce:animate-none' : '';
    const brillo = !disparando
        ? ''
        : fuego
          ? 'brightness-[1.6] drop-shadow-[0_0_8px_rgb(251,146,60)]'
          : 'brightness-[1.8] drop-shadow-[0_0_6px_rgb(var(--color))]';
    const brilloCompleto = !disparando
        ? ''
        : fuego
          ? 'brightness-125 drop-shadow-[0_0_12px_rgb(251,146,60)]'
          : 'brightness-125 drop-shadow-[0_0_10px_rgb(var(--color))]';
    // De aquí salen los rayos; va dentro de lo que se mueve al mirar, así sigue a la mirada
    const origen = (x: number, y: number) => vivo && <span data-ojo className="absolute" style={{ left: `${x}%`, top: `${y}%` }} />;

    return (
        <span aria-hidden="true" className={`relative flex items-center justify-center aspect-square ${className}`}>
            <span className="relative" style={{ width: `${Math.min(1, personaje.proporcion) * 100}%`, aspectRatio: personaje.proporcion }}>
                {/* Sin capa de ojos, al disparar se ilumina el personaje completo */}
                <img
                    src={personaje.imagen}
                    alt=""
                    draggable={false}
                    className={`absolute inset-0 w-full h-full transition-[filter] duration-150 ${ojos ? '' : brilloCompleto}`}
                />
                {ojos ? (
                    <span
                        className={`absolute inset-0 ${ojos.pupilas ? '' : mirar}`}
                        style={{ '--mirada-x': ojos.mirada[0], '--mirada-y': ojos.mirada[1] } as React.CSSProperties}
                    >
                        {ojos.zonas.map(({ x, y, ancho, alto }) => (
                            <span
                                key={`${x}-${y}`}
                                className="absolute inset-0"
                                style={{ clipPath: `inset(${y - alto / 2}% ${100 - x - ancho / 2}% ${100 - y - alto / 2}% ${x - ancho / 2}%)` }}
                            >
                                <span
                                    className={`absolute inset-0 ${vivo ? 'animate-parpadear motion-reduce:animate-none' : ''}`}
                                    style={{ transformOrigin: `${x}% ${y}%` }}
                                >
                                    <img src={ojos.imagen} alt="" draggable={false} className={`absolute inset-0 w-full h-full transition-[filter] duration-150 ${brillo}`} />
                                    {ojos.pupilas && (
                                        <span className={`absolute inset-0 ${mirar}`}>
                                            <img
                                                src={ojos.pupilas}
                                                alt=""
                                                draggable={false}
                                                className={`absolute inset-0 w-full h-full transition-[filter] duration-150 ${brillo}`}
                                            />
                                            {origen(x, y)}
                                        </span>
                                    )}
                                </span>
                                {!ojos.pupilas && origen(x, y)}
                            </span>
                        ))}
                    </span>
                ) : (
                    origen(50, 50)
                )}
            </span>
        </span>
    );
};

// Rayos que el agente le lanza al cursor; son decorativos y no capturan clics
const RayosAlCursor: React.FC<{ rayos: Rayo[]; personaje: Personaje }> = ({ rayos, personaje }) =>
    createPortal(
        <svg
            aria-hidden="true"
            style={variablesDeColor(personaje)}
            className="fixed inset-0 z-[55] w-full h-full pointer-events-none drop-shadow-[0_0_6px_rgb(var(--color)/0.8)]"
        >
            <defs>
                <radialGradient id="rayo-impacto">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="35%" style={{ stopColor: RAYO_CLARO.stroke }} stopOpacity="0.85" />
                    <stop offset="100%" style={{ stopColor: RAYO_PROFUNDO.stroke }} stopOpacity="0" />
                </radialGradient>
            </defs>
            {rayos.map((rayo) => (
                <g key={rayo.id} fill="none" strokeLinecap="round" strokeLinejoin="round">
                    {rayo.destellos.map((destello, i) => (
                        <g key={i} className="animate-chispazo" style={{ animationDelay: `${i * 150}ms` }}>
                            {/* Resplandor en capas (sin filtros, que serían caros a pantalla completa) y núcleo blanco */}
                            {destello.troncos.map((puntos, j) => (
                                <g key={j}>
                                    <polyline points={puntos} style={RAYO_PROFUNDO} strokeWidth="9" strokeOpacity="0.22" />
                                    <polyline points={puntos} style={RAYO_MEDIO} strokeWidth="4.5" strokeOpacity="0.5" />
                                    <polyline points={puntos} style={RAYO_CLARO} strokeWidth="2.2" />
                                    <polyline points={puntos} stroke="#ffffff" strokeWidth="1" />
                                </g>
                            ))}
                            {destello.ramas.map((puntos, j) => (
                                <g key={`rama-${j}`} opacity="0.75">
                                    <polyline points={puntos} style={RAYO_MEDIO} strokeWidth="3.5" strokeOpacity="0.35" />
                                    <polyline points={puntos} style={RAYO_CLARO} strokeWidth="1.4" />
                                    <polyline points={puntos} stroke="#ffffff" strokeWidth="0.6" />
                                </g>
                            ))}
                        </g>
                    ))}
                    <circle
                        cx={rayo.impacto[0]}
                        cy={rayo.impacto[1]}
                        r="22"
                        fill="url(#rayo-impacto)"
                        className="origin-center [transform-box:fill-box] animate-impacto"
                    />
                </g>
            ))}
        </svg>,
        document.body,
    );

// Flechas para moverse por la cuadrícula del menú de personajes (4 columnas)
const PASOS_FLECHA: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 4, ArrowUp: -4 };

// Menú para elegir el personaje del asistente (tecla S), encima del agente
const MenuPersonajes: React.FC<{ actual: Personaje; alElegir: (personaje: Personaje) => void; alCerrar: () => void }> = ({
    actual,
    alElegir,
    alCerrar,
}) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const previo = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        menuRef.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus();

        const alPresionar = (e: KeyboardEvent) => {
            if (e.key === 'Escape') alCerrar();
        };
        // Un clic fuera del menú lo cierra
        const alTocar = (e: PointerEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) alCerrar();
        };
        window.addEventListener('keydown', alPresionar);
        window.addEventListener('pointerdown', alTocar);
        return () => {
            window.removeEventListener('keydown', alPresionar);
            window.removeEventListener('pointerdown', alTocar);
            previo?.focus();
        };
    }, [alCerrar]);

    const moverFoco = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const paso = PASOS_FLECHA[e.key];
        if (!paso) return;
        e.preventDefault();
        const opciones = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('button'));
        const indice = opciones.indexOf(document.activeElement as HTMLButtonElement);
        const siguiente = opciones[indice + paso];
        siguiente?.focus();
        siguiente?.scrollIntoView({ block: 'nearest' });
    };

    return createPortal(
        <div
            ref={menuRef}
            role="dialog"
            aria-label="Elegir personaje del asistente"
            className="fixed z-[60] inset-x-3 bottom-[88px] sm:inset-x-auto sm:right-8 sm:bottom-[116px] sm:w-[420px] p-[2px] rounded-[22px] bg-[linear-gradient(135deg,#f0d47e_0%,#cfe68c_45%,#f2a66c_100%)] shadow-[0_24px_60px_rgba(0,0,0,0.55)] origin-bottom-right animate-ventana font-['Montserrat',sans-serif] text-white"
        >
            <div className="p-[16px] rounded-[20px] bg-[linear-gradient(135deg,#0e47b3_0%,#132064_55%,#1b0f36_100%)]">
                <div className="flex items-center justify-between gap-[12px]">
                    <p className="font-bold text-[15px] leading-[20px]">Elige tu asistente</p>
                    <button
                        type="button"
                        onClick={alCerrar}
                        aria-label="Cerrar el menú de personajes"
                        className="w-[30px] h-[30px] flex items-center justify-center flex-shrink-0 rounded-[10px] text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <X className="w-[18px] h-[18px]" />
                    </button>
                </div>

                <div onKeyDown={moverFoco} className="grid grid-cols-4 gap-[8px] mt-[12px] -mx-[4px] px-[4px] py-[4px] max-h-[min(400px,calc(100dvh_-_250px))] overflow-y-auto">
                    {PERSONAJES.map((personaje) => {
                        const elegido = personaje.id === actual.id;
                        return (
                            <button
                                key={personaje.id}
                                type="button"
                                aria-pressed={elegido}
                                onClick={() => alElegir(personaje)}
                                style={variablesDeColor(personaje)}
                                className={`relative flex flex-col items-center gap-[4px] px-[4px] py-[8px] rounded-[14px] border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                                    elegido ? 'border-[rgb(var(--color))] bg-white/10' : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                                }`}
                            >
                                <AvatarAsistente personaje={personaje} className="w-[56px] drop-shadow-[0_4px_10px_rgb(var(--color)/0.5)]" />
                                <span className="font-semibold text-[11px] leading-[14px] text-center">{personaje.nombre}</span>
                                {personaje.id === PERSONAJE_POR_DEFECTO.id && (
                                    <span className="-mt-[4px] text-[10px] leading-[12px] text-white/60">Por defecto</span>
                                )}
                                {elegido && (
                                    <span className="absolute top-[6px] right-[6px] w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[rgb(var(--color))] text-[#0b1024]">
                                        <Check className="w-[12px] h-[12px]" strokeWidth={3} />
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                <p className="mt-[14px] text-[11px] leading-[16px] text-white/60">
                    <kbd className="px-[5px] py-[1px] rounded-[4px] bg-white/15 font-sans font-semibold text-white">S</kbd> abre este menú ·{' '}
                    <kbd className="px-[5px] py-[1px] rounded-[4px] bg-white/15 font-sans font-semibold text-white">A</kbd> rayos ·{' '}
                    <kbd className="px-[5px] py-[1px] rounded-[4px] bg-white/15 font-sans font-semibold text-white">F</kbd> fuego
                </p>
            </div>
        </div>,
        document.body,
    );
};

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
    const [personaje, setPersonaje] = useState(PERSONAJE_POR_DEFECTO);
    // Tras el primer cambio de personaje, cada cambio entra con animación (la carga inicial no)
    const [cambiado, setCambiado] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);
    // Rayos (tecla A) o fuego (tecla F); sin modo, los clics no hacen nada
    const [modo, setModo] = useState<Modo | null>(null);
    // Último modo usado: la insignia lo conserva mientras se desvanece al apagarlo
    const [insignia, setInsignia] = useState<Modo>('rayos');
    const [rayos, setRayos] = useState<Rayo[]>([]);
    // Disparos en curso: mientras haya alguno, los ojos brillan y el personaje se encoge un poco
    const [disparos, setDisparos] = useState(0);
    // Mensaje breve sobre el agente al usar los atajos; el texto se conserva mientras se desvanece
    const [aviso, setAviso] = useState({ texto: '', visible: false });
    const contenedorRef = useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        if (!aviso.visible) return;
        const timer = window.setTimeout(() => setAviso((actual) => ({ ...actual, visible: false })), 1800);
        return () => window.clearTimeout(timer);
    }, [aviso]);

    // Atajos: A rayos, F fuego (cada una enciende su modo o lo apaga) y S abre o cierra el menú de personajes
    useEffect(() => {
        const alPresionar = (e: KeyboardEvent) => {
            // No aplican mientras se escribe ni con modificadores (Cmd+A, Ctrl+S…)
            const destino = e.target instanceof HTMLElement ? e.target : null;
            if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || destino?.isContentEditable || destino?.closest('input, textarea, select')) {
                return;
            }

            const tecla = e.key.toLowerCase();
            const modoTecla = (Object.keys(MODOS) as Modo[]).find((m) => MODOS[m].tecla === tecla);
            if (modoTecla && !prefiereMenosMovimiento()) {
                const apagar = modo === modoTecla;
                setModo(apagar ? null : modoTecla);
                setInsignia(modoTecla);
                setAviso({ texto: apagar ? MODOS[modoTecla].apagado : MODOS[modoTecla].encendido, visible: true });
            } else if (tecla === 's' && !abierto) {
                setMenuAbierto((valor) => !valor);
            }
        };
        window.addEventListener('keydown', alPresionar);
        return () => window.removeEventListener('keydown', alPresionar);
    }, [abierto, modo]);

    // Con un modo encendido, cada clic hace que el agente le lance un rayo o una bola de fuego a ese punto
    useEffect(() => {
        if (!modo || abierto || menuAbierto || prefiereMenosMovimiento()) return;

        let siguienteId = 0;
        let enPantalla = 0;
        const fuego = modo === 'fuego' ? crearFuego() : null;
        const timers = new Set<number>();
        const despues = (ms: number, accion: () => void) => {
            const timer = window.setTimeout(() => {
                timers.delete(timer);
                accion();
            }, ms);
            timers.add(timer);
        };
        const ojos = () =>
            Array.from(agenteRef.current?.querySelectorAll('[data-ojo]') ?? [], (ojo): Punto => {
                const { left, top } = ojo.getBoundingClientRect();
                return [left, top];
            });

        const alHacerClic = (e: MouseEvent) => {
            // detail es 0 cuando el clic viene del teclado: no hay un punto al que apuntar.
            // Los clics en el agente o su burbuja abren la ventana, no disparan; y como mucho 3 disparos a la vez
            if (e.detail === 0 || enPantalla >= 3 || contenedorRef.current?.contains(e.target as Node)) return;

            const destino: Punto = [e.clientX, e.clientY];
            const [ojo] = ojos();
            if (!ojo || Math.hypot(destino[0] - ojo[0], destino[1] - ojo[1]) <= 120) return;

            enPantalla++;
            setDisparos((n) => n + 1);
            // Los ojos se cargan un instante antes de disparar
            despues(180, () => {
                if (fuego) {
                    fuego.lanzar(ojos(), destino);
                    // Lo que tarda una bola en cruzar media pantalla
                    despues(900, () => enPantalla--);
                } else {
                    const id = siguienteId++;
                    setRayos((actuales) => [...actuales, crearRayo(id, ojos(), destino)]);
                    // Se quita al terminar el último destello (300 ms de retraso + 0.7 s de animate-chispazo)
                    despues(1100, () => {
                        enPantalla--;
                        setRayos((actuales) => actuales.filter((rayo) => rayo.id !== id));
                    });
                }
                despues(800, () => setDisparos((n) => n - 1));
            });
        };

        window.addEventListener('click', alHacerClic, { capture: true });

        return () => {
            timers.forEach((timer) => window.clearTimeout(timer));
            window.removeEventListener('click', alHacerClic, { capture: true });
            fuego?.destruir();
            setDisparos(0);
            setRayos([]);
        };
    }, [modo, abierto, menuAbierto]);

    const alternar = () => {
        setMontado(true);
        setAbierto((valor) => !valor);
    };

    const cerrar = () => {
        setAbierto(false);
        agenteRef.current?.focus();
    };

    const cerrarMenu = useCallback(() => setMenuAbierto(false), []);

    const elegirPersonaje = (nuevo: Personaje) => {
        setMenuAbierto(false);
        if (nuevo.id === personaje.id) return;
        setPersonaje(nuevo);
        setCambiado(true);
        setAviso({ texto: `¡Hola! Soy ${nuevo.nombre}`, visible: true });
    };

    const disparando = disparos > 0;
    const compacto = abierto || menuAbierto || !enHero;
    const burbujaVisible = listo && !compacto;

    return (
        <>
            <div
                ref={contenedorRef}
                style={variablesDeColor(personaje)}
                className="group fixed z-40 right-4 bottom-4 sm:right-8 sm:bottom-8 flex font-['Montserrat',sans-serif] text-white"
            >
                {/* Aviso de los atajos (también lo anuncian los lectores de pantalla) */}
                <span
                    role="status"
                    className={`absolute bottom-full right-0 mb-[14px] px-[12px] py-[6px] rounded-full whitespace-nowrap font-semibold text-[12px] leading-[16px] bg-[#0b1024]/85 backdrop-blur-md border border-white/15 shadow-[0_8px_20px_rgba(0,0,0,0.35)] pointer-events-none transition-all duration-300 ${
                        aviso.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                    }`}
                >
                    {aviso.texto}
                </span>

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
                    {/* Luz que el personaje proyecta debajo: se encoge cuando sube (va al ritmo de animate-flotar) */}
                    <span className="absolute left-[20%] right-[20%] -bottom-[8%] h-[12%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(var(--color)/0.5),transparent)] animate-sombra motion-reduce:animate-none" />

                    <span className="absolute inset-0 animate-flotar motion-reduce:animate-none">
                        {/* Halo que respira */}
                        <span className="absolute -inset-[40%] rounded-full bg-[radial-gradient(circle,rgb(var(--color)/0.45)_0%,rgb(var(--color-profundo)/0.2)_45%,transparent_70%)] animate-respirar motion-reduce:animate-none" />
                        {/* Ondas que se expanden */}
                        <span className="absolute inset-0 rounded-full border border-[rgb(var(--color)/0.5)] animate-onda motion-reduce:hidden" />
                        <span className="absolute inset-0 rounded-full border border-[rgb(var(--color)/0.5)] animate-onda [animation-delay:1.5s] motion-reduce:hidden" />

                        {/* El personaje se mece mientras flota */}
                        <span className="absolute inset-0 flex items-center animate-mecer motion-reduce:animate-none">
                            <span
                                className={`relative w-full transition-transform duration-300 group-hover:scale-[1.08] ${
                                    disparando ? 'scale-[0.94]' : ''
                                }`}
                            >
                                {/* La key hace que al cambiar de personaje se monte de nuevo y corra animate-cambio */}
                                <AvatarAsistente
                                    key={personaje.id}
                                    personaje={personaje}
                                    vivo
                                    disparando={disparando}
                                    fuego={modo === 'fuego'}
                                    className={`w-full drop-shadow-[0_6px_18px_rgb(var(--color)/0.55)] ${
                                        cambiado ? 'animate-cambio motion-reduce:animate-none' : ''
                                    }`}
                                />

                                {/* Con la ventana abierta, el agente sirve para cerrarla */}
                                <span
                                    className={`absolute inset-[8%] flex items-center justify-center rounded-full bg-[#0b1024]/60 transition-opacity duration-300 ${
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
                            <span className="w-[5px] h-[5px] rounded-full bg-[rgb(var(--color-profundo))] animate-puntos motion-reduce:animate-none" />
                            <span className="w-[5px] h-[5px] rounded-full bg-[rgb(var(--color-profundo))] animate-puntos [animation-delay:0.15s] motion-reduce:animate-none" />
                            <span className="w-[5px] h-[5px] rounded-full bg-[rgb(var(--color-profundo))] animate-puntos [animation-delay:0.3s] motion-reduce:animate-none" />
                        </span>

                        {/* Modo encendido: rayos (tecla A) o fuego (tecla F) */}
                        <span
                            className={`absolute -top-[2px] -right-[4px] w-[22px] h-[22px] flex items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-300 ${
                                insignia === 'fuego' ? 'text-orange-500' : 'text-[rgb(var(--color-profundo))]'
                            } ${modo && !abierto ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                        >
                            {insignia === 'fuego' ? <Flame className="w-[13px] h-[13px] fill-current" /> : <Zap className="w-[13px] h-[13px] fill-current" />}
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
                                <AvatarAsistente personaje={personaje} className="w-[38px] flex-shrink-0" />
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
                                        <AvatarAsistente personaje={personaje} vivo className="w-[96px] animate-flotar motion-reduce:animate-none" />
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

            {menuAbierto && <MenuPersonajes actual={personaje} alElegir={elegirPersonaje} alCerrar={cerrarMenu} />}

            {rayos.length > 0 && <RayosAlCursor rayos={rayos} personaje={personaje} />}
        </>
    );
};

export default AsistenteMakers;
