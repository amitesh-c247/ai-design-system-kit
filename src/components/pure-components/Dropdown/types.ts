export type DropdownSize = "default" | "large";

export interface DropdownProps {
  /** The size of the dropdown button */
  size?: DropdownSize;
  /** Icon to display in the dropdown button */
  icon?: React.ReactElement;
  /** Content to render in the dropdown menu */
  dropdownRender: (menu: React.ReactNode) => React.ReactNode;
  /** Props to pass to the button component */
  buttonProps?: React.ComponentProps<
    typeof import("react-bootstrap").ButtonGroup
  >;
  /** Props to pass to the dropdown component */
  dropdownProps?: Omit<
    React.ComponentProps<typeof import("react-bootstrap").Dropdown>,
    "size" | "children"
  >;
  /** Whether to hide the menu icon */
  noMenuIcon?: boolean;
  /** The trigger event for the dropdown */
  trigger?: ("click" | "hover" | "contextMenu")[];
  /** The content of the dropdown button */
  children?: React.ReactNode;
}
