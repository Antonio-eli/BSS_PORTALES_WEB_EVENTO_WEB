import React, { useState } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { enviarRegistroInvitado } from "../services/api.ts";
import { useNavigate } from 'react-router-dom';

interface FormData {
    fullName: string;
    email: string;
    team: string;
    interests: string[];
    experienceLevel: string;
    agreedToTerms: boolean;
}

const INTEREST_OPTIONS = [
    'Inteligencia artificial',
    'Diseño de producto',
    'Desarrollo de software',
    'Automatización',
    'Data analytics',
    'Innovación y estrategia',
];

const EXPERIENCE_LEVELS = [
    'Junior (0-2 años)',
    'Mid-level (2-5 años)',
    'Senior (5+ años)',
    'Líder / Manager',
];

export const RegistroMakers: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        team: '',
        interests: [],
        experienceLevel: '',
        agreedToTerms: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [generalError, setGeneralError] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Ajustado para manejar correctamente el tipo checkbox
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        setErrors({ ...errors, [name]: '' });
        if (generalError) setGeneralError('');
    };

    const toggleInterest = (interest: string) => {
        setFormData((prev) => {
            const exists = prev.interests.includes(interest);
            return {
                ...prev,
                interests: exists
                    ? prev.interests.filter((item) => item !== interest)
                    : [...prev.interests, interest],
            };
        });
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Campo requerido';
        if (!formData.email.trim()) newErrors.email = 'Campo requerido';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = 'Correo inválido';
        if (!formData.team) newErrors.team = 'Campo requerido';
        if (formData.interests.length === 0) newErrors.interests = 'Campo requerido';
        if (!formData.experienceLevel.trim())
            newErrors.experienceLevel = 'Campo requerido';
        if (!formData.agreedToTerms)
            newErrors.agreedToTerms = 'Campo requerido';
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setGeneralError('Es necesario que introduzcas todos los datos para seguir adelante');
            return;
        }
        setGeneralError('');

        try {
            setLoading(true);
            setError('');
            const registroCompleto = {
                nombre: formData.fullName,
                correo: formData.email,
                equipo: formData.team, // Corregido: antes enviaba formData.email aquí
                intereses: formData.interests,
                nivelExperiencia: formData.experienceLevel,
                aceptoTerminos: formData.agreedToTerms,
                fechaSalida: '',
                fechaRegreso: '',
                numeroReservacion: '',
                actividades: []
            };
            await enviarRegistroInvitado(registroCompleto);
            navigate('/inicio');
        } catch (err: any) {
            console.error('Error enviando registro:', err);
            setError(err.message || 'Error al enviar el registro. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full min-h-screen py-12 px-4 flex justify-center items-center bg-[#0b0c10]">
            <div className="w-full max-w-xl rounded-2xl border border-gray-800 bg-[#121318] p-6 text-gray-200 shadow-xl md:p-8">

                {/* Botón de Regreso */}
                <button
                    onClick={() => navigate('/inicio')}
                    className="flex items-center gap-2 mb-6 text-sm text-gray-400 hover:text-white transition-colors group cursor-pointer bg-transparent border-none p-0"
                >
                    <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    Volver a la página principal
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
                        Únete a la comunidad
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Completa tu información para conectar con otros makers de Totalplay.
                    </p>
                </div>

                {/* Nombre completo */}
                <div className="mb-4">
                    <label className="mb-1.5 block text-xs font-medium text-gray-300">
                        Nombre completo <span className="text-pink-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Nombre completo"
                        className="w-full rounded-xl border border-gray-800 bg-[#1a1b22] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                    />
                    {errors.fullName && (
                        <span className="text-red-400 text-xs font-montserrat px-1 block mt-1">{errors.fullName}</span>
                    )}
                </div>

                {/* Correo corporativo */}
                <div className="mb-4">
                    <label className="mb-1.5 block text-xs font-medium text-gray-300">
                        Correo corporativo <span className="text-pink-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Correo corporativo"
                        className="w-full rounded-xl border border-gray-800 bg-[#1a1b22] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                    />
                    {errors.email && (
                        <span className="text-red-400 text-xs font-montserrat px-1 block mt-1">{errors.email}</span>
                    )}
                </div>

                {/* Área o equipo */}
                <div className="mb-4">
                    <label className="mb-1.5 block text-xs font-medium text-gray-300">
                        Área o equipo <span className="text-pink-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="team"
                        value={formData.team}
                        onChange={handleInputChange}
                        placeholder="Área o equipo"
                        className="w-full rounded-xl border border-gray-800 bg-[#1a1b22] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors"
                    />
                    {errors.team && (
                        <span className="text-red-400 text-xs font-montserrat px-1 block mt-1">{errors.team}</span>
                    )}
                </div>

                {/* Intereses */}
                <div className="mb-4">
                    <label className="mb-2 block text-xs font-medium text-gray-300">
                        Intereses <span className="text-pink-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {INTEREST_OPTIONS.map((interest) => {
                            const isSelected = formData.interests.includes(interest);
                            return (
                                <button
                                    key={interest}
                                    type="button"
                                    onClick={() => toggleInterest(interest)}
                                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 border cursor-pointer ${
                                        isSelected
                                            ? 'border-pink-500 bg-pink-500/10 text-pink-400'
                                            : 'border-gray-800 bg-[#1a1b22] text-gray-300 hover:border-gray-700'
                                    }`}
                                >
                                    {interest}
                                </button>
                            );
                        })}
                    </div>
                    {errors.interests && (
                        <span className="text-red-400 text-xs font-montserrat px-1 block mt-1">{errors.interests}</span>
                    )}
                </div>

                {/* Nivel de experiencia */}
                <div className="mb-6">
                    <label className="mb-1.5 block text-xs font-medium text-gray-300">
                        Nivel de experiencia <span className="text-pink-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleInputChange}
                            className="w-full appearance-none rounded-xl border border-gray-800 bg-[#1a1b22] px-4 py-3 pr-10 text-sm text-gray-300 focus:border-pink-500 focus:outline-none transition-colors cursor-pointer"
                        >
                            <option value="" disabled>
                                Selecciona tu nivel
                            </option>
                            {EXPERIENCE_LEVELS.map((level) => (
                                <option key={level} value={level} className="bg-[#1a1b22] text-white">
                                    {level}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                    {errors.experienceLevel && (
                        <span className="text-red-400 text-xs font-montserrat px-1 block mt-1">{errors.experienceLevel}</span>
                    )}
                </div>

                {/* Checkbox Términos */}
                <div className="flex items-start gap-3 mb-4">
                    <input
                        type="checkbox"
                        id="agreedToTerms"
                        name="agreedToTerms"
                        checked={formData.agreedToTerms}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded border-gray-700 bg-[#1a1b22] text-pink-500 focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="agreedToTerms" className="text-xs text-gray-400 leading-relaxed cursor-pointer select-none">
                        Acepto el aviso de privacidad de Totalplay y el uso de mis datos para la comunidad Total Makers. <span className="text-pink-500">*</span>
                    </label>
                </div>
                {errors.agreedToTerms && (
                    <span className="text-red-400 text-xs font-montserrat px-1 block mb-4">{errors.agreedToTerms}</span>
                )}

                {/* Errores Generales */}
                {generalError && (
                    <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                        <p className="text-red-400 text-xs font-montserrat text-center">{generalError}</p>
                    </div>
                )}

                {error && (
                    <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                        <p className="text-red-400 text-xs font-montserrat text-center">{error}</p>
                    </div>
                )}

                {/* Botón Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Enviando...' : 'Enviar registro'}
                </button>

            </div>
        </section>
    );
};

export default RegistroMakers;