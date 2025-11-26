import BulletPointImg from "../components/BulletPointImg";
import PrimoAgente from "../assets/primo-agente.jpg";
import SecondoAgente from "../assets/secondo-agente.jpg";
import TerzoAgente from "../assets/terzo-agente.jpg";
import QuartoAgente from "../assets/quarto-agente.jpg";

const chiSiamoData = [
  {
    imgSrc: PrimoAgente,
    title: "Mario Rossi",
    description: "Fondatore e CEO, con 15 anni di esperienza nel settore immobiliare."
  },
  {
    imgSrc: SecondoAgente,
    title: "Laura Bianchi",
    description: "Responsabile marketing, cura la comunicazione e le strategie digitali."
  },
  {
    imgSrc: TerzoAgente,
    title: "Giulia Verdi",
    description: "Agente senior, supporta i clienti durante tutto il processo di vendita."
  },
  {
    imgSrc: QuartoAgente,
    title: "Luca Neri",
    description: "Specialista valutazioni immobiliari e analisi di mercato."
  }
];

const ChiSiamo = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Chi siamo
        </h2>
        <p className="text-gray-600 text-center mb-12">
          La nostra missione è rendere la vendita o l'acquisto della tua casa semplice e sicuro.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chiSiamoData.map((item, index) => (
            <BulletPointImg
              key={index}
              imgSrc={item.imgSrc}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChiSiamo;
