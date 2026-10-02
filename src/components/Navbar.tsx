import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
                   w-full min-h-[4.75rem] opacity-100
                   pt-[1rem] pb-[1rem] px-5
                   bg-[#0a0e1a]/90 backdrop-blur-sm border-b border-white/5">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <img
          src={logo}
          alt="Totalplay"
          className="h-[3rem] w-auto opacity-100 object-contain"
        />
      </Link>

      {/* Botón Registrarse 
      <Link
          to="/registro"
          className="flex items-center justify-center flex-shrink-0
                    w-[8.5rem] h-[2.5rem] rounded-full opacity-100
                    border-2 border-[#682B9B] text-white
                    shadow-[0_0_2px_0_#682B9B]
                    font-montserrat font-normal text-sm leading-[24px] tracking-normal text-center
                    hover:bg-gradient-to-r hover:from-[#005DDD] hover:to-[#9827D7] 
                    hover:border-transparent hover:shadow-[0_0_15px_0_rgba(104,43,155,0.6)]
                    hover:scale-105 transition-all duration-300"
        >
          Registrarse
        </Link>*/}
    </nav>
  )
}

export default Navbar
