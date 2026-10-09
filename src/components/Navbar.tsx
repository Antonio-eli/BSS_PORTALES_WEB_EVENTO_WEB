import React, { useState } from 'react';
import LogoTotalMakers from '../assets/Logo_TotalMakers.svg';

export interface NavItem {
    id: string;
    label: string;
    href: string;
}

const NAV_ITEMS: NavItem[] = [
    { id: 'evento', label: 'El evento', href: '#evento' },
    { id: 'historias', label: 'Historias', href: '#historias' },
    { id: 'experiencia', label: 'Experiencia', href: '#experiencia' },
    { id: 'agenda', label: 'Agenda', href: '#agenda' },
    { id: 'insignias', label: 'Insignias', href: '#insignias' },
    { id: 'comunidad', label: 'Comunidad', href: '#comunidad' },
];

interface HeaderProps {
    logoUrl?: string;
    navItems?: NavItem[];
}

export const Navbar: React.FC<HeaderProps> = ({
                                                  logoUrl = LogoTotalMakers,
                                                  navItems = NAV_ITEMS,
                                              }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<string>('evento');

    const handleNavClick = (e: React.MouseEvent, href: string, id: string) => {
        e.preventDefault();
        setActiveItem(id);
        setIsMobileMenuOpen(false);

        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
            const headerOffset = 68;
            const elementPosition = element.getBoundingClientRect().top;
            // Corrección: Se agregó el operador de resta (-) y se usó scrollY
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full h-[68px] bg-[#0a0e1a]/40 backdrop-blur-md border-b border-white/10 shadow-[0px_2px_8px_rgba(0,0,0,0.2)] font-['Montserrat',sans-serif]">
            <div className="w-full max-w-[1440px] h-full mx-auto px-6 lg:px-[48px] flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#evento"
                    onClick={(e) => handleNavClick(e, '#evento', 'evento')}
                    className="flex items-center w-[180px] sm:w-[224px] h-[30px] flex-shrink-0 transition-opacity hover:opacity-90"
                    aria-label="Inicio"
                >
                    <img
                        src={logoUrl}
                        alt="Total Makers Logo"
                        className="w-full h-full object-contain object-left"
                        onError={(e) => {
                            const target = e.target as HTMLElement;
                            target.style.display = 'none';
                            if (target.parentElement) {
                                target.parentElement.innerHTML =
                                    '<span className="font-bold text-white text-[18px] tracking-wider">TOTAL<span className="text-[#00D3F3]">MAKERS</span></span>';
                            }
                        }}
                    />
                </a>

                {/* Navegación Principal Desktop */}
                <nav className="hidden md:flex items-center gap-[4px] h-[36px]">
                    {navItems.map((item) => {
                        const isActive = activeItem === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={(e) => handleNavClick(e, item.href, item.id)}
                                className={`h-[36px] px-[12px] py-[8px] rounded-[8px] font-medium text-[14px] leading-[20px] text-center transition-all cursor-pointer ${
                                    isActive
                                        ? 'bg-white/20 text-white font-semibold shadow-sm'
                                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                {/* Botón Móvil */}
                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden w-10 h-10 flex items-center justify-center text-white rounded-lg hover:bg-white/10 focus:outline-none"
                    aria-label="Abrir menú"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Menú Desplegable Móvil */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-[68px] left-0 right-0 w-full bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/10 p-4 flex flex-col gap-2 shadow-2xl">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={(e) => handleNavClick(e, item.href, item.id)}
                            className="w-full text-left py-3 px-4 rounded-lg font-medium text-[15px] text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Navbar;