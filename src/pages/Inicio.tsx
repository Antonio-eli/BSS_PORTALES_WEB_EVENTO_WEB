import Navbar from '../components/Navbar';
import HeroMakers from '../components/HeroMakers';
import TotalMakers from "../components/TotalMakers.tsx";
import VideoMakers from "../components/VideoMakers.tsx";
import VocesMakers from "../components/VocesMakers.tsx";
import AgendaMakers from "../components/AgendaMakers.tsx";
import BanderaMakers from "../components/BanderaMakers.tsx";
import InsigniasMakers from "../components/InsigniasMakers.tsx";
import ComunidadMakers from "../components/ComunidadMakers.tsx";
import HistoriasMakers from "../components/HistoriasMakers.tsx";
import AsistenteMakers from "../components/AsistenteMakers.tsx";

const Inicio = () => {
    return (
        <div className="min-h-screen">
            <Navbar />

            <div id="evento">
                <HeroMakers />
                <TotalMakers />
            </div>

            <div id="historias">
                <HistoriasMakers />
            </div>

            <div id="experiencia">
                <VideoMakers />
                <VocesMakers />
            </div>

            <div id="agenda">
                <AgendaMakers />
                <BanderaMakers />
            </div>

            <div id="insignias">
                <InsigniasMakers />
            </div>

            <div id="comunidad">
                <ComunidadMakers />
            </div>

            {/* Asistente de IA flotante (esquina inferior derecha) */}
            <AsistenteMakers />
        </div>
    );
};

export default Inicio;