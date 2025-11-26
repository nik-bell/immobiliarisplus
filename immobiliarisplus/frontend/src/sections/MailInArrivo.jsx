import Card from '../components/Card';
import { ContractItem } from '../components/ContractItem';

const MailInArrivo = () => {
    return (
        <div >
            <Card className="bg-white rounded-xl shadow-lg p-8 mx-auto border-l-4 border-l-indigo-900">

                <div className="flex flex-wrap items-center mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-indigo-900 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Mail di riepilogo in arrivo
                    </h2>
                    <p className='pt-2 text-sm font-light'>Entro le prossime ore riceverai una mail all'indirizzo fornito con:</p>
                </div>

                <div className="pl-4">
                    <ContractItem
                        text="Riepilogo completo dei dati inseriti"
                    />
                    <ContractItem
                        text="Range di valutazione preliminare"
                    />
                    <ContractItem
                        text="Contatti del tuo agente dedicato"
                    />
                </div>
            </Card>
        </div>
    );
};

export default MailInArrivo;