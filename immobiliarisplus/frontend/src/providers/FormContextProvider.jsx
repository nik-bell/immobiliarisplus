import { useReducer } from "react";
import FormContext from "../store/FormContext";
import validateStep1 from "../pages/ValutaCasa/validators/validateStep1";
import validateStep2 from "../pages/ValutaCasa/validators/validateStep2";
import validateStep3 from "../pages/ValutaCasa/validators/validateStep3";

const initialState = {
  step: 1,

  // ---- STEP 1 ----
  property: {
    address: "",
    propertyType: "",
    condition: "",
    surfaceM2: "",
  },

  // ---- STEP 2 ----
  details: {
    rooms: "",
    bathrooms: "",
    floor: "",
    features: {
      balcone: false,
      garage: false,
      giardino: false,
      parcheggio: false,
      terrazzo: false,
      ascensore: false,
      cantina: false,
    },
  },

  // ---- STEP 3 ----
  contact: {
    name: "",
    surname: "",
    email: "",
    phone: "",
    privacyAccepted: false,
  },

  errors: {},
  submitMessage: "", // Messaggio di conferma
  isSubmitted: false, // Flag per sapere se il form è stato inviato
};

function formReducer(state, action) {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };

    case "PREV_STEP":
      return { ...state, step: state.step - 1 };

    case "UPDATE_PROPERTY":
      return {
        ...state,
        property: { ...state.property, ...action.payload },
      };

    case "UPDATE_DETAILS":
      return {
        ...state,
        details: { ...state.details, ...action.payload },
      };

    case "UPDATE_FEATURES":
      return {
        ...state,
        details: {
          ...state.details,
          features: { ...state.details.features, ...action.payload },
        },
      };

    case "UPDATE_CONTACT":
      return {
        ...state,
        contact: { ...state.contact, ...action.payload },
      };

    case "SET_ERRORS":
      return { ...state, errors: action.payload };

    case "SET_SUBMIT_MESSAGE":
      return { ...state, submitMessage: action.payload };

    case "SET_SUBMITTED":
      return { ...state, isSubmitted: true };

    default:
      return state;
  }
}

export default function FormContextProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // ------ VALIDATORE A STEP ------
  function validateCurrentStep() {
    let result;

    if (state.step === 1) {
      result = validateStep1(state.property);
    } else if (state.step === 2) {
      result = validateStep2(state.details);
    } else if (state.step === 3) {
      result = validateStep3(state.contact);
    }

    dispatch({ type: "SET_ERRORS", payload: result.errors });
    return result.valid;
  }

  function nextStep() {
    if (validateCurrentStep()) {
      dispatch({ type: "NEXT_STEP" });
    }
  }

  function prevStep() {
    dispatch({ type: "PREV_STEP" });
  }

  function submitForm() {
    // Valida lo step 3
    if (!validateCurrentStep()) {
      return;
    }

    // Crea l'oggetto JSON con tutti i dati
    const formData = {
      property: state.property,
      details: state.details,
      contact: state.contact,
    };

    // Console.log
    console.log("Dati del form:", formData);

    // Mostra messaggio di conferma
    const message = `Grazie ${state.contact.name} ${state.contact.surname}! La tua richiesta è stata inviata con successo.`;
    dispatch({ type: "SET_SUBMIT_MESSAGE", payload: message });
    dispatch({ type: "SET_SUBMITTED" });
  }

  return (
    <FormContext.Provider
      value={{
        state,
        dispatch,
        validateCurrentStep,
        nextStep,
        prevStep,
        submitForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
