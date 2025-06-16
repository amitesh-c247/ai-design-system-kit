import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { useQuery } from '@tanstack/react-query';
import AutoComplete from './index';

export default {
  title: 'Components/AutoComplete',
  component: AutoComplete,
  argTypes: {
    placeholder: {
      control: 'text',
    },
  },
} as Meta<typeof AutoComplete>;

const mockData = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' },
  { id: 4, name: 'Date' },
  { id: 5, name: 'Elderberry' },
  { id: 6, name: 'Fig' },
  { id: 7, name: 'Grape' },
  { id: 8, name: 'Honeydew' },
  { id: 9, name: 'Kiwi' },
  { id: 10, name: 'Lemon' },
];

const mockQueryFn = (options: any) => {
  return useQuery({
    queryKey: ['search', options],
    queryFn: () => {
      const searchValue = options.searchValue?.toLowerCase() || '';
      const filteredData = mockData.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );
      return Promise.resolve({ content: filteredData });
    },
  });
};

const Template: StoryFn<typeof AutoComplete> = (args) => <AutoComplete {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  queryFn: mockQueryFn,
  placeholder: 'Search fruits...',
};

export const WithFooter = Template.bind({});
WithFooter.args = {
  queryFn: mockQueryFn,
  placeholder: 'Search fruits...',
  footer: <div className="text-muted">Showing 10 results</div>,
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  queryFn: mockQueryFn,
  placeholder: 'Search fruits...',
  value: { key: 1, value: 'Apple' },
};

export const WithCustomSearch = () => {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <AutoComplete
      queryFn={mockQueryFn}
      placeholder="Search fruits..."
      onSearch={(value) => {
        console.log('Searching for:', value);
        setSearchValue(value);
      }}
      footer={
        <div className="text-muted">
          Current search: {searchValue || 'No search yet'}
        </div>
      }
    />
  );
}; 