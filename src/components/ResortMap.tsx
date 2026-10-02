// Placeholder mapa del resort - reemplaza con tu imagen real en /assets
import mapa from '../assets/mapa.svg'
const mapaImg = mapa
const ResortMap = () => {
  return (
    <section className="bg-[#0a0e1a] px-5 py-12 flex flex-col gap-6">
      {/* Título */}
      <h2 className="font-orbitron font-semibold text-[2.25rem] leading-[3rem] tracking-normal text-center text-white">
        Conoce la {' '}
        <span className="block">ubicación de tus</span>
        <span className="block">espacios de trabajo</span>
      </h2>

      {/* Imagen del mapa */}
      <div className="rounded-2xl overflow-hidden w-full border border-white/10">
        <img
          src={mapaImg}
          alt="Mapa del Resort Grand Velas Riviera Maya"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  )
}

export default ResortMap
