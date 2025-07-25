import common from './en/common/index.json';
import auth from './en/auth/index.json';
import dashboard from './en/dashboard/index.json';
import users from './en/users/index.json';
import faq from './en/faq/index.json';

import cms from './en/cms/index.json';

export const messages = {
  en: {
    common,
    auth,
    dashboard,
    users,
    faq,
    cms,
  }
};

export type Messages = typeof messages;
export type Locale = keyof Messages; 