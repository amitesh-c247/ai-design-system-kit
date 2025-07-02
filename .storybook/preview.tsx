import type { Preview } from '@storybook/nextjs';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { messages } from '../src/locales';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import '../src/app/globals.css';

// Flatten the messages for react-intl
const flattenMessages = (nestedMessages: any, prefix = ''): Record<string, string> => {
  let result: Record<string, string> = {};
  
  for (const key in nestedMessages) {
    const value = nestedMessages[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'string') {
      result[newKey] = value;
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenMessages(value, newKey));
    }
  }
  
  return result;
};

const flatMessages = flattenMessages(messages.en);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <IntlProvider 
        locale="en" 
        defaultLocale="en"
        messages={flatMessages}
        onError={(err) => {
          console.error('IntlProvider error:', err);
        }}
      >
        <Story />
      </IntlProvider>
    ),
  ],
};

export default preview;