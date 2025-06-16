import React, { Fragment, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Form, Button, Stack, Spinner } from 'react-bootstrap';
import { FetchNextPageOptions } from '@tanstack/react-query';
import { Search } from '@/components/Icons';
import highlightText from '@/utils/highlight';
import FilterButton from '../FilterButton';
import styles from './styles.module.scss';

export interface SelectFilterProps {
  filterLabel: string;
  options: { label: string | React.ReactNode; value: string }[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  dropdownAlignment?: 'left' | 'right';
  type?: 'multiple' | 'single';
  isSearchable?: boolean;
  filterType?: 'dynamic' | 'manual';
  fetchNextPage?: (options?: FetchNextPageOptions) => void;
  totalElements?: number;
  currentPage?: number;
  isFetchingNextPage?: boolean;
  showFilterButton?: boolean;
}

const getRawInputElementProps = (firstValueLabel, filterLabel, selectedCount, value) => {
  return (
    <FilterButton
      labelCount={selectedCount}
      labelName={firstValueLabel}
      labelBase={filterLabel}
      active={Boolean(value?.[0])}
    />
  );
};

const SelectFilter: React.FC<SelectFilterProps> = ({
  options,
  filterLabel,
  onChange,
  value = '',
  dropdownAlignment = 'right',
  type = 'single',
  isSearchable = false,
  filterType,
  totalElements,
  fetchNextPage,
  isFetchingNextPage,
  showFilterButton = true,
  searchValue,
  ...otherProps
}) => {
  const { formatMessage } = useIntl();
  const selectedCount = Array.isArray(value) ? value.length : value ? 1 : 0;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string | string[]>(value);
  const isMultiple = type === 'multiple';
  const isButtonMode = filterType === 'manual' && options?.length > 0;

  const onClear = () => {
    onChange(isMultiple ? [] : '');
    setSelectedOptions(isMultiple ? [] : '');
    setSearchTerm('');
  };

  const onApply = () => {
    onChange(selectedOptions);
  };

  const onOptionChange = (selectedOption: string | string[]) => {
    if (!isButtonMode) {
      onChange(selectedOption);
    } else {
      setSelectedOptions(selectedOption);
    }
  };

  useEffect(() => {
    setSelectedOptions(value);
  }, [value]);

  const ButtonContainer = isButtonMode ? Stack : Fragment;

  const handleScroll = (e) => {
    const { target } = e;
    if (
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      options.length < totalElements &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  const firstValue = isMultiple ? value?.[0] : value;
  const firstValueLabel = options?.find((option) => option.value === firstValue)?.label as string;

  const rawInputElementProps = showFilterButton && {
    getRawInputElement: () =>
      getRawInputElementProps(firstValueLabel, filterLabel, selectedCount, value),
  };

  return (
    <Form.Select
      onChange={(e) => onOptionChange(e.target.value)}
      value={selectedOptions}
      className={styles.dropdown}
      multiple={isMultiple}
      {...rawInputElementProps}
      {...otherProps}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {searchValue ? highlightText(option.label.toString(), searchValue) : option.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default SelectFilter;
