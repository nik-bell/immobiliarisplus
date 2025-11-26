import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import HeroImage from "../assets/vendi-casa-immobiliaris.jpeg"


export default function HeroVendiCasa() {
    return (
        <div className="min-h-[80vh]">
            <Hero
                backgroundImage={HeroImage}
                className="min-h-[60vh] lg:min-h-[80vh]"
            >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
                    Vendi casa con noi
                </h1>
                <p className="text-xl md:text-2xl font-light mb-10 text-white opacity-90">
                    Il modo più smart per vendere il tuo immobile
                </p>
                <Link
                    to="/valuta-casa"
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
                    Inizia valutazione
                </Link>
            </Hero>
        </div >
    )
}