// Reemplaza las imágenes con tus archivos reales en /assets
import { useState, useEffect } from 'react';
import imgBusinessCasual from '../assets/Asset1.svg'
import imgBusinessCasual2 from '../assets/Asset4.svg'
import imgGolf from '../assets/Hombre.svg'
import imgGolf2 from '../assets/Mujer.svg'

interface DressCard {
  categoria: string
  titulo: string
  imgs: string[]
  colores: string[]
}

/* ,
  {
    categoria: 'Cena Velvet Night',
    titulo: 'Formal con un toque rojo',
    imgs: [imgVelvetNight, imgVelvetNight2],
    colores: ['#A90014', '#E9C7A9', '#410000'],
  }*/

const cards: DressCard[] = [
  {
    categoria: 'General para el evento',
    titulo: 'Business casual',
    imgs: [imgBusinessCasual, imgBusinessCasual2],
    colores: [],
  },
  {
    categoria: 'Cena Bloom',
    titulo: 'Formal',
    imgs: [imgGolf, imgGolf2],
    colores: ['#f7f5ed', '#dad0be', '#bab0a2'],
  },
]

const DressCode = () => {
  const [imgIndices, setImgIndices] = useState(cards.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndices((prev) =>
        prev.map((idx, i) => (idx + 1) % cards[i].imgs.length)
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#0a0e1a] px-5 py-12 flex flex-col gap-6">

      {/* Encabezado */}
      <div className=" flex flex-col gap-2">
        <h2 className="font-orbitron font-semibold text-[2.25rem] leading-[3rem] tracking-normal text-center text-white">
          Dress code
        </h2>
        <p className="font-montserrat font-normal text-[1rem] leading-[1.5rem] tracking-normal text-center text-white/80">
          Te recomendamos empacar ropa cómoda y adecuada para las
          actividades que selecciones.
        </p>
      </div>

      {/* Cards apiladas */}
      <div className="flex flex-col gap-5 items-center">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-[20.3125rem] h-[30.112rem] rounded-2xl overflow-hidden border border-white/10 flex flex-col"
          >
            {/* Header */}
            <div
              className="px-4 py-4 flex flex-col"
              style={{ background: 'linear-gradient(135deg, rgba(152, 39, 215, 0.2) 0%, #7020A1 100%)' }}
            >
              <span className="font-montserrat font-medium text-[0.75rem] leading-[1rem] text-[#BEDBFFB2]">
                {card.categoria}
              </span>
              <span className="font-montserrat font-bold text-[1.125rem] leading-[1.5rem] text-white">
                {card.titulo}
              </span>
            </div>

            {/* Imagen con transición */}
            <div className="relative w-full flex-1">
              {card.imgs.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={card.titulo}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out"
                  style={{ opacity: imgIndices[index] === i ? 1 : 0 }}
                />
              ))}

              {/* Círculos sobre la imagen */}
              {card.colores.length > 0 && (
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3"
                  style={{ background: 'linear-gradient(to top, rgba(112, 32, 161, 0.95) 0%, transparent 100%)' }}
                >
                  <div className="flex gap-2">
                    {card.colores.map((color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white/30 flex-shrink-0"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Indicadores dentro de la card */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {card.imgs.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      imgIndices[index] === i ? 'bg-white w-4' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  )
}

export default DressCode
