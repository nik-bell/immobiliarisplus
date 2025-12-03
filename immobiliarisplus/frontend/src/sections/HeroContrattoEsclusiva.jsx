import Hero from "../components/Hero";
import HeroImageJpg from "../assets/contratto-esclusiva/contratto-esclusiva.jpeg";
import HeroImageWebp from "../assets/contratto-esclusiva/contratto-esclusiva.webp";
import HeroImageAvif from "../assets/contratto-esclusiva/contratto-esclusiva.avif";

/**
 * HeroContrattoEsclusiva Component
 *
 * Sezione hero dedicata alla pagina sul contratto di vendita in esclusiva.
 * Mostra un'immagine a tutta larghezza con headline e sottotitolo.
 *
 * @returns {JSX.Element} Il componente hero con immagini ottimizzate e testo descrittivo.
 */
export default function HeroContrattoEsclusiva() {
    return (
        <div className="min-h-[80vh]">
            <Hero
                backgroundImage={HeroImageJpg}
                backgroundImageWebp={HeroImageWebp}
                backgroundImageAvif={HeroImageAvif}
                className="min-h-[80vh] lg:min-h-[80vh]"
            >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
                    Come funziona il contratto di vendita in esclusiva
                </h1>
                <p className="text-xl md:text-2xl font-light mb-5 text-white opacity-90">
                    Tutto quello che devi sapere per vendere casa con trasparenza e sicurezza
                </p>
            </Hero>
        </div>
    );
}
