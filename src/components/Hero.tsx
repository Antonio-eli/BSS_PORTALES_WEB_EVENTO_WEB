import logo from '../assets/logo2.svg'

const Hero = () => {
  return (
    <section className="flex flex-col items-center bg-[#0a0e1a] pt-24 pb-8 px-6 text-center">

  {/* Glow decorativo */}
  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

  {/* Logo grande */}
  <img
    src={logo}
    alt="Totalplay"
    className="h-16 w-auto object-contain mb-6"
  />

  {/* Título */}
  <h1 className="font-orbitron font-bold text-[2.5rem] leading-[3rem] text-white mb-4">
    <span className="block">Líderes</span>
    <span className="block">Estrategia</span>
    <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mt-1">
      y Tecnología
    </span>
  </h1>

  {/* Fecha */}
  <p className="font-montserrat font-semibold text-[1.375rem] text-blue-200/80 mb-6">
    22 – 24 de Abril, 2026
  </p>

</section>
  )
}

export default Hero
