import { FieldValues, UseFormRegister } from 'react-hook-form';
import { FORM_VALIDATION } from '@/constants/validation';

// Type for form field registration
export type FormFieldRegistration = {
  register: UseFormRegister<FieldValues>;
  name: string;
  validation?: keyof typeof FORM_VALIDATION;
};

/**
 * Helper function to register form fields with validation
 * @param register - React Hook Form's register function
 * @param name - Field name
 * @param validation - Optional validation type from FORM_VALIDATION
 * @returns Register options for the field
 */
export const registerField = ({ register, name, validation }: FormFieldRegistration) => {
  if (validation && FORM_VALIDATION[validation]) {
    return register(name, FORM_VALIDATION[validation]);
  }
  return register(name);
};

/**
 * Format form error message
 * @param error - Error message or object
 * @returns Formatted error message
 */
export const formatFormError = (error: unknown): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return 'An error occurred';
};

/**
 * Check if form is valid
 * @param errors - Form errors object
 * @returns Boolean indicating if form is valid
 */
export const isFormValid = (errors: Record<string, unknown>): boolean => {
  return Object.keys(errors).length === 0;
}; 