interface EventoItem {
  hora: string
  descripcion: string
}

interface DiaSched {
  dia: string
  fecha: string
  eventos: EventoItem[]
}

const itinerario: DiaSched[] = [
  {
    dia: 'Miércoles',
    fecha: '22',
    eventos: [
      { hora: '8:30 AM', descripcion: 'Desayuno Buffet | Restaurante Azul y Chaká' },
      { hora: '9:00 AM', descripcion: 'Bienvenida y palabras de apertura, Eduardo Kuri | Salón Fernanda' },
      { hora: '9:30 AM', descripcion: 'Sesión 1 | AI and Data Monetization Strategy.' },
      { hora: '11:00 AM', descripcion: 'Break' },
      { hora: '11:15 AM', descripcion: 'Sesión 2 | Digital Strategy of the Future.' },
      { hora: '12:15 PM', descripcion: 'Break' },
      { hora: '12:25 PM', descripcion: 'Sesión 3 | Residential Broadband: Sustaining Growth, ARPUs, and expanding into new segments.' },
      { hora: '2:00 PM', descripcion: 'Comida | Opciones disponibles\nBuffet: Restaurante Azul y Chaká\nA la carta: Restaurante Bistro\n' },
      { hora: '3:00 PM', descripcion: 'Actividades a elegir:\nActividades Acuáticas\n Spa | Zen Grand' },
      { hora: '8:00 PM', descripcion: 'Cena de Apertura | Restaurante Lucca' },
    ],
  },
  {
    dia: 'Jueves',
    fecha: '23',
    eventos: [
      { hora: '7:00 AM', descripcion: 'Tour de Bicicleta | Motor Lobby Grand Class' },
      { hora: '8:00 AM', descripcion: 'Desayuno Buffet | Restaurante Azul y Chaká' },
      { hora: '9:00 AM', descripcion: 'Sesión 1 | Totalplay\'s AI Operations and Network Strategy (from Reactive to Predictive).' },
      { hora: '10:00 AM', descripcion: 'Break' },
      { hora: '10:10 AM', descripcion: 'Sesión 2 | The SMB Market and B2G Opportunities.' },
      { hora: '11:25 PM', descripcion: 'Break' },
      { hora: '11:40 AM', descripcion: 'Sesión 3 | The Video Market: Extending Totalplay’s Video Runway and Value.' },
      { hora: '1:30 PM', descripcion: 'Comida | Opciones disponibles\nBuffet: Restaurante Azul y Chaká\nA la carta: Restaurante Bistro\n' },
      { hora: '2:00 PM', descripcion: 'Actividades a elegir:\nActividades Acuáticas\nTorneo de Golf amistoso | Gran Coyote\n' },
      { hora: '8:00 PM', descripcion: 'Cena de clausura "Bloom" | Jardín Zen' },
    ],
  },
  {
    dia: 'Viernes',
    fecha: '24',
    eventos: [
      { hora: '8:30 AM', descripcion: 'Desayuno Buffet | Restaurante Azul y Chaká' },
      { hora: '9:00 AM', descripcion: 'Presentación Huawei | Salón Fernanda' },
      { hora: '10:00 AM', descripcion: 'Alineación y Priorización de Iniciativas.' },
      { hora: '12:00 PM', descripcion: 'Conclusiones y cierre del evento.' },
      { hora: '1:00 PM', descripcion: 'Late Check-out' },
    ],
  },
]

const Itinerario = () => {
  return (
    <section className="bg-[#0a0e1a] px-5 py-12 flex flex-col gap-8">
      {/* Encabezado */}
      <div className="text-center flex flex-col gap-2 w-full max-w-[22.6875rem] min-h-[7.5rem] mx-auto">
        <h2 className="font-orbitron font-semibold text-[2.25rem] leading-[3rem] tracking-normal text-center text-white">
          Agenda
        </h2>
        <p className="font-montserrat font-normal text-[1rem] leading-[1.5rem] tracking-normal text-center text-white/60">
          La agenda está diseñada con el acompañamiento de EY, firma global líder en consultoría, auditoría y estrategia empresarial.
        </p>
        {/* Botón Conoce más */}
        <div className="flex justify-center">
          <a
            href="http://www.ey.com"
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
            Conócelos aquí
          </a>
        </div>
      </div>

      {/* Días */}
      {itinerario.map((dia, diaIndex) => (
        <div key={diaIndex} className="flex flex-col gap-4">
          {/* Título del día */}
          <h3
            className="font-orbitron font-semibold text-[1.375rem] leading-[2rem] text-left inline-block"
            style={{
              background: 'linear-gradient(90deg, #51A2FF 0%, #C27AFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {dia.dia} {dia.fecha}
          </h3>

          {/* Timeline */}
          <div className="flex flex-col">
            {dia.eventos.map((evento, eventoIndex) => (
              <div key={eventoIndex} className="flex items-start gap-4 relative">
                {/* Hora */}
                <span className="font-montserrat font-semibold text-[1rem] leading-[1.5rem] tracking-normal text-[#8EC5FFB2] w-20 flex-shrink-0 pt-1 text-right">
                  {evento.hora}
                </span>

                {/* Línea + punto */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#51A2FF] shadow-[0_0_0.625rem_0_#3B82F6CC] mt-1 z-10" />
                  {eventoIndex < dia.eventos.length - 1 && (
                    <div className="w-px flex-1 min-h-[2rem] bg-blue-900/60" />
                  )}
                </div>

                {/* Descripción */}
                <span className="font-montserrat font-normal text-[0.875rem] leading-[1.5rem] tracking-normal text-[#DBEAFEE5] pt-1 pb-6 text-left whitespace-pre-line">
                  {evento.descripcion}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default Itinerario
