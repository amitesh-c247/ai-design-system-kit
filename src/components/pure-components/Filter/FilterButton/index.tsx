import React, { forwardRef, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'react-bootstrap';
import { ChevronDown } from '@/components/Icons';

interface FilterButtonProps {
  onClick?: () => void;
  active?: boolean;
  className?: string;
  labelCount?: number;
  labelName?: string;
  labelBase: string;
}

const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(
  ({ onClick, active, className, labelCount, labelName, labelBase }, ref) => {
    const { formatMessage } = useIntl();
    const label = useMemo(() => {
      const getLabelName = (label: string, count: string | null = null) => (
        <span className="app-filter-label-wrapper">
          <span className="text-truncate">{label}</span>
          {count && <span className="text-truncate">{count}</span>}
        </span>
      );
      if (labelCount === 0) {
        const title = formatMessage({ id: 'common.generic.filter.all' }, { label: labelBase });
        return { title, name: title };
      }
      if (labelCount === 1) {
        return { name: getLabelName(labelName || ''), title: labelName || '' };
      }
      return {
        title: formatMessage(
          { id: 'common.generic.filter.appliedCount' },
          { label: labelName || '', count: (labelCount || 0) - 1 }
        ),
        name: getLabelName(
          labelName || '',
          formatMessage(
            { id: 'common.generic.filter.plusCount' },
            { count: (labelCount || 0) - 1 }
          )
        ),
      };
    }, [labelBase, formatMessage, labelCount, labelName]);

    return (
      <Button
        variant={active ? 'primary' : 'outline-secondary'}
        className={`app-filter-button ${className || ''}`}
        onClick={onClick}
        ref={ref}
        title={label.title}
      >
        <span className="app-filter-label">{label.name}</span>
        <ChevronDown className="app-filter-arrow-icon" size={16} />
      </Button>
    );
  }
);

export default FilterButton;
