export interface SelectProps {
  className?: string;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  optionGroups?: Array<{
    label: string;
    options: Array<{ value: string; label: string; disabled?: boolean }>;
  }>;
}
