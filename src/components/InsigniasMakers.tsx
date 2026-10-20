import React, { useState } from 'react';
import Nivel1 from '../assets/Nivel1.avif';
import Nivel2 from '../assets/Nivel2.avif';
import Nivel3 from '../assets/Nivel3.avif';
import Nivel4 from '../assets/Nivel4.avif';
import Nivel5 from '../assets/Nivel5.avif';
import IBM from '../assets/IBM.avif';
import Ponencia from '../assets/Ponencia.avif';
import ClaudeCo from '../assets/ClaudeCo.avif';
import Python from '../assets/Python.avif';
import Ponencia1 from '../assets/Ponencia1.avif';
import Generacion from '../assets/Generacion.avif';
import Pandas from '../assets/Pandas.avif';
import Agente from '../assets/Agente.avif';
import Anthropic from '../assets/Anthropic.avif';
import Ponencia2 from '../assets/Ponencia2.avif';
import Ponencia3 from '../assets/Ponencia3.avif';
import Maker from '../assets/Maker.avif';
import Builder from '../assets/Builder.avif';
import Creator from '../assets/Creator.avif';
import Architect from '../assets/Architect.avif';
import Master from '../assets/Master.avif';

// 1. Definición de Tipos
interface CourseItem {
    id: string;
    type: 'Principal' | 'Complementario' | 'Opción técnica';
    title: string;
    provider: string;
    providerUrl?: string;
}

interface ReadingItem {
    id: string;
    title: string;
    description: string;
    linkUrl: string;
    imageLogo?: string;
    type?: 'reading' | 'video';
}

interface SummaryColumn {
    title: string;
    description: string;
}

interface LevelContent {
    id: string;
    levelNumber: number;
    imageSrc: string;
    title: string;
    description: string;
    descriptionTitle?: string;
    summaryColumns?: [SummaryColumn, SummaryColumn];
    highlightText?: string;
    courses: CourseItem[];
    readings: ReadingItem[];
    additionalInfo: string[];
    requirements: string[];
    nextLevelName: string | null;
}

// 2. Base de Datos Local de Niveles
const levelsData: Record<string, LevelContent> = {
    maker: {
        id: 'maker',
        levelNumber: 1,
        imageSrc: Nivel1,
        title: 'Total Maker',
        description: 'Descubre el potencial de la inteligencia artifical y comienza a utilizarla en tu trabajo. Esta insignia reconoce tu capacidad para identificar oportunidades, crear instrucciones claras y validar resultado de manera responsable.',
        highlightText: 'Google publica su formación introductoria sin costo; IBM confirma que la credencial indicada es gratuita y está disponible para usuarios registrados. Ingresa al siguiente Link para mayor información: Google Cloud Blog',
        courses: [
            { id: 'c1', type: 'Principal', title: 'Introducción a la Inteligencia Artificial', provider: 'Platzi', providerUrl: 'https://platzi.com/cursos/intro-ai/?utm_source=chatgpt.com' },
            { id: 'c2', type: 'Principal', title: 'Introduction to Generative AI', provider: 'Google', providerUrl: 'https://www.skills.google/course_templates/536?utm_source=chatgpt.com' },
            { id: 'c3', type: 'Complementario', title: 'Artificial Intelligence Fundamentals', provider: 'IBM SkillsBuild', providerUrl: 'https://www.ibm.com/account/reg/es-es/signup?formid=urx-54369' },
            { id: 'c4', type: 'Complementario', title: 'Introduction to Large Language Models', provider: 'Google', providerUrl: 'https://www.skills.google/course_templates/539?utm_source=chatgpt.com' },
        ],
        readings: [
            { id: 'r1', title: 'What is artificial intelligence (AI)?', description: 'Identificar tareas en las que la IA puede ayudar y revisar sus resultados.', linkUrl: 'https://www.ibm.com/think/topics/artificial-intelligence?utm_source=chatgpt.com', imageLogo: IBM },
            { id: 'r2', title: 'What is generative AI?', description: 'Comprender cómo se genera contenido y sus principales aplicaciones.', linkUrl: 'https://www.ibm.com/think/topics/generative-ai?utm_source=chatgpt.com', imageLogo: IBM },
            { id: 'r3', title: 'What is machine learning?', description: 'Ampliar fundamentos de aprendizaje automático, lenguaje y visión.', linkUrl: 'https://www.ibm.com/think/topics/machine-learning?utm_source=chatgpt.com', imageLogo: IBM },
            { id: 'r4', title: 'What are large language models (LLMs)?', description: 'Entender la arquitectura y funcionamiento básico de los modelos de lenguaje a gran escala.', linkUrl: 'https://www.ibm.com/think/topics/large-language-models?utm_source=chatgpt.com', imageLogo: IBM },
            { id: 'r5', title: 'How AI Could Save (Not Destroy) Education - Sal Khan | TED.', description: 'Propósito: Reflexionar sobre la IA como apoyo al aprendizaje y al trabajo humano. Aunque utiliza ejemplos educativos, permite discutir acompañamiento, criterio y supervisión.', linkUrl: 'https://www.youtube.com/watch?v=hJP5GqnTrNo', imageLogo: Ponencia },
        ],
        additionalInfo: [
            'No requiere programación.',
            'En Google debe utilizarse el enlace al curso introductorio; no es necesario contratar una suscripción para otros laboratorios.',
            'IBM requiere una cuenta gratuita.',
            'Las lecturas son artículos públicos; algunas están en inglés.',
        ],
        requirements: [
            'Completar los dos cursos principales.',
            'Revisar sus dos lecturas asociadas y el video del nivel.',
            'Aprobar la evaluación interna con un mínimo de 80%.',
            'Entregar una tarea resuelta con IA, incluyendo instrucción, resultado y validación.',
            'Identificar una limitación o error y explicar cómo se atendió.',
            'Cargar las evidencias en Campus TI.',
        ],
        nextLevelName: 'Total Builder',
    },
    builder: {
        id: 'builder',
        levelNumber: 2,
        imageSrc: Nivel2,
        title: 'Total Builder',
        descriptionTitle: 'Comprende, experimenta y aplica',
        description: 'Convierte instrucciones en entregables útiles. Esta insignia reconoce tu capacidad para colaborar con IA, organizar tareas y revisar la calidad de los resultados antes de utilizarlos.',
        highlightText: 'La gratuidad de Academy incluye sus reconocimientos. Kaggle publica Python e Intro to Programming como cursos sin costo y con certificado; Platzi confirma la opción gratuita de programación. Claude Academy',
        summaryColumns: [
            {
                title: 'Objetivo del nivel:',
                description: 'Fortalecer la colaboración con IA y las bases técnicas necesarias para desarrollar soluciones.'
            },
            {
                title: 'Cursos del nivel:',
                description: 'Completar AI Fluency y una opción técnica: Claude Code 101 para desarrolladores con experiencia o Python para quienes necesitan fortalecer esa base.'
            }
        ],
        courses: [
            { id: 'cb1', type: 'Principal', title: 'AI Fluency: Framework and Foundations', provider: 'Anthropic / Claude Academy', providerUrl: 'https://www.skills.google/course_templates/539?utm_source=chatgpt.com' },
            { id: 'cb2', type: 'Opción técnica', title: 'Claude Code 101', provider: 'Anthropic / Claude Academy', providerUrl: 'https://academy.claude.com/courses/claude-code-101?utm_source=chatgpt.com' },
            { id: 'cb3', type: 'Opción técnica', title: 'Python', provider: 'Kaggle', providerUrl: 'https://www.kaggle.com/learn/python?utm_source=chatgpt.com' },
            { id: 'cb4', type: 'Complementario', title: 'Programación Básica', provider: 'Google', providerUrl: 'https://platzi.com/cursos/programacion-basica/?utm_source=chatgpt.com' },
            { id: 'cb5', type: 'Complementario', title: 'Intro to Programming', provider: 'Kaggle', providerUrl: 'https://www.kaggle.com/learn/intro-to-programming' },
        ],
        readings: [
            { id: 'rb1', title: 'AI Fluency', description: 'Aprender a delegar, describir tareas y evaluar respuestas.', linkUrl: 'https://www.ibm.com/think/topics/prompt-engineering?utm_source=chatgpt.com', imageLogo: IBM },
            { id: 'rb2', title: 'Claude Code 101', description: 'Comprender planificación, contexto y revisión de código asistido.', linkUrl: 'https://code.claude.com/docs/en/best-practices', imageLogo: ClaudeCo },
            { id: 'rb3', title: 'El tutorial de Python', description: 'Manejar funciones, estructuras de datos y lógica de programación.', linkUrl: 'https://docs.python.org/es/3/tutorial/?utm_source=chatgpt.com', imageLogo: Python },
            { id: 'rb4', title: 'Programación Básica', description: 'Comprender algoritmos, variables y control de flujo.', linkUrl: 'https://docs.python.org/es/3/tutorial/controlflow.html', imageLogo: Python },
            { id: 'rb5', title: 'Intro to Programming', description: 'Iniciar en programación desde conceptos elementales.', linkUrl: 'https://docs.python.org/es/3/tutorial/introduction.html', imageLogo: Python },
            { id: 'rb6', title: '4 Methods of Prompt Engineering — IBM Technology.', description: 'Propósito: Comparar formas de estructurar instrucciones y aplicar una de ellas a una tarea del participante.', linkUrl: 'https://www.youtube.com/watch?v=1c9iyoVIwDs', imageLogo: Ponencia1 },
        ],
        additionalInfo: [
            'No será obligatorio contratar Claude Code. Se estudiará el curso y se demostrará lo aprendido con una herramienta gratuita o un ejercicio de revisión.',
            'Las lecturas de Python complementan la lógica de programación; no sustituyen el lenguaje o los ejercicios del curso de Platzi.',
            'Quienes no tengan experiencia pueden comenzar por Intro to Programming antes de Python.',
        ],
        requirements: [
            'Contar con Total Maker.',
            'Completar AI Fluency y una opción técnica.',
            'Revisar las lecturas de los cursos elegidos y el video.',
            'Aprobar la evaluación interna con un mínimo de 80%.',
            'Entregar un script, una función, casos de prueba o una especificación trabajada con IA.',
            'Explicar qué produjo la IA, qué se corrigió y cómo se comprobó.',
            'Obtener una revisión aprobatoria.',
        ],
        nextLevelName: 'Total Creator',
    },
    creator: {
        id: 'creator',
        levelNumber: 3,
        imageSrc: Nivel3,
        title: 'Total Creator',
        descriptionTitle: 'Convierte ideas en soluciones',
        description: 'Transforma una necesidad en un prototipo que puedas demostrar. Esta insignia reconoce tu capacidad para combinar datos, herramientas e inteligencia artificial y validar una solución con criterios claros.',
        highlightText: 'Microsoft ofrece materiales abiertos e incluye una opción de ejecución local sin suscripción de nube. Hugging Face declara gratuito su proceso de certificación; Kaggle publica los cursos señalados sin costo. github.com',
        summaryColumns: [
            { title: 'Objetivo del nivel', description: 'Construir un prototipo funcional y comprender cómo intervienen los datos, los modelos y los agentes.' },
            { title: 'Cursos del nivel', description: 'Completar el bloque seleccionado de Microsoft y la unidad 1 de Hugging Face. Los cursos de Kaggle son complementarios.' }
        ],
        courses: [
            { id: 'cc1', type: 'Principal', title: 'Generative AI for Beginners', provider: 'Microsoft', providerUrl: 'https://github.com/microsoft/generative-ai-for-beginners?utm_source=chatgpt.com' },
            { id: 'cc2', type: 'Principal', title: 'AI Agents Course: unidad 1', provider: 'Hugging Face', providerUrl: 'https://huggingface.co/learn/agents-course/en/unit0/introduction?utm_source=chatgpt.com' },
            { id: 'cc3', type: 'Complementario', title: 'Intro to Machine Learning', provider: 'Kaggle', providerUrl: 'https://www.kaggle.com/learn/intro-to-machine-learning?utm_source=chatgpt.com' },
            { id: 'cc4', type: 'Complementario', title: 'Pandas', provider: 'Kaggle', providerUrl: 'https://www.kaggle.com/learn/pandas?utm_source=chatgpt.com' },
        ],
        readings: [
            { id: 'rc1', title: 'Generative AI for Beginners', description: 'Estudiar fundamentos, prompts y construcción de aplicaciones de chat.', linkUrl: 'https://www.anthropic.com/engineering/building-effective-agents?utm_source=chatgpt.com', imageLogo: Generacion },
            { id: 'rc2', title: 'AI Agents Course: unidad 1', description: 'Comprender agentes, herramientas y secuencias de acciones.', linkUrl: 'https://www.ibm.com/think/topics/ai-agents?utm_source=chatgpt.com', imageLogo: IBM },
            { id: 'rc3', title: 'Intro to Machine Learning', description: 'Construir y evaluar modelos predictivos básicos.', linkUrl: 'https://www.ibm.com/think/topics/machine-learning?utm_source=chatgpt.com', imageLogo: IBM },
            { id: 'rc4', title: 'Pandas', description: 'Explorar, limpiar y transformar información para su análisis.', linkUrl: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html?utm_source=chatgpt.com', imageLogo: Pandas },
            { id: 'rc5', title: 'What Are AI Agents? — IBM Technology.', description: 'Propósito: Distinguir un agente de una interacción simple con un chatbot y reconocer cuándo conviene utilizarlo.', linkUrl: 'https://www.youtube.com/watch?v=F8NKVhkZZWI', imageLogo: Agente },
        ],
        additionalInfo: [
            'El bloque de Microsoft es una selección interna, no la acreditación del curso completo.',
            'Los ejemplos que utilicen APIs de pago deberán adaptarse a ejecución local o simulación.',
            'Building with the Claude API deja de ser parte de la ruta práctica gratuita, porque reproducir sus integraciones puede generar consumo de API.',
        ],
        requirements: [
            'Contar con Total Builder.',
            'Completar los dos bloques principales.',
            'Revisar sus lecturas asociadas y el video.',
            'Aprobar la evaluación interna con un mínimo de 80%.',
            'Presentar un prototipo con problema, usuario y criterios de aceptación.',
            'Documentar pruebas, errores y ajustes.',
            'Acreditar la contribución individual cuando el trabajo sea en equipo.',
        ],
        nextLevelName: 'Total Architect',
    },
    architect: {
        id: 'architect',
        levelNumber: 4,
        imageSrc: Nivel4,
        title: 'Total Architect',
        descriptionTitle: 'Convierte ideas en soluciones',
        description: 'Conecta inteligencia artificial, datos y herramientas con una visión integral. Esta insignia reconoce tu capacidad para diseñar soluciones con controles de acceso, integración y evaluación de calidad, tiempos de respuesta y costos.',
        highlightText: 'Hugging Face confirma certificados gratuitos para MCP. Harvard distingue expresamente su certificado CS50 gratuito del certificado verificado de pago de edX.',
        summaryColumns: [
            { title: 'Objetivo del nivel:', description: 'Diseñar integraciones confiables y justificar cómo se conectan las herramientas, los modelos y las fuentes de información Hugging Face.' },
            { title: 'Cursos del nivel:', description: 'Completar Introduction to Model Context Protocol de Anthropic y las unidades 2 y 3 de AI Agents Course. Los demás son complementarios.' }
        ],
        courses: [
            { id: 'cd1', type: 'Principal', title: 'Introduction to Model Context Protocol', provider: 'Anthropic / Claude Academy', providerUrl: 'https://academy.claude.com/courses/introduction-to-model-context-protocol?utm_source=chatgpt.com' },
            { id: 'cd2', type: 'Principal', title: 'AI Agents Course: unidades 2 y 3', provider: 'Hugging Face', providerUrl: 'https://huggingface.co/learn/agents-course/en/unit0/introduction?utm_source=chatgpt.com' },
            { id: 'cd3', type: 'Complementario', title: 'Model Context Protocol Course', provider: 'Hugging Face y Anthropic', providerUrl: 'https://huggingface.co/learn/mcp-course/en/unit0/introduction?utm_source=chatgpt.com' },
            { id: 'cd4', type: 'Complementario', title: 'CS50’s Introduction to Artificial Intelligence with Python', provider: 'Harvard / CS50', providerUrl: 'https://cs50.harvard.edu/ai/?utm_source=chatgpt.com' },
            { id: 'cd5', type: 'Complementario', title: 'Intro to Deep Learning', provider: 'Kaggle', providerUrl: 'https://www.kaggle.com/learn/intro-to-deep-learning?utm_source=chatgpt.com' },
        ],
        readings: [
            { id: 'rd1', title: 'Introduction to MCP — Anthropic', description: 'Comprender clientes, servidores y conexión con herramientas.', linkUrl: 'https://www.anthropic.com/news/model-context-protocol?utm_source=chatgpt.com', imageLogo: Anthropic },
            { id: 'rd2', title: 'Agentes: unidades 2 y 3', description: 'Conocer frameworks y recuperación de información para fundamentar respuestas.', linkUrl: 'https://www.ibm.com/think/topics/retrieval-augmented-generation?utm_source=chatgpt.com', imageLogo: IBM },
            { id: 'rd3', title: 'MCP Course — Hugging Face', description: 'Profundizar en integraciones y aplicaciones completas.', linkUrl: 'https://www.anthropic.com/engineering/building-effective-agents?utm_source=chatgpt.com', imageLogo: Anthropic },
            { id: 'rd4', title: 'CS50 AI with Python', description: 'Ampliar conocimientos de búsqueda, aprendizaje y redes neuronales.', linkUrl: 'https://www.ibm.com/think/topics/artificial-intelligence?utm_source=chatgpt.com', imageLogo: IBM },
            { id: 'rd5', title: 'Intro to Deep Learning', description: 'Comprender redes neuronales y su entrenamiento.', linkUrl: 'https://www.ibm.com/think/topics/deep-learning?utm_source=chatgpt.com', imageLogo: IBM },
            { id: 'rd6', title: 'What Is Retrieval-Augmented Generation — IBM.', description: 'Propósito: Comprender cómo incorporar fuentes de información a una aplicación con IA.', linkUrl: 'https://www.youtube.com/watch?v=T-D1OfcDW1M', imageLogo: Ponencia2 },
        ],
        additionalInfo: [
            'Los proyectos técnicos requieren bases de Python o un lenguaje equivalente y conceptos de APIs.',
            'Los colaboradores de TI pueden participar en fuentes, permisos, reglas de negocio y pruebas, acompañados por un desarrollador.',
            'Harvard es una ampliación extensa: no se suma como requisito al calendario general.',
            'En edX debe elegirse la modalidad gratuita o de auditoría y seguir los requisitos de CS50.',
        ],
        requirements: [
            'Contar con Total Creator.',
            'Completar los dos bloques principales y sus lecturas.',
            'Revisar el video y explicar cómo se relaciona con el proyecto.',
            'Aprobar la evaluación interna con un mínimo de 80%.',
            'Presentar una arquitectura y una prueba de concepto funcional.',
            'Incluir controles de acceso, evaluación de calidad, tiempos de respuesta y costos estimados.',
            'Justificar las decisiones técnicas y obtener la aprobación del entregable.',
        ],
        nextLevelName: 'Total Master',
    },
    master: {
        id: 'master',
        levelNumber: 5,
        imageSrc: Nivel5,
        title: 'Total Master Maker',
        descriptionTitle: 'Lidera, demuestra y comparte',
        description: 'Convierte el aprendizaje en resultados para tu equipo. Esta insignia reconoce tu capacidad para liderar un piloto, evaluar su impacto y compartir una solución que otras personas puedan aprovechar.',
        highlightText: 'Microsoft Learn ofrece formación gratuita y registra la aprobación del módulo indicado; Kaggle publica Explainability sin costo y con certificado.',
        summaryColumns: [
            { title: 'Objetivo del nivel:', description: 'Demostrar el valor de una solución mediante indicadores, evaluación y un plan de implementación.' },
            { title: 'Cursos del nivel:', description: 'Completar los tres bloques principales. Los otros cursos son complementarios.' },
        ],
        courses: [
            { id: 'ce1', type: 'Principal', title: 'Building Effective Human-Agent Teams', provider: 'Anthropic / Claude Academy', providerUrl: 'https://academy.claude.com/courses/building-effective-human-agent-teams?utm_source=chatgpt.com' },
            { id: 'ce2', type: 'Principal', title: 'Build Effective Generative AI Solutions in Your Organization', provider: 'Microsoft Learn', providerUrl: 'https://learn.microsoft.com/en-us/training/modules/build-effective-generative-ai-solutions-organization/?utm_source=chatgpt.com' },
            { id: 'ce3', type: 'Principal', title: 'AI Agents Course: observabilidad y evaluación', provider: 'Hugging Face', providerUrl: 'https://huggingface.co/learn/agents-course/en/unit0/introduction?utm_source=chatgpt.com' },
            { id: 'ce4', type: 'Complementario', title: 'Machine Learning Explainability', provider: 'Kaggle', providerUrl: 'https://www.kaggle.com/learn/machine-learning-explainability?utm_source=chatgpt.com' },
            { id: 'ce5', type: 'Complementario', title: 'AI Agents for Beginners', provider: 'Microsoft', providerUrl: 'https://github.com/microsoft/ai-agents-for-beginners?utm_source=chatgpt.com' },
        ],
        readings: [
            { id: 're1', title: 'Human-Agent Teams', description: 'Definir roles, supervisión y colaboración entre personas y agentes.', linkUrl: 'https://www.anthropic.com/engineering/building-effective-agents?utm_source=chatgpt.com', imageLogo: Generacion },
            { id: 're2', title: 'Effective Generative AI Solutions', description: 'Relacionar datos, seguridad y confiabilidad con necesidades del negocio.', linkUrl: 'https://www.ibm.com/think/topics/ai-governance?utm_source=chatgpt.com', imageLogo: IBM },
            { id: 're3', title: 'Observabilidad y evaluación', description: 'Diseñar pruebas y analizar fallos de una solución con agentes.', linkUrl: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents?utm_source=chatgpt.com', imageLogo: IBM },
            { id: 're4', title: 'Machine Learning Explainability', description: 'Interpretar resultados y factores relevantes en modelos predictivos.', linkUrl: 'https://www.ibm.com/think/topics/explainable-ai?utm_source=chatgpt.com', imageLogo: IBM },
            { id: 're5', title: 'AI Agents for Beginners', description: 'Profundizar en patrones, herramientas y confiabilidad de agentes.', linkUrl: 'https://www.ibm.com/think/topics/ai-agents?utm_source=chatgpt.com', imageLogo: IBM },
            { id: 're6', title: 'How AI Could Empower Any Business — Andrew Ng | TED', description: 'Identificar oportunidades concretas de aplicación de IA y conectar una solución con productividad.', linkUrl: 'https://www.youtube.com/watch?v=reUZRyXxUs4', imageLogo: Ponencia3 },
        ],
        additionalInfo: [
            'Los proyectos técnicos requieren bases de Python o un lenguaje equivalente y conceptos de APIs.',
            'Los colaboradores de TI pueden participar en fuentes, permisos, reglas de negocio y pruebas, acompañados por un desarrollador.',
            'Harvard es una ampliación extensa: no se suma como requisito al calendario general.',
            'En edX debe elegirse la modalidad gratuita o de auditoría y seguir los requisitos de CS50.',
        ],
        requirements: [
            'Contar con Total Creator.',
            'Completar los dos bloques principales y sus lecturas.',
            'Revisar el video y explicar cómo se relaciona con el proyecto.',
            'Aprobar la evaluación interna con un mínimo de 80%.',
            'Presentar una arquitectura y una prueba de concepto funcional.',
            'Incluir controles de acceso, evaluación de calidad, tiempos de respuesta y costos estimados.',
            'Justificar las decisiones técnicas y obtener la aprobación del entregable.',
        ],
        nextLevelName: null,
    }
};

// Configuración del Stepper
const badgeLevels = [
    { id: 'maker', name: 'Maker', badgeImg: Maker, activeColor: '#FFFFFF' },
    { id: 'builder', name: 'Builder', badgeImg: Builder, activeColor: '#00D3F3' },
    { id: 'creator', name: 'Creator', badgeImg: Creator, activeColor: '#BD45FF' },
    { id: 'architect', name: 'Architect', badgeImg: Architect, activeColor: '#FFD024' },
    { id: 'master', name: 'Master Maker', badgeImg: Master, activeColor: '#FFFFFF' },
];

const lineGradients = [
    'linear-gradient(90deg, #FFFFFF 0%, #00D3F3 100%)',
    'linear-gradient(90deg, #00D3F3 0%, #BD45FF 100%)',
    'linear-gradient(90deg, #BD45FF 0%, #FFD024 100%)',
    'linear-gradient(90deg, #FFD024 0%, #FFFFFF 100%)',
];

export const InsigniasMakers: React.FC = () => {
    const [activeLevelId, setActiveLevelId] = useState<string>('maker');
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const currentData = levelsData[activeLevelId];
    const activeIndex = badgeLevels.findIndex(b => b.id === activeLevelId);

    // Cambiar de nivel y reiniciar la vista a colapsada
    const handleLevelChange = (levelId: string) => {
        setActiveLevelId(levelId);
        setIsExpanded(false);
    };
    return (
        <section
            id="insignias"
            className="w-full max-w-[1332px] mx-auto py-12 px-4 sm:px-6 lg:px-8 font-['Montserrat',sans-serif] text-white scroll-mt-[68px]"
        >
            {/* Encabezado principal */}
            <div className="w-full max-w-[677px] mx-auto flex flex-col items-center text-center gap-2 mb-12">
                <span className="font-bold text-[18px] leading-[22px] text-[#00D3F3] tracking-wide">
                    Insignias
                </span>
                <h2 className="font-bold text-[32px] sm:text-[40px] leading-[40px] sm:leading-[49px] text-white">
                    Rasgos de la comunidad Makers
                </h2>
                <p className="font-normal text-[16px] leading-[28px] text-white/90 max-w-[580px] mt-2">
                    Cada insignia representa un nivel de aprendizaje, construcción y liderazgo dentro de la comunidad. Avanza completando cursos, certificaciones y proyectos con impacto real.
                </p>
            </div>

            {/* Contenedor con Barra de Progresión e Insignias */}
            <div className="w-full flex flex-col gap-[50px]">

                {/* Stepper / Barra de Niveles */}
                <div className="w-full overflow-x-auto py-6 scrollbar-none">
                    <div className="min-w-[800px] flex items-center justify-between px-6">
                        {badgeLevels.map((badge, index) => {
                            const isActive = activeLevelId === badge.id;
                            const isPassed = index <= activeIndex;

                            return (
                                <React.Fragment key={badge.id}>
                                    <button
                                        onClick={() => handleLevelChange(badge.id)}
                                        className="relative flex flex-col items-center gap-[8px] min-w-[80px] cursor-pointer group border-none bg-transparent p-2 outline-none focus:outline-none"
                                        type="button"
                                    >
                                        <div
                                            className={`w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all duration-300 p-1.5 ${
                                                isActive
                                                    ? 'bg-white/10 border border-white/20 shadow-[0px_0px_25px_rgba(56,189,248,0.4)] scale-110 z-10'
                                                    : isPassed
                                                        ? 'bg-white/10 border border-white/20'
                                                        : 'bg-[rgba(199,199,199,0.2)] border border-[rgba(199,199,199,0.1)] group-hover:bg-[rgba(199,199,199,0.3)]'
                                            }`}
                                        >
                                            <img
                                                src={badge.badgeImg}
                                                alt={badge.name}
                                                className={`w-full h-full object-contain transition-opacity duration-300 ${
                                                    isPassed ? 'opacity-100' : 'opacity-40 group-hover:opacity-75'
                                                }`}
                                            />
                                        </div>
                                        <span
                                            className="font-semibold text-[12px] leading-[15px] text-center transition-colors whitespace-nowrap"
                                            style={{
                                                color: isActive ? badge.activeColor : isPassed ? '#FFFFFF' : '#4B4B4B'
                                            }}
                                        >
                                            {badge.name}
                                        </span>
                                    </button>

                                    {/* Línea Conectora */}
                                    {index < badgeLevels.length - 1 && (
                                        <div
                                            className="flex-1 h-[2px] mx-2 -translate-y-[12px] min-w-[20px] transition-all duration-300"
                                            style={{
                                                background: index < activeIndex
                                                    ? lineGradients[index]
                                                    : '#4B4B4B'
                                            }}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Tarjeta Principal (Información Dinámica) */}
                <div className="w-full bg-black/20 border border-white/20 backdrop-blur-md shadow-[0px_2px_8px_rgba(0,0,0,0.2)] rounded-[20px] p-6 sm:p-8 flex flex-col gap-[36px] animate-fadeIn">

                    {/* Encabezado del Nivel */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-[30px] w-full">
                        <div className="w-[72px] h-[88px] flex-shrink-0 flex items-center justify-center">
                            <img
                                src={currentData.imageSrc}
                                alt={`Insignia de ${currentData.title}`}
                                className="w-full h-full object-contain filter drop-shadow-[0px_4px_10px_rgba(0,211,243,0.3)]"
                            />
                        </div>

                        <div className="flex flex-col justify-center gap-1 min-w-[159px]">
                            <span className="font-bold text-[18px] leading-[22px] text-[#00D3F3]">
                                Nivel {currentData.levelNumber} de 5
                            </span>
                            <h3 className="font-bold text-[26px] leading-[32px] text-white">
                                {currentData.title}
                            </h3>
                        </div>

                        <div className="flex flex-col gap-[10px] flex-1 my-auto">
                            {currentData.descriptionTitle && (
                                <h4 className="font-bold text-[18px] leading-[22px] text-white">
                                    {currentData.descriptionTitle}
                                </h4>
                            )}
                            <p className="font-normal text-[16px] leading-[20px] text-white/90">
                                {currentData.description}
                            </p>
                        </div>
                    </div>

                    {/* Dos Columnas de Resumen */}
                    {currentData.summaryColumns && currentData.summaryColumns.length === 2 && (
                        <div className="w-full flex flex-col sm:flex-row items-stretch gap-5 sm:gap-6 py-2">
                            <div className="flex-1 flex flex-col gap-1">
                                <h4 className="font-bold text-[18px] leading-[22px] text-white">
                                    {currentData.summaryColumns[0].title}
                                </h4>
                                <p className="font-normal text-[16px] leading-[20px] text-white/90">
                                    {currentData.summaryColumns[0].description}
                                </p>
                            </div>

                            <div className="hidden sm:block w-[1px] bg-[#4B4B4B]/60 self-stretch my-1" />

                            <div className="flex-1 flex flex-col gap-1">
                                <h4 className="font-bold text-[18px] leading-[22px] text-white">
                                    {currentData.summaryColumns[1].title}
                                </h4>
                                <p className="font-normal text-[16px] leading-[20px] text-white/90">
                                    {currentData.summaryColumns[1].description}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Bloque expandible de contenido detallado */}
                    {isExpanded && (
                        <div className="flex flex-col gap-[36px] pt-4 border-t border-white/10 animate-fadeIn">

                            {/* Sección de Cursos de Formación con Glassmorphism Mejorado */}
                            {currentData.courses.length > 0 && (
                                <div className="flex flex-col gap-3">
                                    <h4 className="font-bold text-[18px] leading-[22px] text-[#35D8FF] text-left">
                                        Formación
                                    </h4>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                        {currentData.courses.map((course) => {
                                            // Configuración de colores y degradados estilo cristal por tipo
                                            const isPrincipal = course.type === 'Principal';
                                            const isOption = course.type === 'Opción técnica';

                                            const badgeTextColor = isPrincipal
                                                ? 'text-[#BD45FF]'
                                                : isOption
                                                    ? 'text-[#F9459E]'
                                                    : 'text-[#FF8904]';

                                            const badgeBgGradient = isPrincipal
                                                ? 'linear-gradient(180deg, rgba(189, 69, 255, 0.22) 0%, rgba(189, 69, 255, 0.05) 100%)'
                                                : isOption
                                                    ? 'linear-gradient(180deg, rgba(249, 69, 158, 0.22) 0%, rgba(249, 69, 158, 0.05) 100%)'
                                                    : 'linear-gradient(180deg, rgba(255, 137, 4, 0.22) 0%, rgba(255, 137, 4, 0.05) 100%)';

                                            const badgeBorders = isPrincipal
                                                ? 'border-t border-l border-[#BD45FF]/60 border-r border-b border-[#BD45FF]/20'
                                                : isOption
                                                    ? 'border-t border-l border-[#F9459E]/60 border-r border-b border-[#F9459E]/20'
                                                    : 'border-t border-l border-[#FF8904]/60 border-r border-b border-[#FF8904]/20';

                                            return (
                                                <div
                                                    key={course.id}
                                                    className="flex items-center justify-between p-3.5 sm:px-4 sm:py-3.5 rounded-[12px] backdrop-blur-md border-t border-l border-white/35 border-r border-b border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/45 gap-3"
                                                    style={{
                                                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(0, 0, 0, 0.25) 100%)',
                                                    }}
                                                >
                                                    <div className="flex flex-col gap-2 flex-1 min-w-0 pr-2">
                                                        {/* Badge de Tipo con Cristal Biselado */}
                                                        <span
                                                            className={`w-fit px-2.5 py-0.5 rounded-full text-[12px] font-bold leading-[16px] backdrop-blur-sm shadow-[0_2px_6px_rgba(0,0,0,0.2)] ${badgeTextColor} ${badgeBorders}`}
                                                            style={{ background: badgeBgGradient }}
                                                        >
                                {course.type}
                            </span>

                                                        {/* Título del curso */}
                                                        <span className="font-medium text-[15px] sm:text-[16px] leading-[20px] text-white text-left break-words">
                                {course.title}
                            </span>
                                                    </div>

                                                    {/* Botón del Proveedor con Cristal Esmerilado */}
                                                    <a
                                                        href={course.providerUrl || '#'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-1.5 rounded-full font-bold text-[13px] text-[#38BDF8] hover:text-[#35D8FF] backdrop-blur-md border-t border-l border-[#38BDF8]/60 border-r border-b border-[#38BDF8]/20 shadow-[0_4px_10px_rgba(0,0,0,0.25)] flex-shrink-0 transition-all hover:bg-white/10 active:scale-95 flex items-center gap-1.5 group cursor-pointer"
                                                        style={{
                                                            background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.18) 0%, rgba(56, 189, 248, 0.04) 100%)',
                                                        }}
                                                        title="Ir al sitio del proveedor"
                                                    >
                                                        <span>{course.provider}</span>
                                                        <svg
                                                            className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2.2"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Contenedor Informativo Destacado */}
                            {currentData.highlightText && (
                                <div className="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-[12px] shadow-[0px_2px_8px_rgba(0,0,0,0.2)]">
                                    <p className="font-normal text-[16px] leading-[20px] text-white">
                                        {currentData.id === 'maker' ? (
                                            <>
                                                Google publica su formación introductoria sin costo; IBM confirma que la credencial indicada es gratuita y está disponible para usuarios registrados. Ingresa al siguiente Link para mayor información:{' '}
                                                <a
                                                    href="https://cloud.google.com/blog/topics/training-certifications/new-generative-ai-trainings-from-google-cloud?hl=en&utm_source=chatgpt.com"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#38BDF8] underline hover:text-[#00D3F3] font-semibold transition-colors"
                                                >
                                                    Google Cloud Blog
                                                </a>
                                            </>
                                        ) : currentData.id === 'builder' ? (
                                            <>
                                                La gratuidad de Academy incluye sus reconocimientos. Kaggle publica Python e Intro to Programming como cursos sin costo y con certificado; Platzi confirma la opción gratuita de programación.{' '}
                                                <a
                                                    href="https://academy.claude.com/help/faq?utm_source=chatgpt.com"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#38BDF8] underline hover:text-[#00D3F3] font-semibold transition-colors"
                                                >
                                                    Claude Academy
                                                </a>
                                            </>
                                        ) : currentData.id === 'architect' ? (
                                            <>
                                                Hugging Face confirma certificados gratuitos para MCP. Harvard distingue expresamente su certificado CS50 gratuito del certificado verificado de pago de edX.{' '}
                                                <a
                                                    href="https://huggingface.co/learn/mcp-course/en/unit0/introduction?utm_source=chatgpt.com"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#38BDF8] underline hover:text-[#00D3F3] font-semibold transition-colors"
                                                >
                                                    Hugging Face
                                                </a>
                                            </>
                                        ) : currentData.id === 'master' ? (
                                            <>
                                                Microsoft Learn ofrece formación gratuita y registra la aprobación del módulo indicado; Kaggle publica Explainability sin costo y con certificado.{' '}
                                                <a
                                                    href="https://learn.microsoft.com/en-us/training/support/faq?utm_source=chatgpt.com&pivots=general"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#38BDF8] underline hover:text-[#00D3F3] font-semibold transition-colors"
                                                >
                                                    Microsoft Learn
                                                </a>
                                            </>
                                        ) : (
                                            currentData.highlightText
                                        )}
                                    </p>
                                </div>
                            )}

                            {/* Lecturas y Videos de Apoyo */}
                            {currentData.readings.length > 0 && (
                                <div className="flex flex-col gap-4">
                                    <h4 className="font-bold text-[18px] leading-[22px] text-[#00D3F3]">
                                        Objetivo y lectura de apoyo por curso:
                                    </h4>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {currentData.readings.map((reading, index, array) => {
                                            // Detecta si es el último elemento del arreglo O si tiene type === 'video'
                                            const isVideo = reading.type === 'video' || index === array.length - 1;

                                            return (
                                                <div
                                                    key={reading.id}
                                                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 sm:p-4 bg-[#113C4F]/20 border border-[#25354B]/30 rounded-[10px]"
                                                >
                                                    <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden p-2">
                                                        {reading.imageLogo ? (
                                                            <img
                                                                src={reading.imageLogo}
                                                                alt={reading.title}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        ) : (
                                                            <span className="text-[#0a0e1a] font-bold text-[12px] text-center leading-tight">
                                                                TOTAL
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col justify-between flex-1 gap-2 w-full">
                                                        <div className="flex flex-col gap-1">
                                                            <h5 className="font-semibold text-[16px] leading-[20px] text-white">
                                                                {reading.title}
                                                            </h5>
                                                            <p className="font-normal text-[14px] leading-[20px] text-white/90">
                                                                {reading.description}
                                                            </p>
                                                        </div>

                                                        <div className="flex justify-end pt-1">
                                                            <a
                                                                href={reading.linkUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2 font-bold text-[16px] leading-[22px] text-[#38BDF8] hover:text-[#00D3F3] transition-colors group"
                                                            >
                                                                {/* Cambia el texto dinámicamente */}
                                                                <span>{isVideo ? 'Ir a video' : 'Ir a lectura'}</span>

                                                                {/* Cambia el ícono dinámicamente */}
                                                                {isVideo ? (
                                                                    <svg
                                                                        className="w-5 h-5 text-[#38BDF8] transform group-hover:scale-110 transition-transform"
                                                                        fill="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path d="M8 5v14l11-7z" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg
                                                                        className="w-5 h-5 text-[#38BDF8] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                                                    </svg>
                                                                )}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Información Adicional */}
                            {currentData.additionalInfo.length > 0 && (
                                <div className="flex flex-col gap-3">
                                    <h4 className="font-bold text-[18px] leading-[22px] text-[#35D8FF]">
                                        Información adicional
                                    </h4>

                                    <div className="flex flex-col gap-2">
                                        {currentData.additionalInfo.map((text, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className="w-[30px] h-[30px] rounded-full bg-[#35D8FF]/10 border border-[#35D8FF]/20 flex items-center justify-center flex-shrink-0">
                                                    <span className="font-bold text-[16px] leading-[20px] text-[#00D3F3]">
                                                        {idx + 1}
                                                    </span>
                                                </div>
                                                <p className="font-normal text-[16px] leading-[20px] text-white">
                                                    {text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Requisitos */}
                            {currentData.requirements.length > 0 && (
                                <div className="flex flex-col gap-3">
                                    <h4 className="font-bold text-[18px] leading-[22px] text-[#35D8FF]">
                                        Requisitos para obtener {currentData.title}{currentData.nextLevelName ? ` y desbloquear ${currentData.nextLevelName}` : ''}:
                                    </h4>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-3">
                                        {currentData.requirements.map((req, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className="w-[30px] h-[30px] rounded-full bg-[#35D8FF]/10 border border-[#35D8FF]/20 flex items-center justify-center flex-shrink-0">
                                                    <span className="font-bold text-[16px] leading-[20px] text-[#00D3F3]">
                                                        {idx + 1}
                                                    </span>
                                                </div>
                                                <p className="font-normal text-[16px] leading-[20px] text-white">
                                                    {req}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Banner: Siguiente nivel */}
                            {currentData.nextLevelName && (
                                <div className="w-full px-4 py-3 bg-white/10 border border-white/5 rounded-[12px] shadow-[0px_2px_8px_rgba(0,0,0,0.2)]">
                                    <span className="font-bold text-[18px] leading-[22px] text-white">
                                        Siguiente nivel:{' '}
                                        <span className="text-[#38BDF8]">
                                            {currentData.nextLevelName}
                                        </span>
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Botón Dinámico Ver más / Ver menos */}
                    <div className="flex justify-end pt-2 border-t border-white/10">
                        <button
                            type="button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-2 font-bold text-[18px] leading-[22px] text-[#38BDF8] hover:text-[#00D3F3] transition-colors cursor-pointer bg-transparent border-none group"
                        >
                            <span>{isExpanded ? 'Ver menos' : 'Ver más'}</span>
                            <svg
                                className={`w-5 h-5 text-[#38BDF8] group-hover:text-[#00D3F3] transition-transform duration-300 ${
                                    isExpanded ? 'rotate-180' : 'rotate-0'
                                }`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default InsigniasMakers;