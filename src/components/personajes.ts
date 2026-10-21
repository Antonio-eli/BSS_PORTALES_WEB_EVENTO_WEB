import astronautaImg from '../assets/AsistenteIA.avif';
import astronautaOjosImg from '../assets/AsistenteIA-ojos.avif';
import clippyImg from '../assets/asistentes/clippy.avif';
import clippyOjosImg from '../assets/asistentes/clippy-ojos.avif';
import clippyPupilasImg from '../assets/asistentes/clippy-pupilas.avif';
import dotImg from '../assets/asistentes/dot.avif';
import dotOjosImg from '../assets/asistentes/dot-ojos.avif';
import dotPupilasImg from '../assets/asistentes/dot-pupilas.avif';
import merlinImg from '../assets/asistentes/merlin.avif';
import merlinOjosImg from '../assets/asistentes/merlin-ojos.avif';
import merlinPupilasImg from '../assets/asistentes/merlin-pupilas.avif';
import rockyImg from '../assets/asistentes/rocky.avif';
import rockyOjosImg from '../assets/asistentes/rocky-ojos.avif';
import f1Img from '../assets/asistentes/f1.avif';
import f1OjosImg from '../assets/asistentes/f1-ojos.avif';
import f1PupilasImg from '../assets/asistentes/f1-pupilas.avif';
import madreNaturalezaImg from '../assets/asistentes/madre-naturaleza.avif';
import genioImg from '../assets/asistentes/genio.avif';
import genioOjosImg from '../assets/asistentes/genio-ojos.avif';
import genioPupilasImg from '../assets/asistentes/genio-pupilas.avif';
import hoverbotImg from '../assets/asistentes/hoverbot.avif';
import hoverbotOjosImg from '../assets/asistentes/hoverbot-ojos.avif';
import linksImg from '../assets/asistentes/links.avif';
import linksOjosImg from '../assets/asistentes/links-ojos.avif';
import powerPupImg from '../assets/asistentes/power-pup.avif';
import powerPupOjosImg from '../assets/asistentes/power-pup-ojos.avif';
import powerPupPupilasImg from '../assets/asistentes/power-pup-pupilas.avif';
import scribbleImg from '../assets/asistentes/scribble.avif';
import scribbleOjosImg from '../assets/asistentes/scribble-ojos.avif';
import willImg from '../assets/asistentes/will.avif';
import willOjosImg from '../assets/asistentes/will-ojos.avif';
import willPupilasImg from '../assets/asistentes/will-pupilas.avif';
import logoOfficeImg from '../assets/asistentes/logo-office.avif';

// Personajes que puede tomar el asistente flotante; se eligen con la tecla S.
//
// Para agregar uno:
//  1. Guarda su imagen sin fondo en src/assets/asistentes (AVIF con transparencia, recortada al personaje).
//  2. Opcional, para que parpadee y mire a los lados: una imagen del mismo tamaño con solo los ojos, y la base
//     sin ellos (con el párpado o la piel donde estaban). Si las pupilas van en otra imagen aparte, el ojo
//     queda fijo y solo se mueven ellas.
//  3. Agrega su entrada al final de PERSONAJES.

// Rectángulo de un ojo, en % de la imagen: centro (x, y) y tamaño. Recorta el ojo de su capa, es el centro
// del parpadeo y el punto del que salen los rayos
export interface ZonaOjo {
    x: number;
    y: number;
    ancho: number;
    alto: number;
}

export interface Personaje {
    id: string;
    nombre: string;
    imagen: string;
    // Ancho / alto de la imagen
    proporcion: number;
    ojos?: {
        imagen: string;
        pupilas?: string;
        zonas: ZonaOjo[];
        // Cuánto se mueven al mirar a los lados, como factor del máximo de animate-mirar (5% del ancho, 3% del alto)
        mirada: [number, number];
    };
    // Color del halo, las ondas y los rayos, y un tono más profundo para el borde del halo; formato "r g b"
    color: string;
    colorProfundo: string;
}

// El casco morado: la página siempre arranca con este personaje
export const PERSONAJE_POR_DEFECTO: Personaje = {
    id: 'astronauta',
    nombre: 'Astronauta',
    imagen: astronautaImg,
    proporcion: 413 / 354,
    ojos: {
        imagen: astronautaOjosImg,
        zonas: [
            { x: 33.29, y: 49.29, ancho: 23.49, alto: 17.8 },
            { x: 67.31, y: 49.44, ancho: 23.24, alto: 18.08 },
        ],
        mirada: [1, 1],
    },
    color: '232 121 249',
    colorProfundo: '139 92 246',
};

export const PERSONAJES: Personaje[] = [
    PERSONAJE_POR_DEFECTO,
    {
        id: 'clippy',
        nombre: 'Clippy',
        imagen: clippyImg,
        proporcion: 420 / 412,
        ojos: {
            imagen: clippyOjosImg,
            pupilas: clippyPupilasImg,
            zonas: [
                { x: 31.59, y: 28.35, ancho: 16.93, alto: 14.74 },
                { x: 53.63, y: 34.5, ancho: 17.09, alto: 14.74 },
            ],
            mirada: [0.49, 0.73],
        },
        color: '165 180 252',
        colorProfundo: '99 102 241',
    },
    {
        id: 'dot',
        nombre: 'Dot',
        imagen: dotImg,
        proporcion: 420 / 389,
        ojos: {
            imagen: dotOjosImg,
            pupilas: dotPupilasImg,
            zonas: [
                { x: 33.23, y: 18.55, ancho: 17.52, alto: 14.04 },
                { x: 65.46, y: 18.01, ancho: 21.55, alto: 14.25 },
            ],
            mirada: [0.69, 0.54],
        },
        color: '248 113 113',
        colorProfundo: '220 38 38',
    },
    {
        id: 'merlin',
        nombre: 'Merlín',
        imagen: merlinImg,
        proporcion: 247 / 420,
        ojos: {
            imagen: merlinOjosImg,
            pupilas: merlinPupilasImg,
            zonas: [
                { x: 46.74, y: 19.65, ancho: 8.36, alto: 4.54 },
                { x: 55.94, y: 19.62, ancho: 8.22, alto: 4.77 },
            ],
            mirada: [0.28, 0.25],
        },
        color: '96 165 250',
        colorProfundo: '37 99 235',
    },
    {
        id: 'rocky',
        nombre: 'Rocky',
        imagen: rockyImg,
        proporcion: 316 / 420,
        ojos: {
            imagen: rockyOjosImg,
            zonas: [
                { x: 37.67, y: 21.99, ancho: 5.29, alto: 6.44 },
                { x: 49.34, y: 24.75, ancho: 4.33, alto: 7.43 },
            ],
            mirada: [0.17, 0.37],
        },
        color: '253 224 71',
        colorProfundo: '234 179 8',
    },
    {
        id: 'f1',
        nombre: 'F1',
        imagen: f1Img,
        proporcion: 420 / 341,
        ojos: {
            imagen: f1OjosImg,
            pupilas: f1PupilasImg,
            zonas: [
                { x: 34.37, y: 29.57, ancho: 15.33, alto: 19.15 },
                { x: 59.1, y: 29.57, ancho: 15.33, alto: 19.15 },
            ],
            mirada: [0.19, 0.4],
        },
        color: '251 146 60',
        colorProfundo: '194 65 12',
    },
    {
        id: 'madre-naturaleza',
        nombre: 'Madre Naturaleza',
        imagen: madreNaturalezaImg,
        proporcion: 418 / 420,
        color: '74 222 128',
        colorProfundo: '37 99 235',
    },
    {
        id: 'genio',
        nombre: 'Genio',
        imagen: genioImg,
        proporcion: 231 / 420,
        ojos: {
            imagen: genioOjosImg,
            pupilas: genioPupilasImg,
            zonas: [
                { x: 35.94, y: 21.88, ancho: 8.3, alto: 4.11 },
                { x: 50.84, y: 25.37, ancho: 8.58, alto: 4.42 },
            ],
            mirada: [0.07, 0.02],
        },
        color: '94 234 212',
        colorProfundo: '15 118 110',
    },
    {
        id: 'hoverbot',
        nombre: 'Hoverbot',
        imagen: hoverbotImg,
        proporcion: 420 / 367,
        ojos: {
            imagen: hoverbotOjosImg,
            zonas: [{ x: 49.9, y: 19.62, ancho: 35.56, alto: 7.98 }],
            mirada: [0.2, 0],
        },
        color: '125 211 252',
        colorProfundo: '2 132 199',
    },
    {
        id: 'links',
        nombre: 'Links',
        imagen: linksImg,
        proporcion: 420 / 378,
        ojos: {
            imagen: linksOjosImg,
            zonas: [
                { x: 30.3, y: 34.64, ancho: 9.09, alto: 7.12 },
                { x: 60.19, y: 25.84, ancho: 10.27, alto: 7.49 },
            ],
            mirada: [0.39, 0.41],
        },
        color: '251 191 36',
        colorProfundo: '234 88 12',
    },
    {
        id: 'power-pup',
        nombre: 'Power Pup',
        imagen: powerPupImg,
        proporcion: 382 / 420,
        ojos: {
            imagen: powerPupOjosImg,
            pupilas: powerPupPupilasImg,
            zonas: [
                { x: 38.42, y: 9.8, ancho: 12.62, alto: 11.47 },
                { x: 53.63, y: 8.9, ancho: 13.02, alto: 12.38 },
            ],
            mirada: [0.48, 0.67],
        },
        color: '252 211 77',
        colorProfundo: '220 38 38',
    },
    {
        id: 'scribble',
        nombre: 'Scribble',
        imagen: scribbleImg,
        proporcion: 267 / 420,
        ojos: {
            imagen: scribbleOjosImg,
            zonas: [
                { x: 44.25, y: 22.95, ancho: 10.11, alto: 1.29 },
                { x: 66.37, y: 24.64, ancho: 12.14, alto: 2.9 },
            ],
            mirada: [0.43, 0.06],
        },
        color: '45 212 191',
        colorProfundo: '126 34 206',
    },
    {
        id: 'will',
        nombre: 'Will',
        imagen: willImg,
        proporcion: 416 / 420,
        ojos: {
            imagen: willOjosImg,
            pupilas: willPupilasImg,
            zonas: [
                { x: 40.51, y: 28.45, ancho: 6.62, alto: 2.73 },
                { x: 53.31, y: 28.66, ancho: 8.51, alto: 2.81 },
            ],
            mirada: [0.19, 0],
        },
        color: '244 114 182',
        colorProfundo: '190 24 93',
    },
    {
        id: 'logo-office',
        nombre: 'Office',
        imagen: logoOfficeImg,
        proporcion: 420 / 419,
        color: '96 165 250',
        colorProfundo: '22 163 74',
    },
];
