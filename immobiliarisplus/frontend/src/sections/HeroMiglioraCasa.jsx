import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import HeroImageJpg from "../assets/migliora-casa/migliora-casa-immobiliaris.jpg";
import HeroImageWebp from "../assets/migliora-casa/migliora-casa-immobiliaris.webp";
import HeroImageAvif from "../assets/migliora-casa/migliora-casa-immobiliaris.avif";


export default function HeroMiglioraCasa() {
    return (
        <div className="min-h-[80vh]">
            <Hero
                backgroundImage={HeroImageJpg}
                backgroundImageWebp={HeroImageWebp}
                backgroundImageAvif={HeroImageAvif}
                className="min-h-[80vh] lg:min-h-[80vh]"
            >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
                    Servizio "Migliora Casa"
                </h1>
                <p className="text-xl md:text-2xl font-light mb-5 text-white opacity-90">
                    Investi strategicamente per aumentare il valore del tuo immobile
                </p>
                <p className="text-xl md:text-2xl font-light mb-5 text-white opacity-90">
                    ROI medio: +140%
                </p>
                <Link
                    to='/contattaci'
                    className="
                            px-6 py-3
                            bg-yellow-400 text-black
                            font-semibold text-base
                            rounded-lg
                            shadow-md
                            hover:bg-yellow-300 hover:shadow-lg
                            transition duration-150 ease-in-out
                            focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
                >
                    Richiedi consulenza
                </Link>
            </Hero>
        </div >
    )
}