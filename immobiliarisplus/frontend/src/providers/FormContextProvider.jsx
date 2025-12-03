import { useReducer, useState } from "react";
import FormContext from "../store/FormContext";
import validateStep1 from "../pages/ValutaCasa/validators/validateStep1";
import validateStep2 from "../pages/ValutaCasa/validators/validateStep2";
import validateStep3 from "../pages/ValutaCasa/validators/validateStep3";
import { createValuation } from "../api/api";
import { mapPropertyTypeToEnum, mapPropertyConditionToEnum } from "../utils/mappers";
import { useCallback } from "react";

/**
 * Initial state for the multi-step valuation form.
 * Contains all data for step 1, 2, 3 + errors, submission flags.
 * @type {Object}
 */
const initialState = {
  step: 1,
  property: {
    address: "",
    zipCode: "",
    city: "",
    propertyType: "",
    condition: "",
    sizeMq: "",
  },
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
  contact: {
    name: "",
    surname: "",
    email: "",
    phone: "",
    privacyAccepted: false,
  },
  errors: {},
  submitMessage: "",
  isSubmitted: false,
};

/**
 * Reducer responsible for managing multi-step form state.
 *
 * @param {Object} state - Current form state.
 * @param {Object} action - Reducer action {type, payload}.
 * @returns {Object} Updated state.
 */
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

/**
 * Provides global state and handlers for the 3-step "Valuta Casa" form.
 * Handles:
 * - Step navigation
 * - Field updates
 * - Validation per step
 * - Submission with backend normalization
 * - Success/error handling
 *
 * Wrap components using `<FormContextProvider>...</FormContextProvider>`
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components that will access form context.
 * @returns {JSX.Element} Provider wrapping the form.
 */
export default function FormContextProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  /**
   * Validates the current step of the form.
   *
   * @returns {boolean} `true` if valid, `false` otherwise.
   */
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

  /**
   * Advances to the next form step if current step is valid.
   */
  const nextStep = useCallback(() => {
    if (validateCurrentStep()) {
      dispatch({ type: "NEXT_STEP" });
    }
  }, [validateCurrentStep]);

  /**
   * Goes back to previous step.
   */
  const prevStep = useCallback(() => dispatch({ type: "PREV_STEP" }), []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Submits the entire form to the backend after final validation.
   * Converts numeric fields, maps enums, and sends data to API.
   *
   * On success → sets submit message + marks form as submitted.
   * On failure → handles error and sets message.
   */
  const submitForm = useCallback(async () => {
    if (!validateCurrentStep()) {
      return;
    }

    const formData = {
      property: state.property,
      details: state.details,
      contact: state.contact,
    };

    setLoading(true);
    setError(null);

    try {
      const payload = {
        property: {
          ...formData.property,
          sizeMq: formData.property.sizeMq
            ? parseFloat(formData.property.sizeMq)
            : null,
          surfaceM2: formData.property.sizeMq
            ? parseFloat(formData.property.sizeMq)
            : null,
          propertyType: mapPropertyTypeToEnum(
            formData.property.propertyType
          ),
          condition: mapPropertyConditionToEnum(
            formData.property.condition
          ),
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

      const resp = await createValuation(payload);

      if (!resp) {
        throw new Error("Nessuna risposta valida dal server");
      }

      const baseMessage = `Grazie ${state.contact.name} ${state.contact.surname}! La tua richiesta è stata inviata con successo.`;
      const range = resp.valuationRange || resp.recommendedPrice || resp.range || null;
      const fullMessage = range
        ? `${baseMessage} Valutazione stimata: ${JSON.stringify(range)}`
        : baseMessage;

      dispatch({ type: "SET_SUBMIT_MESSAGE", payload: fullMessage });
      dispatch({ type: "SET_SUBMITTED" });
    } catch (err) {
      setError(err.message || "Errore durante l'invio della richiesta");
      dispatch({
        type: "SET_SUBMIT_MESSAGE",
        payload: "Errore durante l'invio della richiesta.",
      });
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
