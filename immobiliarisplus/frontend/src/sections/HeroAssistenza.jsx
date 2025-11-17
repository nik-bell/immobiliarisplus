import Hero from "../components/Hero";

import HeroImage from "../assets/assistenza-immobiliaris.jpeg"




export default function HeroAssistenza() {
    return (
        <div className="min-h-[60vh]">
            <Hero
                backgroundImage={HeroImage}
                className="min-h-[60vh] lg:min-h-[60vh]"
            >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
                    Assistenza
                </h1>
                <p className="text-xl md:text-2xl font-light mb-5 text-white opacity-90">
                    Siamo qui per aiutarti
                </p>
            </Hero>
        </div >
    )
}