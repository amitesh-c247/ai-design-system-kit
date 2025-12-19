import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { Form } from "react-bootstrap";

import { useTags } from "@/hooks/tags";
import FilterButton from "../FilterButton";

interface TagFilterProps {
  type: string;
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
  const { tags, loading, error } = useTags();

  const tagOptions = useMemo(() => {
    return tags.map((tag) => ({
      label: tag.name,
      value: tag.id,
    }));
  }, [tags]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    onChange?.(selectedOptions);
  };

  const firstValue = value?.[0];
  const firstValueLabel = tagOptions.find(
    (tag) => tag.value === firstValue
  )?.label;

  const rawInputElementProps = showFilterButton && {
    getRawInputElement: () => (
      <FilterButton
        labelCount={value.length}
        labelName={firstValueLabel}
        labelBase={formatMessage({ id: "tags.filter.label" })}
        active={Boolean(value?.[0])}
      />
    ),
  };

  if (loading) {
    return <div>Loading tags...</div>;
  }

  if (error) {
    return <div>Error loading tags: {error}</div>;
  }

  return (
    <Form.Select
      multiple
      value={value}
      onChange={handleChange}
      className="app-filter-select"
      aria-label={formatMessage({ id: "tags.filter.label" })}
      {...rawInputElementProps}
    >
      {tagOptions.map((tag) => (
        <option key={tag.value} value={tag.value}>
          {tag.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default TagFilter;
