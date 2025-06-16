import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Form } from 'react-bootstrap';
import get from 'lodash/get';
import last from 'lodash/last';
import throttle from 'lodash/throttle';

import { DEFAULT_PAGE_SIZE_FOR_FILTER_OPTIONS } from '@/constants';
import type { TagTypes } from '@/hooks/tags';
import { useTags } from '@/hooks/tags';
import FilterButton from '../FilterButton';
import styles from './styles.module.scss';

interface TagFilterProps {
  type: TagTypes;
  value?: string[];
  onChange?: (values: string[]) => void;
  nodeId?: string;
  showFilterButton?: boolean;
}

const TagFilter: React.FC<TagFilterProps> = ({
  type,
  value = [],
  onChange,
  nodeId,
  showFilterButton = true,
}) => {
  const { formatMessage } = useIntl();
  const [searchValue, setSearchValue] = useState('');
  const {
    data: tagResult,
    fetchNextPage,
    isFetchingNextPage,
  } = useTags(type, {
    searchValue,
    nodeId,
    page: 0,
    size: DEFAULT_PAGE_SIZE_FOR_FILTER_OPTIONS,
  });

  const tags = (tagResult?.pages || []).reduce(
    (prev, { content = [] }) => [...prev, ...content].map((item) => ({ ...item })),
    [],
  );

  const data = last(tagResult?.pages);
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
  const firstValueLabel = tags.find(tag => `${tag.key}:${tag.value || ''}` === firstValue)?.key;

  const rawInputElementProps = showFilterButton && {
    getRawInputElement: () => (
      <FilterButton
        labelCount={value.length}
        labelName={firstValueLabel}
        labelBase={formatMessage({ id: 'tags.filter.label' })}
        active={Boolean(value?.[0])}
      />
    ),
  };

  return (
    <Form.Select
      multiple
      value={value}
      onChange={handleChange}
      className={styles.tagFilter}
      aria-label={formatMessage({ id: 'tags.filter.label' })}
      {...rawInputElementProps}
    >
      {tags.map(({ key, value: tagValue }, index) => (
        <option key={`${key}-${index}`} value={`${key}:${tagValue || ''}`}>
          {`${key}=${tagValue || ''}`}
        </option>
      ))}
    </Form.Select>
  );
};

export default TagFilter;
