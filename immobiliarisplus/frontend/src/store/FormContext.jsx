/**
 * @file FormContext.jsx
 * @description Form context for the multi-step valuation form.
 *
 * Exposes a React context used by `FormContextProvider` to share form state,
 * validation, navigation between steps, and submission logic.
 *
 * @module store/FormContext
 */

import { createContext } from "react";

const FormContext = createContext(null);

export default FormContext;
