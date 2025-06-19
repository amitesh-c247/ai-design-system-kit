import { getRequestConfig } from 'next-intl/server';
import { messages } from '../locales';

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    locale = 'en';
  }
  return {
    locale,
    messages: messages[locale as keyof typeof messages]
  };
}); 