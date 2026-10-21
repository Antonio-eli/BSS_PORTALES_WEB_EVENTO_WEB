import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        stagtic: ['"Stagtic"', 'sans-serif'],
        nunito: ['"Nunito"', 'sans-serif'],
        orbitron: ['"Orbitron"', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flotar: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        aparecer: {
          '0%': { opacity: '0', transform: 'scale(0.4)' },
          '70%': { opacity: '1', transform: 'scale(1.08)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        respirar: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        puntos: {
          '0%, 80%, 100%': { opacity: '0.35', transform: 'translateY(0)' },
          '40%': { opacity: '1', transform: 'translateY(-3px)' },
        },
        onda: {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.75)', opacity: '0' },
        },
        parpadeo: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        ventana: {
          '0%': { opacity: '0', transform: 'translateY(16px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        // Balanceo del casco; su periodo no coincide con el de flotar para que el vaivén no se repita igual
        mecer: {
          '0%, 100%': { transform: 'translateX(-2px) rotate(-5deg)' },
          '50%': { transform: 'translateX(2px) rotate(5deg)' },
        },
        // Un parpadeo y, al final del ciclo, uno doble
        parpadear: {
          '0%, 38%, 42%, 85%, 89%, 93%, 100%': { transform: 'scaleY(1)' },
          '40%, 87%, 91%': { transform: 'scaleY(0.1)' },
        },
        // Los ojos voltean hacia la burbuja y luego hacia arriba
        mirar: {
          '0%, 18%, 44%, 58%, 80%, 100%': { transform: 'translate(0, 0)' },
          '22%, 40%': { transform: 'translate(-5%, 1%)' },
          '62%, 76%': { transform: 'translate(4%, -3%)' },
        },
        // Luz bajo el casco: más chica y tenue cuando el casco está arriba
        sombra: {
          '0%, 100%': { transform: 'scaleX(1)', opacity: '1' },
          '50%': { transform: 'scaleX(0.7)', opacity: '0.45' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        flotar: 'flotar 4s ease-in-out infinite',
        aparecer: 'aparecer 0.7s ease-out 0.3s both',
        respirar: 'respirar 3.5s ease-in-out infinite',
        puntos: 'puntos 1.2s ease-in-out infinite',
        onda: 'onda 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        parpadeo: 'parpadeo 1s steps(1) infinite',
        ventana: 'ventana 0.25s ease-out',
        mecer: 'mecer 6.5s ease-in-out infinite',
        parpadear: 'parpadear 7s ease-in-out infinite',
        mirar: 'mirar 9s ease-in-out infinite',
        sombra: 'sombra 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
