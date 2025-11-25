import HeroContrattoEsclusiva from "../sections/HeroContrattoEsclusiva";
import SpiegazioneContratto from '../sections/SpiegazioneContratto';
import PercheScegliereEsclusiva from '../sections/PercheScegliereEsclusiva';
import ComeFunzionaContratto from "../sections/ComeFunzionaContratto";

function ContattoEsclusiva() {
    return (
        <>
            <HeroContrattoEsclusiva />
            <div className="container xl:px-32">
                <SpiegazioneContratto />
                <PercheScegliereEsclusiva />
                <ComeFunzionaContratto />
            </div>
        </>
    )
}

export default ContattoEsclusiva;