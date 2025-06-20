import { useTranslations } from 'next-intl';

export function useFormatMessage() {
  const t = useTranslations();
  
  return {
    formatMessage: (descriptor: { id: string }, values?: Record<string, any>) => {
      return t(descriptor.id, values);
    }
  };
} 