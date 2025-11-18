import React from "react";
import HeroHomepage from "../sections/HeroHomepage";

/* Feature Card */
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 text-center flex flex-col items-center">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="text-gray-600 text-sm mt-2">{description}</p>
  </div>
);

/* Step Card */
const StepCard = ({ number, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 text-center">
    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-yellow-600 text-white text-2xl font-bold">
      {number}
    </div>
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="text-gray-600 text-sm mt-2">{description}</p>
  </div>
);

const HomePage = () => {
  const featuresData = [
    {
      icon: "📈",
      title: "Valutazione precisa",
      description:
        "Algoritmo AVM basato su dati reali di mercato. Range accurato basato su zona e condizioni.",
    },
    {
      icon: "🔒",
      title: "Massima trasparenza",
      description:
        "Controlla ogni fase della vendita dalla tua dashboard personale.",
    },
    {
      icon: "⏱️",
      title: "Velocità garantita",
      description: "Valutazione in 72 ore. Lead prioritari in 24h.",
    },
    {
      icon: "📄",
      title: "Contratto digitale",
      description:
        "Clausole chiare, conformi alla normativa vigente. Firmi di persona o via raccomandata.",
    },
    {
      icon: "🏠",
      title: "Migliora il valore",
      description:
        "Consigli mirati per aumentare il valore del tuo immobile con stima ROI.",
    },
    {
      icon: "⭐",
      title: "Assistenza dedicata",
      description:
        "Agente personale, supporto chat e telefono durante orari lavorativi.",
    },
  ];

  const stepsData = [
    {
      number: 1,
      title: "Valuta la tua casa",
      description:
        "Compila il form in 3 minuti con i principali dati del tuo immobile.",
    },
    {
      number: 2,
      title: "Ricevi la valutazione",
      description:
        "In 72 ore ricevi una stima accurata e basata sui prezzi reali di mercato.",
    },
    {
      number: 3,
      title: "Vendi con noi",
      description:
        "Accedi al contratto e monitora tutto dalla tua dashboard.",
    },
  ];

  return (
    <>
      <HeroHomepage />
      <div className="w-full flex flex-col items-center">

        {/* FEATURES SECTION */}
        <section className="w-full max-w-6xl px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
            Perché scegliere ImmobiliarisPLUS
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mt-2">
            Un approccio innovativo per vendere casa senza stress
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {featuresData.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

        {/* STEPS SECTION */}
        <section className="w-full bg-gray-50 border-t border-gray-200 py-16 px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
            Come funziona
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mt-2">
            Tre semplici passaggi per vendere casa
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10">
            {stepsData.map((step) => (
              <StepCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
