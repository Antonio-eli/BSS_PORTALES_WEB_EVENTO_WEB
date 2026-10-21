// Bolas de fuego en un canvas a pantalla completa: vuelan del agente al punto del clic dejando una estela
// y estallan en llamas, chispas y humo. Corre fuera de React; solo anima mientras hay algo en pantalla.

type Punto = [number, number];

interface Particula {
    x: number;
    y: number;
    vx: number;
    vy: number;
    vida: number;
    vidaMax: number;
    tam: number;
    tipo: 'llama' | 'chispa' | 'humo';
}

interface Bola {
    x: number;
    y: number;
    destino: Punto;
}

// Pixeles por cuadro (a 60 fps) de la bola en vuelo
const VELOCIDAD = 24;

// Degradado radial de un color sobre fondo transparente; se dibuja escalado para cada partícula
const sprite = (r: number, g: number, b: number) => {
    const lienzo = document.createElement('canvas');
    lienzo.width = lienzo.height = 64;
    const ctx = lienzo.getContext('2d')!;
    const degradado = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    degradado.addColorStop(0, `rgba(${r},${g},${b},1)`);
    degradado.addColorStop(0.4, `rgba(${r},${g},${b},0.6)`);
    degradado.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = degradado;
    ctx.fillRect(0, 0, 64, 64);
    return lienzo;
};

export const crearFuego = () => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.className = 'fixed inset-0 z-[55] pointer-events-none';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d')!;

    // Las llamas son difusas: no hace falta resolución de retina completa
    let ancho = 0;
    let alto = 0;
    const ajustar = () => {
        const escala = Math.min(1.5, window.devicePixelRatio || 1);
        ancho = window.innerWidth;
        alto = window.innerHeight;
        canvas.width = Math.round(ancho * escala);
        canvas.height = Math.round(alto * escala);
        canvas.style.width = `${ancho}px`;
        canvas.style.height = `${alto}px`;
        ctx.setTransform(escala, 0, 0, escala, 0, 0);
    };
    ajustar();
    window.addEventListener('resize', ajustar);

    // La llama pasa de blanco amarillento a amarillo, naranja y rojo conforme envejece
    const ETAPAS = [sprite(255, 248, 220), sprite(255, 214, 90), sprite(255, 140, 30), sprite(225, 60, 15)];
    const HUMO = sprite(70, 60, 60);

    const particulas: Particula[] = [];
    const bolas: Bola[] = [];
    let cuadro = 0;
    let anterior = 0;

    // edadInicial > 0 hace que la partícula nazca ya avanzada en su color (sin el destello blanco del principio)
    const emitir = (tipo: Particula['tipo'], x: number, y: number, vx: number, vy: number, tam: number, vida: number, edadInicial = 0) =>
        particulas.push({ tipo, x, y, vx, vy, tam, vida, vidaMax: vida / (1 - edadInicial) });

    const estallar = ([x, y]: Punto) => {
        for (let i = 0; i < 60; i++) {
            const angulo = Math.random() * Math.PI * 2;
            const fuerza = 1.5 + Math.random() * 4.5;
            emitir('llama', x, y, Math.cos(angulo) * fuerza, Math.sin(angulo) * fuerza - 1, 16 + Math.random() * 24, 35 + Math.random() * 25, 0.12);
        }
        for (let i = 0; i < 24; i++) {
            const angulo = Math.random() * Math.PI * 2;
            const fuerza = 3 + Math.random() * 6;
            emitir('chispa', x, y, Math.cos(angulo) * fuerza, Math.sin(angulo) * fuerza - 2, 4 + Math.random() * 4, 30 + Math.random() * 30);
        }
        for (let i = 0; i < 10; i++) {
            emitir('humo', x + (Math.random() - 0.5) * 30, y, (Math.random() - 0.5) * 1.2, -0.6 - Math.random(), 30 + Math.random() * 20, 60 + Math.random() * 30);
        }
    };

    const paso = (ahora: number) => {
        // dt en cuadros de 60 fps, para que la velocidad no dependa de la pantalla
        const dt = Math.min(3, (ahora - anterior) / (1000 / 60));
        anterior = ahora;

        for (let i = bolas.length - 1; i >= 0; i--) {
            const bola = bolas[i];
            const dx = bola.destino[0] - bola.x;
            const dy = bola.destino[1] - bola.y;
            const distancia = Math.hypot(dx, dy);
            if (distancia <= VELOCIDAD * dt) {
                estallar(bola.destino);
                bolas.splice(i, 1);
                continue;
            }
            const ux = dx / distancia;
            const uy = dy / distancia;
            const avance = VELOCIDAD * dt;
            // Estela: llamas repartidas a lo largo del tramo recorrido (para que sea continua), hacia atrás y abriéndose
            for (let k = 0; k < 6; k++) {
                const t = (k / 6) * avance;
                emitir('llama', bola.x + ux * t, bola.y + uy * t, -ux * 1.5 + (Math.random() - 0.5) * 2.4, -uy * 1.5 + (Math.random() - 0.5) * 2.4, 14 + Math.random() * 14, 20 + Math.random() * 12, 0.25);
            }
            bola.x += ux * avance;
            bola.y += uy * avance;
        }

        for (let i = particulas.length - 1; i >= 0; i--) {
            const p = particulas[i];
            p.vida -= dt;
            if (p.vida <= 0) {
                particulas.splice(i, 1);
                continue;
            }
            const frenado = Math.pow(0.96, dt);
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            if (p.tipo === 'chispa') {
                // Las chispas caen
                p.vx *= Math.pow(0.99, dt);
                p.vy += 0.12 * dt;
            } else {
                // Las llamas y el humo suben y crecen
                p.vx *= frenado;
                p.vy = p.vy * frenado - (p.tipo === 'humo' ? 0.02 : 0.06) * dt;
                p.tam *= Math.pow(p.tipo === 'humo' ? 1.02 : 1.012, dt);
            }
        }

        ctx.clearRect(0, 0, ancho, alto);
        // El humo va debajo y sin sumar luz; el fuego se suma para que brille
        ctx.globalCompositeOperation = 'source-over';
        for (const p of particulas) {
            if (p.tipo !== 'humo') continue;
            ctx.globalAlpha = 0.25 * (p.vida / p.vidaMax);
            ctx.drawImage(HUMO, p.x - p.tam / 2, p.y - p.tam / 2, p.tam, p.tam);
        }
        ctx.globalCompositeOperation = 'lighter';
        for (const p of particulas) {
            if (p.tipo === 'humo') continue;
            const edad = 1 - p.vida / p.vidaMax;
            const etapa = p.tipo === 'chispa' ? ETAPAS[1] : ETAPAS[Math.min(3, Math.floor(edad * 4))];
            ctx.globalAlpha = (1 - edad) * 0.75;
            ctx.drawImage(etapa, p.x - p.tam / 2, p.y - p.tam / 2, p.tam, p.tam);
        }
        // Núcleo brillante de cada bola en vuelo
        for (const bola of bolas) {
            ctx.globalAlpha = 1;
            ctx.drawImage(ETAPAS[2], bola.x - 32, bola.y - 32, 64, 64);
            ctx.drawImage(ETAPAS[1], bola.x - 22, bola.y - 22, 44, 44);
            ctx.drawImage(ETAPAS[0], bola.x - 13, bola.y - 13, 26, 26);
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';

        cuadro = particulas.length || bolas.length ? requestAnimationFrame(paso) : 0;
    };

    return {
        // Una bola por cada origen (los ojos del personaje), todas hacia el mismo destino
        lanzar(origenes: Punto[], destino: Punto) {
            for (const [x, y] of origenes) bolas.push({ x, y, destino });
            if (!cuadro) {
                anterior = performance.now();
                cuadro = requestAnimationFrame(paso);
            }
        },
        destruir() {
            cancelAnimationFrame(cuadro);
            window.removeEventListener('resize', ajustar);
            canvas.remove();
        },
    };
};
