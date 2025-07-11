import React, { useMemo } from "react";
import { useFormatMessage } from "@/hooks/formatMessage";
import { Form } from "react-bootstrap";
import capitalize from "lodash/capitalize";

import FilterButton from "../FilterButton";
import styles from "./styles.module.scss";

export interface StateFilterProps {
  filterLabel: string;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  dropdownAlignment?: "left" | "right";
  type?: "multiple" | "single";
  isSearchable?: boolean;
  filterType?: "dynamic" | "manual";
  showFilterButton?: boolean;
}

// TODO: Implement proper state management hook
const StatesFilter: React.FC<StateFilterProps> = ({
  filterLabel,
  onChange,
  value = "",
  dropdownAlignment = "right",
  type = "single",
  isSearchable = false,
  filterType,
  showFilterButton = true,
}) => {
  const { formatMessage } = useFormatMessage();

  // Mock data - replace with actual implementation
  const mockStates = [
    { name: "Active", value: "active" },
    { name: "Inactive", value: "inactive" },
    { name: "Pending", value: "pending" },
    { name: "Completed", value: "completed" },
  ];

  const options = useMemo(() => {
    return mockStates.map(({ name, value }) => ({
      label: formatMessage({ id: `states.${value}` }) || capitalize(name),
      value,
    }));
  }, [formatMessage]);

  // Mock implementation - replace with actual logic
  const handleChange = (selectedValue: string | string[]) => {
    onChange?.(selectedValue);
  };

  return (
    <div className={styles.stateFilter}>
      <Form.Select
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        multiple={type === "multiple"}
        className={styles.select}
      >
        <option value="">Select State</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default StatesFilter;
