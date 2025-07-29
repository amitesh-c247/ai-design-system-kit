import { UseQueryResult } from "@tanstack/react-query";

export interface AutoCompleteOption {
  key: string | number;
  label?: string;
  value: string;
}

export interface AutoCompleteProps {
  queryFn?: (options: any) => UseQueryResult<any>;
  options?: AutoCompleteOption[];
  value?: { key: string | number; value: string };
  onChange?: (value: { key: string | number; value: string }) => void;
  onSearch?: (value: string) => void;
  additionalFilters?: Record<string, any>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  footer?: React.ReactNode;
}
