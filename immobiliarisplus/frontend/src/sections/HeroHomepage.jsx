import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import HeroImageJpg from "../assets/homepage/homepage-immobiliaris.jpeg";
import HeroImageWebp from "../assets/homepage/homepage-immobiliaris.webp";
import HeroImageAvif from "../assets/homepage/homepage-immobiliaris.avif";



export default function HeroHomepage() {
    return (
        <div className="min-h-[90vh]">
            <Hero
                backgroundImage={HeroImageJpg}
                backgroundImageWebp={HeroImageWebp}
                backgroundImageAvif={HeroImageAvif}
                className="min-h-[90vh] lg:min-h-[90vh]"
            >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
                    Vendi casa con più tranquillità
                </h1>
                <p className="text-xl md:text-2xl font-light mb-5 text-white opacity-90">
                    Trasparenza, velocità e controllo in ogni fase della vendita
                </p>
                <div className="flex gap-3 justify-center mt-6 flex-wrap">
                    <Link
                        to='/valuta-casa'
                        className="
                            px-6 py-3
                            bg-teal-700 text-white
                            font-semibold text-base
                            rounded-lg
                            shadow-md
                            hover:bg-teal-400 hover:shadow-lg
                            transition duration-150 ease-in-out
                            focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
                    >
                        Valuta casa in 3 step
                    </Link>
                    <Link
                        to="/contattaci"
                        className="
                            px-6 py-3
                            bg-yellow-400 text-gray-900
                            font-semibold text-base
                            rounded-lg
                            shadow-md
                            hover:bg-yellow-300 hover:shadow-lg
                            transition duration-150 ease-in-out
                            focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
                    >
                        Parla con un esperto
                    </Link>
                </div>
            </Hero>
        </div >
    )
}
