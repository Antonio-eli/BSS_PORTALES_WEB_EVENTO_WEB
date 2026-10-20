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
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        flotar: 'flotar 4s ease-in-out infinite',
        girar: 'spin 14s linear infinite',
        aparecer: 'aparecer 0.7s ease-out 0.3s both',
        respirar: 'respirar 3.5s ease-in-out infinite',
        puntos: 'puntos 1.2s ease-in-out infinite',
        onda: 'onda 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        parpadeo: 'parpadeo 1s steps(1) infinite',
        ventana: 'ventana 0.25s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
