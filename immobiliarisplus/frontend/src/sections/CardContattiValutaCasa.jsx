import Card from '../components/Card'
import IconCall from "../assets/icone/call/call_nero/call_nero.svg";
import IconEmail from "../assets/icone/mail/mail_nero/mail_nero.svg";

export default function CardContattiValutaCasa() {
    return (
        <div className="flex flex-wrap justify-center gap-6 p-4">
            <Card className="flex-1 min-w-[280px] p-6 rounded-xl shadow-md border border-gray-100 text-center bg-white hover:shadow-lg transition duration-200">
                <div className="w-8 h-8 mx-auto mb-3 text-teal-500">
                    <img
                        src={IconCall}
                        alt='Chiamaci al +39 02 1234 5678'
                    />
                </div>
                <p className="text-lg font-medium mb-1">
                    Chiamaci ora
                </p>

                <p className="font-semibold text-gray-800 mt-3 mb-1">
                    +39 02 1234 5678
                </p>
                <p className="text-sm text-gray-500">
                    Lun-Ven 9:00-18:00
                </p>
            </Card>
            <Card className="flex-1 min-w-[280px] p-6 rounded-xl shadow-md border border-gray-100 text-center bg-white hover:shadow-lg transition duration-200">

                <div className="w-8 h-8 mx-auto mb-3 text-indigo-700">
                    <img
                        src={IconEmail}
                        alt='Scrivici a info@immobiliarisplus.com'
                    />
                </div>
                <p className="text-lg font-medium mb-1">
                    Scrivici una mail
                </p>
                <p className="font-semibold text-gray-800 mt-3 mb-1">
                    Risposta immediata
                </p>
                <p className="text-sm text-gray-500">
                    info@immobiliarisplus.com
                </p>
            </Card>
        </div>
    );
}