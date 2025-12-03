import { useReducer, useState } from "react";
import FormContext from "../store/FormContext";
import validateStep1 from "../pages/ValutaCasa/validators/validateStep1";
import validateStep2 from "../pages/ValutaCasa/validators/validateStep2";
import validateStep3 from "../pages/ValutaCasa/validators/validateStep3";
import { createValuation } from "../api/api";
import { mapPropertyTypeToEnum, mapPropertyConditionToEnum } from "../utils/mappers";
import { useCallback } from "react";

const initialState = {
  step: 1,

  // ---- STEP 1 ----
  property: {
    address: "",
    zipCode: "",
    city: "",
    propertyType: "",
    condition: "",
    sizeMq: "",
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
  submitMessage: "", 
  isSubmitted: false, // Flag to know if the form has been submitted
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

  // ------ VALIDATOR BY STEP ------
  const validateCurrentStep = useCallback(() => {
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
  }, [state.step, state.property, state.details, state.contact]);

  const nextStep = useCallback(() => {
    if (validateCurrentStep()) {
      dispatch({ type: "NEXT_STEP" });
    }
  }, [validateCurrentStep]);

  const prevStep = useCallback(() => dispatch({ type: "PREV_STEP" }), []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = useCallback(async () => {
    // Validate step 3
    if (!validateCurrentStep()) {
      return;
    }

    // Create JSON object with all data
    const formData = {
      property: state.property,
      details: state.details,
      contact: state.contact,
    };

    setLoading(true);
    setError(null);
    try {
      // NORMALIZE: coerce numeric fields to numbers (backend often expects numbers, not strings)

      const payload = {
        property: {
          ...formData.property,
          // send sizeMq as numeric float to backend
          sizeMq: formData.property.sizeMq ? parseFloat(formData.property.sizeMq) : null,
          // compatibility: also include the legacy field name `surfaceM2` in numeric form
          surfaceM2: formData.property.sizeMq ? parseFloat(formData.property.sizeMq) : null,
          // map to backend enums
          propertyType: mapPropertyTypeToEnum(formData.property.propertyType),
          condition: mapPropertyConditionToEnum(formData.property.condition),
        },
        details: {
          ...formData.details,
          rooms: formData.details.rooms ? Number(formData.details.rooms) : null,
          bathrooms: formData.details.bathrooms ? Number(formData.details.bathrooms) : null,
          floor: formData.details.floor ? Number(formData.details.floor) : null,
        },
        contact: {
          ...formData.contact,
          privacyAccepted: !!formData.contact.privacyAccepted,
        },
      };

      // Backend call (POST /api/valuations/calculate)
      const resp = await createValuation(payload);

      if (!resp) {
        // createValuation returns null on error
        throw new Error("Nessuna risposta valida dal server");
      }

      // Prepare success message. If API returns a range/price, show it.
      const baseMessage = `Grazie ${state.contact.name} ${state.contact.surname}! La tua richiesta è stata inviata con successo.`;
      const range = resp.valuationRange || resp.recommendedPrice || resp.range || null;
      const fullMessage = range ? `${baseMessage} Valutazione stimata: ${JSON.stringify(range)}` : baseMessage;

      dispatch({ type: "SET_SUBMIT_MESSAGE", payload: fullMessage });
      dispatch({ type: "SET_SUBMITTED" });
    } catch (err) {
      setError(err.message || "Errore durante l'invio della richiesta");
      dispatch({ type: "SET_SUBMIT_MESSAGE", payload: "Errore durante l'invio della richiesta." });
    } finally {
      setLoading(false);
    }
  }, [state.contact, state.details, state.property]);

  return (
    <FormContext.Provider
      value={{
        state,
        dispatch,
        validateCurrentStep,
        nextStep,
        prevStep,
        submitForm,
        loading,
        error,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
