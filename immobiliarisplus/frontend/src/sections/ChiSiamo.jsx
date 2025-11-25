import BulletPointImg from "../components/BulletPointImg";

const chiSiamoData = [
  {
    imgSrc: "https://th.bing.com/th/id/OIP.LjSMIAtg8P_h13e-XlnoGAHaEK?w=307&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
    title: "Mario Rossi",
    description: "Fondatore e CEO, con 15 anni di esperienza nel settore immobiliare."
  },
  {
    imgSrc: "https://th.bing.com/th/id/OIP.KfEy8OTT2LG3jec7Dd7pbwHaE8?w=223&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
    title: "Laura Bianchi",
    description: "Responsabile marketing, cura la comunicazione e le strategie digitali."
  },
  {
    imgSrc: "https://th.bing.com/th/id/OIP.QP3qEw8hDF5zo6DYMfr6DQHaD3?w=285&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
    title: "Giulia Verdi",
    description: "Agente senior, supporta i clienti durante tutto il processo di vendita."
  },
  {
    imgSrc: "https://th.bing.com/th/id/OIP.U0RMRqIszPKcI7pnd6eCdwHaGn?w=205&h=183&c=7&r=0&o=7&pid=1.7&rm=3",
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
