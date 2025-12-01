import HeroMiglioraCasa from "../sections/HeroMiglioraCasa";
import Note from "../components/Note";
import CtaMigliora from "../sections/CtaMigliora";
import StatCard from "../sections/StatCard";
import ImprovementCard from "../sections/ImprovementCard";
import improvementData from "../data/ImprovementData";
import { Link } from "react-router-dom";

function MiglioraCasa() {
  return (
    <>
      <HeroMiglioraCasa />
      <div className="container ">
        <Note className="border border-indigo-900 border-l-4 bg-gray-100 p-4 rounded-lg shadow-sm my-6"> Questi sono esempi di migliorie che possiamo offrire. Per usufruirne, clicca su "Richiedi consulenza" oppure fai una richiesta di preventivo tramite il form di valutazione.</Note>
        <StatCard />
        <div className="pt-6">
          {improvementData.map(item => (
            <ImprovementCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              stats={item.stats}
              impactValue={item.impactValue}
            />
          ))}
        </div>
        <CtaMigliora />
    
        <div className="flex justify-center mb-4">
          <Link 
            to= '/contattaci'
            className="
                  px-6 py-3
                  bg-teal-700 text-white
                  font-semibold text-base
                  rounded-lg
                  shadow-md
                  hover:bg-teal-400 hover:shadow-lg
                  transition duration-150 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
          >
            Richiedi consulenza
          </Link>
        </div>
      </div>
    </>
  )
}

export default MiglioraCasa;
