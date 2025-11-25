import HeroContrattoEsclusiva from "../sections/HeroContrattoEsclusiva";
import SpiegazioneContratto from '../sections/SpiegazioneContratto';
import PercheScegliereEsclusiva from '../sections/PercheScegliereEsclusiva';

function ContattoEsclusiva() {
    return (
        <>
            <HeroContrattoEsclusiva />
            <div className="container xl:px-32">
                <SpiegazioneContratto />
                <PercheScegliereEsclusiva />
            </div>
        </>
    )
}

export default ContattoEsclusiva;