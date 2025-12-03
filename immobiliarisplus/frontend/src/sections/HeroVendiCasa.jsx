import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import HeroImageJpg from "../assets/vendi-casa/vendi-casa-immobiliaris.jpeg";
import HeroImageWebp from "../assets/vendi-casa/vendi-casa-immobiliaris.webp";
import HeroImageAvif from "../assets/vendi-casa/vendi-casa-immobiliaris.avif";

/**
 * HeroVendiCasa Component
 *
 * Sezione hero principale della pagina "Vendi Casa".
 * Mostra un'immagine full-width responsive, un titolo motivazionale e
 * una call-to-action che reindirizza alla pagina di valutazione dell'immobile.
 *
 * @returns {JSX.Element} Il componente visivo della sezione hero dedicata alla vendita casa.
 */
export default function HeroVendiCasa() {
    return (
        <div className="min-h-[80vh]">
            <Hero
                backgroundImage={HeroImageJpg}
                backgroundImageWebp={HeroImageWebp}
                backgroundImageAvif={HeroImageAvif}
                className="min-h-[80vh] lg:min-h-[80vh]"
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
    );
}
