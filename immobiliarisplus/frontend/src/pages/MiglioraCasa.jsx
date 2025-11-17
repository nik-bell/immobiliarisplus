import HeroMiglioraCasa from "../sections/HeroMiglioraCasa";
import Note from "../components/Note";

function MiglioraCasa() {
  return (
    <>
      <HeroMiglioraCasa />
      <div className="container">
        <Note className="border border-indigo-900 border-l-4 bg-gray-100 p-4 rounded-lg shadow-sm my-4"> Questi sono esempi di migliorie che possiamo offrire. Per usufruirne, clicca su "Richiedi consulenza" oppure fai una richiesta di preventivo tramite il form di valutazione.</Note>
      </div>
    </>
  )
}

export default MiglioraCasa;
