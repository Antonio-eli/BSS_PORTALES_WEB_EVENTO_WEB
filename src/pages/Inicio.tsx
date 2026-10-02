import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HotelInfo from '../components/HotelInfo';
import ResortMap from '../components/ResortMap';
import DressCode from '../components/DressCode';
import Itinerario from '../components/Itinerario';
import CTAFinal from '../components/CTAFinal';
import GaleriaMomentos from '../components/GaleriaMomentos';

const Inicio = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <HotelInfo />
            <Itinerario />
            <DressCode />
            <ResortMap />
            <CTAFinal />
            <GaleriaMomentos />
        </div>
    );
};

export default Inicio;