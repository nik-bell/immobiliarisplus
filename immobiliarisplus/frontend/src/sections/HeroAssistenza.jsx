import Hero from "../components/Hero";
import HeroImageJpg from "../assets/assistenza/assistenza-immobiliaris.jpeg";
import HeroImageWebp from "../assets/assistenza/assistenza-immobiliaris.webp";
import HeroImageAvif from "../assets/assistenza/assistenza-immobiliaris.avif";

/**
 * HeroAssistenza Component
 *
 * Sezione hero dedicata alla pagina Assistenza.  
 * Mostra un'immagine full-width con testo centrato e responsive.
 *
 * @returns {JSX.Element} Il blocco hero con immagine e testo.
 */
export default function HeroAssistenza() {
    return (
        <div className="min-h-[70vh]">
            <Hero
                backgroundImage={HeroImageJpg}
                backgroundImageWebp={HeroImageWebp}
                backgroundImageAvif={HeroImageAvif}
                className="min-h-[70vh] lg:min-h-[70vh]"
            >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
                    Assistenza
                </h1>
                <p className="text-xl md:text-2xl font-light mb-5 text-white opacity-90">
                    Siamo qui per aiutarti
                </p>
            </Hero>
        </div>
    );
}
