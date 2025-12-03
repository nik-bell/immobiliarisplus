import NotFoundImage from "../assets/image-page-not-found.png";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-[20px]">
        <img
          src={NotFoundImage}
          alt="Robot confuso con cartello For Sale - Pagina non trovata"
          className="pt-[10px] min-w-[300px] md:min-w-[400px] lg:min-w-[450px] h-auto block"
        />
      </div>

      <h1 className="text-sm font-light text-gray-900 mb-[10px]">Oops, pagina non trovata!</h1>

      <p className="text-gray-500 max-w-[600px] mb-[30px]">
        Sembra che l'indirizzo che stavi cercando non esista più, o sia
        sbagliato. Non preoccuparti, ti aiutiamo a ritrovare la strada! La casa
        dei tuoi sogni è sicuramente altrove.
      </p>

      <div className="flex flex-col gap-[10px] w-full max-w-[300px] justify-center md:flex-row gap-[20px] md:w-auto md:max-w-none">
        <Link
          to='/'
          className=" px-6 py-3
                      bg-yellow-400 text-gray-900
                      font-semibold text-base
                      rounded-lg
                      shadow-md
                      hover:bg-yellow-300 hover:shadow-lg
                      transition duration-150 ease-in-out
                      focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50">
          Torna alla Home
        </Link>

        <Link
          to='/valuta-casa'
          className="px-6 py-3
                      bg-yellow-400 text-gray-900
                      font-semibold text-base
                      rounded-lg
                      shadow-md
                      hover:bg-yellow-300 hover:shadow-lg
                      transition duration-150 ease-in-out
                      focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
        >
          Valuta casa
        </Link>

        <Link
          to='/contattaci'
          className="px-6 py-3
                  bg-teal-700 text-white
                  font-semibold text-base
                  rounded-lg
                  shadow-md
                  hover:bg-teal-500 hover:shadow-lg
                  transition duration-150 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
        >
          Contattaci Subito
        </Link>
      </div>

      <p className="text-sm text-gray-400 py-8">Se hai cliccato un link rotto, segnalacelo!</p>
    </div>
  );
}

export default NotFoundPage;
