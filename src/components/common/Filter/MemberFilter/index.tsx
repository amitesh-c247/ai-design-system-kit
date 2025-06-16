import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Form } from 'react-bootstrap';
import type { Member } from '@leanspace/js-client/dist/types/Teams';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import last from 'lodash/last';
import uniqBy from 'lodash/uniqBy';

import { DEFAULT_PAGE_SIZE_FOR_FILTER_OPTIONS } from '@/constants';
import { useMembersSelector, useSelectedMembers } from '@/hooks/roles';
import FilterButton from '../FilterButton';
import styles from './styles.module.scss';

interface MemberFilterProps {
  value: string[];
  onChange?: (values: string[]) => void;
  label?: string;
  placeholder?: string;
  showFilterButton?: boolean;
}

const MemberFilter: React.FC<MemberFilterProps> = ({ 
  value, 
  onChange, 
  label, 
  placeholder,
  showFilterButton = true,
  ...props 
}) => {
  const { formatMessage } = useIntl();
  const [searchValue, setSearchValue] = useState('');

  const {
    data: membersData,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useMembersSelector({
    size: DEFAULT_PAGE_SIZE_FOR_FILTER_OPTIONS,
    page: 0,
    searchValue,
  });

  const members = (membersData?.pages || []).reduce(
    (prev, { content = [] }) => [...prev, ...content].map((item) => ({ ...item })),
    [],
  );

  const data = last(membersData?.pages);
  const pageable = get(data, 'pageable', { pageNumber: 0 });

  const { data: selectedMembersList } = useSelectedMembers(
    {
      ids: value,
    },
    {
      enabled: value.length > 0,
    },
  );

  const executeSearch = useMemo(
    () =>
      debounce((query: string) => {
        setSearchValue(query);
      }, 500),
    [],
  );

  const selectedMembers: Member[] = get(selectedMembersList, 'content', []);

  // for including the selected members that are not in the first 100 records
  const options = useMemo(
    () => uniqBy([...members, ...selectedMembers], 'id'),
    [selectedMembers, members],
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    onChange?.(selectedOptions);
  };

  const firstValue = value?.[0];
  const firstValueLabel = options.find(member => member.id === firstValue)?.name;

  const rawInputElementProps = showFilterButton && {
    getRawInputElement: () => (
      <FilterButton
        labelCount={value.length}
        labelName={firstValueLabel}
        labelBase={label || formatMessage({ id: 'roles.members.title' })}
        active={Boolean(value?.[0])}
      />
    ),
  };

  return (
    <Form.Select
      multiple
      value={value}
      onChange={handleChange}
      className={styles.memberFilter}
      placeholder={placeholder}
      disabled={isLoading}
      aria-label={label || formatMessage({ id: 'roles.members.title' })}
      {...rawInputElementProps}
      {...props}
    >
      {options.map((member) => (
        <option key={member.id} value={member.id}>
          {member.name}
        </option>
      ))}
    </Form.Select>
  );
};

export default MemberFilter;
