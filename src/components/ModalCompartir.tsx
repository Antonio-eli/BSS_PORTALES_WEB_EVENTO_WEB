import { useState, useRef, useCallback } from 'react'
import { X, Trash2, ImageIcon, CloudUpload } from 'lucide-react'

interface Archivo {
  nombre: string
  tamano: string
  file: File
}

interface ModalCompartirProps {
  isOpen: boolean
  onClose: () => void
}

// Configuración de seguridad
const MAX_SIZE_MB = 10 // Tamaño máximo por imagen
const MAX_FILES = 5 // Máximo número de archivos

// Lista blanca de tipos permitidos (MIME type + extensiones)
const ALLOWED_TYPES: Record<string, string[]> = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
}

const ALLOWED_EXTENSIONS = Object.values(ALLOWED_TYPES).flat()

const formatSize = (bytes: number): string => {
  const mb = bytes / (1024 * 1024)
  return mb < 1 ? `${(bytes / 1024).toFixed(0)}kb` : `${mb.toFixed(0)}mb`
}

const validarArchivo = (file: File): { valido: boolean; error?: string } => {
  // 1. Validar tamaño
  const sizeMB = file.size / (1024 * 1024)
  if (sizeMB > MAX_SIZE_MB) {
    return { valido: false, error: `La imagen no puede superar ${MAX_SIZE_MB}MB` }
  }

  // 2. Validar MIME type
  if (!Object.keys(ALLOWED_TYPES).includes(file.type)) {
    return { valido: false, error: 'Solo se permiten imágenes PNG, JPG, GIF o WEBP' }
  }

  // 3. Validar extensión del archivo
  const extension = file.name.toLowerCase().match(/\.[^.]+$/)?.[0]
  if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
    return { valido: false, error: 'Extensión de archivo no válida' }
  }

  // 4. Validar que extensión coincida con MIME type
  const extensionesPermitidas = ALLOWED_TYPES[file.type]
  if (!extensionesPermitidas || !extensionesPermitidas.includes(extension)) {
    return { valido: false, error: 'El tipo de archivo no coincide con su extensión' }
  }

  // 5. Sanitizar nombre de archivo (evitar caracteres peligrosos)
  const nombrePeligroso = /[<>:"|?*\x00-\x1f]/g.test(file.name)
  if (nombrePeligroso) {
    return { valido: false, error: 'El nombre del archivo contiene caracteres no permitidos' }
  }

  return { valido: true }
}

const ModalCompartir = ({ isOpen, onClose }: ModalCompartirProps) => {
  const [archivos, setArchivos] = useState<Archivo[]>([])
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const agregarArchivos = (files: FileList | null) => {
    if (!files) return
    
    setError('') // Limpiar errores anteriores
    
    // Validar número máximo de archivos
    if (archivos.length + files.length > MAX_FILES) {
      setError(`Solo puedes subir hasta ${MAX_FILES} imágenes`)
      return
    }

    const nuevos: Archivo[] = []
    const errores: string[] = []

    Array.from(files).forEach((file) => {
      const validacion = validarArchivo(file)
      
      if (!validacion.valido) {
        errores.push(`${file.name}: ${validacion.error}`)
        return
      }

      nuevos.push({
        nombre: file.name,
        tamano: formatSize(file.size),
        file,
      })
    })

    if (errores.length > 0) {
      setError(errores[0]) // Mostrar el primer error
    }

    if (nuevos.length > 0) {
      setArchivos((prev) => [...prev, ...nuevos])
    }
  }

  const eliminar = (index: number) => {
    setArchivos((prev) => prev.filter((_, i) => i !== index))
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    agregarArchivos(e.dataTransfer.files)
  }, [])

  const handleCompartir = async () => {
    if (archivos.length === 0) return
    setLoading(true)
    setError('')
    
    try {
      const API_URL = import.meta.env.VITE_API_URL

      for (const archivo of archivos) {
        const formData = new FormData()
        formData.append('imagen', archivo.file)
        formData.append('nombre', archivo.nombre)
        formData.append('evento', 'galeria')

        const response = await fetch(`${API_URL}/eventos-web`, {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data?.error || 'Error al subir imagen')
        }
      }

      setArchivos([])
      onClose()
    } catch (error) {
      console.error('Error al subir', error)
      setError(error instanceof Error ? error.message : 'Error al subir las imágenes. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setArchivos([])
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm bg-[#0d1229] border border-white/10 rounded-3xl px-5 py-6 flex flex-col gap-5">

        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center
            text-white hover:bg-white/20 transition-all duration-300"
        >
          <X size={18} />
        </button>

        {/* Zona de drop */}
        <div
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-3 px-6 py-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300
            ${dragging ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 bg-white/5 hover:border-white/40'}`}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
            <CloudUpload size={32} className="text-white/70" />
          </div>
          <p className="font-montserrat text-white/70 text-sm text-center leading-relaxed">
            Sube tu imagen arrastrando o desde tu buscador
          </p>
          <p className="font-montserrat text-white/40 text-xs">
            PNG, JPG, GIF o WEBP · Máx {MAX_SIZE_MB}MB · Hasta {MAX_FILES} imágenes
          </p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30">
            <p className="font-montserrat text-red-400 text-xs text-center">
              {error}
            </p>
          </div>
        )}

        {/* Input file oculto */}
        <input
          ref={inputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.gif,.webp"
          multiple
          className="hidden"
          onChange={(e) => agregarArchivos(e.target.files)}
        />

        {/* Lista de archivos */}
        {archivos.length > 0 && (
          <div className="flex flex-col gap-3">
            {archivos.map((archivo, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              >
                {/* Ícono */}
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <ImageIcon size={20} className="text-white/60" />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-montserrat text-white text-xs truncate">
                    {archivo.nombre}
                  </span>
                  <span className="font-montserrat text-white/40 text-xs">
                    {archivo.tamano}
                  </span>
                </div>

                {/* Eliminar */}
                <button
                  onClick={() => eliminar(index)}
                  className="text-white/40 hover:text-red-400 transition-colors duration-300 flex-shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Botón compartir */}
        <button
          onClick={handleCompartir}
          disabled={archivos.length === 0 || loading}
          className="w-full h-[4.25rem] rounded-full
            border-[3px] border-[#682B9B] text-white
            shadow-[0_0_40px_0_#682B9B66]
            font-montserrat font-normal text-sm
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:shadow-[0_0_60px_0_#682B9BCC]
            hover:border-[#9827D7]
            transition-all duration-500"
        >
          {loading ? 'Subiendo...' : 'Compartir'}
        </button>

      </div>
    </div>
  )
}

export default ModalCompartir