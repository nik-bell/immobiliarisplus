import HeroContrattoEsclusiva from "../sections/HeroContrattoEsclusiva";
import SpiegazioneContratto from '../sections/SpiegazioneContratto';
import PercheScegliereEsclusiva from '../sections/PercheScegliereEsclusiva';
import ComeFunzionaContratto from "../sections/ComeFunzionaContratto";
import InclusioneContratto from "../sections/InclusioneContratto";
import FAQContratto from "../sections/FAQContratto";
import Note from "../components/Note";
import CtaContratto from "../sections/CtaContratto";

function ContattoEsclusiva() {
    return (
        <>
            <HeroContrattoEsclusiva />
            <div className="container xl:px-32">
                <SpiegazioneContratto />
                <PercheScegliereEsclusiva />
                <ComeFunzionaContratto />
                <InclusioneContratto />
                <FAQContratto />
                <Note className="border border-indigo-900 border-l-4 bg-gray-100 p-4 rounded-lg shadow-sm my-6"> Prima di firmare qualsiasi contratto, ti consigliamo di leggerlo attentamente e, se necessario, farlo visionare da un legale di fiducia. La trasparenza è alla base del nostro lavoro.</Note>
                <CtaContratto />
            </div>
        </>
    )
}

export default ContattoEsclusiva;