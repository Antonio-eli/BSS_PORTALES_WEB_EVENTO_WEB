# BSS Portales Web - Evento Web

Aplicación web para registro de asistentes al evento "Líderes Estrategia y Tecnología" realizado en Grand Velas Riviera Maya.

## 🚀 Características

- **Página de Inicio**: Landing page con información del evento, hotel, itinerario y dress code
- **Registro de Invitados**: Formulario multi-paso con validaciones
  - Datos personales y vuelos
  - Selección de actividades por día
  - Campos especiales para golf (tallas de playera y guante)
- **Dashboard Admin**: Gestión de registros (protegido con autenticación)
- **Confirmación**: Página de éxito post-registro

## 🛠️ Tecnologías

- **React 18** + **TypeScript**
- **Vite** para build y desarrollo
- **React Router** para navegación
- **Tailwind CSS** para estilos
- **Embla Carousel** para carruseles
- **Lucide React** para iconos
- **Axios** para llamadas API

## 📦 Estructura del Proyecto

```
src/
├── assets/         # Imágenes y recursos estáticos
├── components/     # Componentes reutilizables
├── pages/          # Páginas principales
├── router/         # Configuración de rutas
└── services/       # API y servicios
```

## 🔧 Configuración

### Variables de Entorno

1. Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

2. Configura las URLs de API Gateway en `.env`:
```env
VITE_APP_NAME=EventoWeb
VITE_API_URL=https://{api-id}.execute-api.us-east-1.amazonaws.com/dev/negocios
VITE_LOGIN_URL=https://{api-id}.execute-api.us-east-1.amazonaws.com/dev/login
VITE_REGISTRO_URL=https://{api-id}.execute-api.us-east-1.amazonaws.com/dev/eventos-web
VITE_APP_VERSION=v1.0.0
```

**⚠️ Importante:** 
- Nunca subas el archivo `.env` al repositorio
- Usa `.env.development` para desarrollo local
- Consulta `DEPLOY_GUIDE.md` para instrucciones detalladas de API Gateway

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

### Build para Producción

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## 🔗 Backend

Este frontend se conecta con los siguientes backends de AWS Lambda:
- **TP_MX_REGISTRO_EVENTO_WEB**: Manejo de registros de invitados
- **TP_MX_LOGIN_EVENTO_WEB**: Autenticación de administradores

## 📝 Flujo de Registro

1. Usuario completa datos personales y vuelos
2. Selecciona actividades para cada día del evento
3. Si selecciona Golf, debe completar tallas adicionales
4. Los datos se envían a DynamoDB vía API Gateway
5. Redirección a página de confirmación

## � Deployment

### Build para Producción

```bash
# 1. Asegúrate de tener el .env configurado correctamente
# 2. Genera el build
npm run build

# 3. Sube solo la carpeta dist/ a S3
aws s3 sync dist/ s3://tu-bucket-evento-web --delete
```

**📖 Guía Completa:** Ver `DEPLOY_GUIDE.md` para:
- Configuración de API Gateway
- Creación de recursos y métodos
- Checklist de deployment
- Testing de endpoints

## �👥 Autores

Totalplay - Equipo de Desarrollo Web
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
