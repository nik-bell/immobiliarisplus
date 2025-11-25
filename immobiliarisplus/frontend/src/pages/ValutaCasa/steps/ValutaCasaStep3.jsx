import useValutaCasaForm from "../useValutaCasaForm";
import NavigationButtons from "../NavigationButtons";


export default function ValutaCasaStep3() {
  const { state, dispatch } = useValutaCasaForm();
  const c = state.contact;

  const isChecked = c.privacyAccepted;
  const hasError = state.errors.privacyAccepted;

  const textClasses = `
  text-base leading-relaxed 
  ${isChecked ? 'font-normal' : 'font-semibold'}
`;

  const handleChange = (e) => {
    const checked = e.target.checked;

    dispatch({
      type: "UPDATE_CONTACT",
      payload: { privacyAccepted: checked },
    });

    if (hasError && checked) {
      dispatch({
        type: "SET_ERRORS",
        payload: { ...state.errors, privacyAccepted: '' }
      });
    }
  };

  if (state.isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold pb-2">Conferma Invio</h2>
        <p className="text-green-600">{state.submitMessage}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold pb-2">I tuoi contatti</h2>
      <p className="pb-4">Dove possiamo inviarti la valutazione dettagliata?</p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nome *</label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
          value={c.name}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_CONTACT",
              payload: { name: e.target.value },
            })
          }
          placeholder="Mario"
        />
        {state.errors.name && (
          <p className="text-sm text-red-600">{state.errors.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Cognome *</label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
          value={c.surname}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_CONTACT",
              payload: { surname: e.target.value },
            })
          }
          placeholder="Rossi"
        />
        {state.errors.surname && (
          <p className="text-sm text-red-600">{state.errors.surname}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email *</label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
          value={c.email}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_CONTACT",
              payload: { email: e.target.value },
            })
          }
          placeholder="mario.rossi@email.it"
        />
        {state.errors.email && (
          <p className="text-sm text-red-600">{state.errors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Telefono *</label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
          value={c.phone}
          type="number"
          onChange={(e) =>
            dispatch({
              type: "UPDATE_CONTACT",
              payload: { phone: e.target.value },
            })
          }
          placeholder="333 123 4567"
        />
        {state.errors.phone && (
          <p className="text-sm text-red-600">{state.errors.phone}</p>
        )}
      </div>

      <div className="mb-8">
        <label htmlFor="privacy-check" className="flex items-start gap-2 text-sm p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors duration-150">
          <input
            id="privacy-check"
            type="checkbox"
            checked={c.privacyAccepted}
            onChange={handleChange}
            className={`w-4 h-4 mt-1`}
          />
          <span className={`ml-1 ${textClasses}`}>
            Accetto la <a
              href="https://www.iubenda.com/privacy-policy/92486862"
              className="text-teal-500 hover:text-teal-600 underline"
              title="Privacy Policy"
              target="_blank"
            >
              Privacy Policy
            </a>,
            e autorizzo il trattamento dei miei dati personali per ricevere la valutazione <span className="text-red-600">*</span>
          </span>
        </label>

        {state.errors.privacyAccepted && (
          <p className="text-sm text-red-600 mt-1 ml-6">{state.errors.privacyAccepted}</p>
        )}
      </div>


      <NavigationButtons />


    </div>
  );
}