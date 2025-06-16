import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Form, Stack, Dropdown } from 'react-bootstrap';
import type { NodeDetails } from '@leanspace/js-client/dist/types/Assets';
import type { NodesPickerProps } from '@/components/EntityPicker/NodesPicker';
import NodesPicker from '@/components/EntityPicker/NodesPicker';
import { Search } from '@/components/Icons';
import { useResourceTreeFilter } from '@/hooks/assets';
import FilterButton from '../FilterButton';
import styles from './styles.module.scss';

interface ResourcePickerFilterProps extends NodesPickerProps {
  onChange: (value: string[]) => void;
  filterLabel: string;
  dropdownAlignment?: 'left' | 'right';
}

const NodesPickerFilter: React.FC<ResourcePickerFilterProps> = ({
  value,
  onChange,
  filterLabel,
  dropdownAlignment = 'right',
  ...otherProps
}) => {
  const { formatMessage } = useIntl();
  const [searchValue, setSearchValue] = useState('');

  const selectionCount = value ? value.length : 0;

  const { data: nodeResult } = useResourceTreeFilter({
    resource: 'NODE',
    value,
    selectionCount,
  });

  const selectionName = (nodeResult as NodeDetails)?.name;

  const onClear = () => {
    onChange([]);
    setSearchValue('');
  };

  return (
    <NodesPicker
      {...otherProps}
      value={value}
      searchValue={searchValue}
      onChange={onChange}
      popupClassName={styles.dropdown}
      dropdownAlign={{
        points: dropdownAlignment === 'right' ? ['tr', 'br'] : ['tl', 'bl'],
        offset: [0, 8],
      }}
      onDropdownVisibleChange={(open) => {
        if (!open) setSearchValue('');
      }}
      getRawInputElement={() => (
        <FilterButton
          active={value.length > 0}
          labelName={selectionName}
          labelCount={selectionCount}
          labelBase={filterLabel}
        />
      )}
      dropdownRender={(menu) => (
        <Stack gap={2}>
          <div className={styles.searchWrapper}>
            <Form.Control
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder={formatMessage({ id: 'generic.search.all' })}
              className={styles.search}
            />
            <hr />
            {menu}
          </div>
          <div className="d-flex justify-content-end">
            <Button variant="outline-secondary" onClick={onClear}>
              {formatMessage({ id: 'generic.clear' })}
            </Button>
          </div>
        </Stack>
      )}
    />
  );
};

export default NodesPickerFilter;
