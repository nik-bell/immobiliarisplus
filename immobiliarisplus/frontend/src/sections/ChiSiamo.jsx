import BulletPointImg from "../components/BulletPointImg";
import PrimoAgente from "../assets/primo-agente.jpg";
import SecondoAgente from "../assets/secondo-agente.jpg";
import TerzoAgente from "../assets/terzo-agente.jpg";
import QuartoAgente from "../assets/quarto-agente.jpg";
import Card from '../components/Card';

/**
 * @typedef {Object} TeamMember
 * @property {string} imgSrc - Percorso dell'immagine dell'agente.
 * @property {string} title - Nome e ruolo della persona.
 * @property {string} description - Descrizione breve dell’esperienza o mansione.
 */

/** @type {TeamMember[]} */
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

/**
 * ChiSiamo Component
 *
 * Sezione "Chi Siamo" che presenta il team con immagini, ruoli e descrizioni.
 * Utilizza Card + BulletPointImg per mostrare ogni membro dello staff
 * con una struttura visiva coerente e responsiva.
 *
 * @returns {JSX.Element} Sezione informativa sulla squadra di Immobiliaris Plus.
 */
const ChiSiamo = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Chi Siamo
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed text-center">
          Siamo Immobiliaris Plus, un team di <strong className="font-semibold text-indigo-900">esperti immobiliari </strong>
          radicati nelle principali città del <strong className="font-semibold text-indigo-900">Piemonte </strong>
          — da <strong className="font-semibold text-indigo-900">Torino</strong> a <strong className="font-semibold text-indigo-900">Cuneo</strong>,
          da <strong className="font-semibold text-indigo-900">Alessandria</strong> ad <strong className="font-semibold text-indigo-900">Asti</strong>.
          La nostra forza è unire una profonda conoscenza del <strong className="font-semibold text-indigo-900">mercato locale </strong>
          con una visione digitale e innovativa. Non siamo la solita <strong className="font-semibold text-indigo-900">agenzia immobiliare</strong>:
          utilizziamo analisi dati avanzate e processi snelli per garantirti la migliore esperienza di
          <strong className="font-semibold text-indigo-900"> vendita casa</strong>, supportata da professionisti qualificati.
          La nostra missione è offrire un servizio trasparente, efficiente e focalizzato sull'ottenimento del
          <strong className="font-semibold text-indigo-900"> massimo valore</strong> per il tuo immobile.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 ">
          {chiSiamoData.map((item, index) => (
            <Card
              key={index}
              /** Card styling per la sezione team */
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-indigo-900"
            >
              <BulletPointImg
                imgSrc={item.imgSrc}
                title={item.title}
                description={item.description}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChiSiamo;
