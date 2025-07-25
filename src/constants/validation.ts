// Email validation regex
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: {
    EMAIL: 'Email is required',
    PASSWORD: 'Password is required',
    NAME: 'Name is required',
    PHONE: 'Phone number is required',
  },
  INVALID: {
    EMAIL: 'Please enter a valid email address',
    PHONE: 'Please enter a valid phone number',
  },
} as const;

// Form validation rules
export const FORM_VALIDATION = {
  EMAIL: {
    required: VALIDATION_MESSAGES.REQUIRED.EMAIL,
    pattern: {
      value: EMAIL_REGEX,
      message: VALIDATION_MESSAGES.INVALID.EMAIL,
    },
  },
} as const; 