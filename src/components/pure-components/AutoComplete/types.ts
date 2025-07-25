export interface AutoCompleteOption {
  label: string;
  value: string;
}

export interface AutoCompleteProps {
  queryFn: (params: any) => any;
  value?: any;
  onChange?: (value: any) => void;
  onSearch?: (value: string) => void;
  additionalFilters?: Record<string, any>;
  placeholder?: string;
  footer?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}
