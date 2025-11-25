import Hero from "../components/Hero";

import HeroImage from "../assets/contratto-esclusiva.jpeg"




export default function HeroContrattoEsclusiva() {
    return (
        <div className="min-h-[60vh]">
            <Hero
                backgroundImage={HeroImage}
                className="min-h-[60vh] lg:min-h-[60vh]"
            >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
                    Come funziona il contratto di vendita in esclusiva
                </h1>
                <p className="text-xl md:text-2xl font-light mb-5 text-white opacity-90">
                    Tutto quello che devi sapere per vendere casa con trasparenza e sicurezza
                </p>
            </Hero>
        </div >
    )
}