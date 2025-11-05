import '../App.css';
import NotFoundImage from '../assets/image-page-not-found.png';

const NotFoundPage = () => {
    const handleNavigate = (path) => {
        console.log(`Navigazione a: ${path}`);
    };

    return (
        <div className='not-found-container'>
            
            <div className="illustration-container">
                 <img 
                    src={NotFoundImage} 
                    alt="Robot confuso con cartello For Sale - Pagina non trovata" 
                    className="illustration-image"
                 />
            </div>

            <h1 className="not-found-title">
                Oops, pagina non trovata!
            </h1>

            <p className="not-found-subtitle">
                Sembra che l'indirizzo che stavi cercando non esista più, o sia sbagliato. Non preoccuparti, ti aiutiamo a ritrovare la strada! La casa dei tuoi sogni è sicuramente altrove.
            </p>

            <div className="button-container">
                
                <button 
                    className="not-found-button button-primary"
                    onClick={() => handleNavigate('/')}
                >
                    Torna alla Home
                </button>

                <button 
                    className="not-found-button button-primary"
                    onClick={() => handleNavigate('/valuta-casa')}
                >
                    Valuta casa
                </button>

                <button 
                    className="not-found-button button-secondary"
                    onClick={() => handleNavigate('/assistenza')}
                >
                    Contattaci Subito
                </button>
            </div>
            
            <p className="not-found-p">
                Se hai cliccato un link rotto, segnalacelo!
            </p>
        </div>
    );
};

export default NotFoundPage;