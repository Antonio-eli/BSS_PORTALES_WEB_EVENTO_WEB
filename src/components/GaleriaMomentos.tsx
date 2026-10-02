import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useState, useEffect } from 'react'
import ModalCompartir from './ModalCompartir'

// Reemplaza con tus imágenes reales en /assets
import img1 from '../assets/galeria-1.svg'
import img2 from '../assets/galeria-2.svg'
import img3 from '../assets/galeria-3.svg'
import img4 from '../assets/galeria-4.svg'
import img5 from '../assets/galeria-5.svg'

const imagenesFallback = [img1, img2, img3, img4, img5]

const API_URL = import.meta.env.VITE_API_URL
const GALERIA_CACHE_KEY = 'galeria_cache'
const GALERIA_TTL = 30 * 60 * 1000 // 30 minutos

// Optimizar URLs de Cloudinary: redimensionar, formato auto, calidad auto
const optimizarUrl = (url: string) => {
  if (!url.includes('res.cloudinary.com')) return url
  return url.replace('/image/upload/', '/image/upload/w_400,f_auto,q_auto,c_fill,ar_4:3/')
}

const GaleriaMomentos = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [imagenes, setImagenes] = useState<string[]>(() => {
    const cached = localStorage.getItem(GALERIA_CACHE_KEY)
    if (cached) {
      try {
        const { urls, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < GALERIA_TTL && urls.length > 0) return urls
      } catch { /* ignore */ }
    }
    return imagenesFallback
  })

  const cargarImagenes = async () => {
    try {
      const response = await fetch(`${API_URL}/eventos-web`)
      const raw = await response.json()
      const data = typeof raw.body === 'string' ? JSON.parse(raw.body) : raw
      const urls = data.galeria || []
      if (urls.length > 0) {
        setImagenes(urls)
        localStorage.setItem(GALERIA_CACHE_KEY, JSON.stringify({ urls, timestamp: Date.now() }))
      }
    } catch (error) {
      console.error('Error cargando galería:', error)
    }
  }

  useEffect(() => {
    cargarImagenes()
  }, [])

  const handleModalClose = () => {
    setModalOpen(false)
    // Invalidar cache y recargar después de subir
    localStorage.removeItem(GALERIA_CACHE_KEY)
    cargarImagenes()
  }
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    dragFree: false,
    duration: 30,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="w-full bg-[#0a0e1a] px-5 py-8 flex flex-col gap-6 items-center">
      <div className="w-full max-w-[22.6875rem] flex flex-col gap-6 overflow-hidden">

      {/* Título */}
      <h2 className="font-orbitron font-semibold text-[2.25rem] leading-[3rem] text-center text-white">
        Galería de momentos
      </h2>

      {/* Carrusel horizontal */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {imagenes.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <img
                src={optimizarUrl(img)}
                alt={`Momento ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botones prev / next */}
      <div className="flex justify-center gap-4">
        <button
          onClick={scrollPrev}
          className="w-10 h-10 rounded-full bg-white/50 border border-white/10 flex items-center justify-center
        text-white text-xl hover:bg-white/20 transition-all duration-300"
        >
          ‹
        </button>
        <button
          onClick={scrollNext}
          className="w-10 h-10 rounded-full bg-white/50 border border-white/10 flex items-center justify-center
        text-white text-xl hover:bg-white/20 transition-all duration-300"
        >
          ›
        </button>
      </div>

      {/* Botón Comparte tu aventura */}
      <div className="flex justify-center">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center
                 w-[16.6625rem] h-[4.25rem] rounded-full
                 border-[3px] border-[#682B9B] text-white
                 shadow-[0_0_40px_0_#682B9B66]
                 font-montserrat font-normal text-sm
                 hover:shadow-[0_0_60px_0_#682B9BCC]
                 hover:border-[#9827D7]
                 transition-all duration-500"
        >
          Comparte tu aventura
        </button>
      </div>

      {/* Modal Compartir */}
      <ModalCompartir isOpen={modalOpen} onClose={handleModalClose} />
      </div>
    </section>
  )
}

export default GaleriaMomentos
