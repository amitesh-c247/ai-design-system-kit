import React, { useMemo, useState } from 'react';
import { useFormatMessage } from '@/hooks/useFormatMessage';
import { Form } from 'react-bootstrap';
import capitalize from 'lodash/capitalize';
import get from 'lodash/get';
import last from 'lodash/last';
import throttle from 'lodash/throttle';

import { DEFAULT_PAGE_SIZE_FOR_FILTER_OPTIONS } from '@/constants';
import { StateTypes, useStates } from '@/hooks/states';
import FilterButton from '../FilterButton';
import styles from './styles.module.scss';

interface StateFilterProps {
  type: StateTypes;
  value?: string[];
  onChange?: (values: string[]) => void;
  showFilterButton?: boolean;
}

const StatesFilter: React.FC<StateFilterProps> = ({
  type,
  value = [],
  onChange,
  showFilterButton = true,
  ...props
}) => {
  const { formatMessage } = useFormatMessage();
  const [searchValue, setSearchValue] = useState('');
  const {
    data: stateResult,
    fetchNextPage,
    isFetchingNextPage,
  } = useStates(type, {
    searchValue,
    page: 0,
    size: DEFAULT_PAGE_SIZE_FOR_FILTER_OPTIONS,
  });

  const states = (stateResult?.pages || []).reduce(
    (prev, { content = [] }) => [...prev, ...content].map((item) => ({ ...item })),
    [],
  );

  const stateOptions = useMemo(() => {
    const options =
      states?.map(({ name }) => ({
        label: capitalize(name),
        value: name,
      })) || [];
    options.unshift({
      value: '',
      label: formatMessage({ id: 'generic.all' }),
    });
    return options;
  }, [formatMessage, states]);

  const data = last(stateResult?.pages);
  const pageable = get(data, 'pageable', { pageNumber: 0 });

  const executeSearch = useMemo(
    () =>
      throttle(
        (query: string) => {
          setSearchValue(query);
        },
        500,
        { leading: false },
      ),
    [setSearchValue],
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    onChange?.(selectedOptions);
  };

  const firstValue = value?.[0];
  const firstValueLabel = stateOptions.find(option => option.value === firstValue)?.label;

  const rawInputElementProps = showFilterButton && {
    getRawInputElement: () => (
      <FilterButton
        labelCount={value.length}
        labelName={firstValueLabel}
        labelBase={formatMessage({ id: 'generic.stateFilter.label' })}
        active={Boolean(value?.[0])}
      />
    ),
  };

  return (
    <Form.Select
      multiple
      value={value}
      onChange={handleChange}
      className={styles.stateFilter}
      aria-label={formatMessage({ id: 'generic.stateFilter.label' })}
      {...rawInputElementProps}
      {...props}
    >
      {stateOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default StatesFilter;
