// Placeholder imagen aérea del hotel - reemplaza con tu imagen real en /assets
import riviera from '../assets/riviera.svg'

const hotelImg = riviera

const HotelInfo = () => {
  return (
    <section className="bg-[#0a0e1a] px-5 py-12 flex flex-col">
      <div className="w-full flex flex-col gap-[1.5rem]">

        {/* Título */}
        <h2 className="font-orbitron font-semibold text-[2.25rem] leading-[3rem] text-center text-white">
          Conoce el hotel
        </h2>

        {/* Imagen */}
        <div className="overflow-hidden w-full h-[15.5625rem] rounded-[1.25rem]">
          <img
            src={hotelImg}
            alt="Grand Velas Riviera Maya"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Nombre del hotel */}
        <h3 className="font-orbitron font-semibold text-[1.5625rem] leading-[2rem] text-left text-white mt-2">
          Grand Velas
        </h3>

        {/* Descripción párrafo 1 */}
        <p className="font-montserrat font-normal text-base leading-[1.5rem] text-white text-left">
          Ubicado en la Riviera Maya.
        </p>

        {/* Descripción párrafo 2 
        <p className="font-montserrat font-normal text-base leading-[1.5rem] text-white text-left">
          Relájese en la fascinante playa...
        </p>*/}

        {/* Botón Conoce más */}
        <div className="flex justify-center">
          <a
            href="https://3d.casa/360/gvrm/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center
                       w-[16.6625rem] h-[4.25rem] rounded-full
                       border-[3px] border-[#682B9B] text-white
                       shadow-[0_0_40px_0_#682B9B66]
                       font-montserrat font-normal text-sm
                       hover:shadow-[0_0_60px_0_#682B9BCC]
                       hover:border-[#9827D7]
                       transition-all duration-500"
          >
            Conoce más
          </a>
        </div>

      </div>
    </section>
  )

}

export default HotelInfo
