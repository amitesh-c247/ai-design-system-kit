import common from './en/common/index.json';
import auth from './en/auth/index.json';
import dashboard from './en/dashboard/index.json';

export const messages = {
  en: {
    common,
    auth,
    dashboard
  }
};

export type Messages = typeof messages;
export type Locale = keyof Messages; 