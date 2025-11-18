import Hero from "../components/Hero";
import Button from "../components/Button";
import HeroImage from "../assets/homepage-immobiliaris.jpeg"




export default function HeroHomepage() {
    const handleValutazione = () => {
    };
    return (
        <div className="min-h-[80vh]">
            <Hero
                backgroundImage={HeroImage}
                className="min-h-[60vh] lg:min-h-[80vh]"
            >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
                    Vendi casa con più tranquillità
                </h1>
                <p className="text-xl md:text-2xl font-light mb-5 text-white opacity-90">
                    Trasparenza, velocità e controllo in ogni fase della vendita
                </p>
                <div className="flex gap-3 justify-center mt-6 flex-wrap">
                    <Button
                        onClick={handleValutazione}
                        className="
                            px-6 py-3
                            bg-blue-600 text-white
                            font-semibold text-base
                            rounded-lg
                            shadow-md
                            hover:bg-blue-700 hover:shadow-lg
                            transition duration-150 ease-in-out
                            focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
                    >
                        Valuta casa in 3 step
                    </Button>
                    <Button
                        onClick={handleValutazione}
                        className="
                            px-6 py-3
                            bg-white/20 text-white
                            font-semibold text-base
                            rounded-lg
                            shadow-md
                            backdrop-blur
                            hover:bg-white/30 hover:shadow-lg
                            transition duration-150 ease-in-out
                            focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-opacity-50"
                    >
                        Parla con un esperto
                    </Button>
                </div>
            </Hero>
        </div >
    )
}
