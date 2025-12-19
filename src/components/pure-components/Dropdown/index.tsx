import React, { useState } from "react";
import { Dropdown as BootstrapDropdown, ButtonGroup } from "react-bootstrap";
import classnames from "classnames";
import { ChevronDown, ChevronUp } from "../Icons";

export type DropdownSize = "default" | "large";

export interface DropdownProps {
  /** The size of the dropdown button */
  size?: DropdownSize;
  /** Icon to display in the dropdown button */
  icon?: React.ReactElement;
  /** Content to render in the dropdown menu */
  dropdownRender: (menu: React.ReactNode) => React.ReactNode;
  /** Props to pass to the button component */
  buttonProps?: React.ComponentProps<typeof ButtonGroup>;
  /** Props to pass to the dropdown component */
  dropdownProps?: Omit<
    React.ComponentProps<typeof BootstrapDropdown>,
    "size" | "children"
  >;
  /** Whether to hide the menu icon */
  noMenuIcon?: boolean;
  /** The trigger event for the dropdown */
  trigger?: ("click" | "hover" | "contextMenu")[];
  /** The content of the dropdown button */
  children?: React.ReactNode;
}

const getMenuIcon = (
  dropdownOpen: boolean,
  iconSize: number
): React.ReactElement<SVGAElement> =>
  dropdownOpen ? (
    <ChevronUp size={iconSize} />
  ) : (
    <ChevronDown size={iconSize} />
  );

const Dropdown: React.FC<DropdownProps> = ({
  size = "default",
  icon,
  dropdownRender,
  children,
  buttonProps,
  dropdownProps,
  noMenuIcon,
  trigger = ["click"],
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const featherIconSize = size === "default" ? 16 : 24;
  const isLabelChildren = typeof children === "string";

  const CustomToggle = React.forwardRef<
    HTMLButtonElement,
    { onClick?: (e: React.MouseEvent) => void }
  >(({ onClick }, ref) => (
    <button
      ref={ref}
      onClick={onClick}
      className={classnames("btn", {
        "w-100": buttonProps?.block,
      })}
    >
      {icon && <span className="me-2">{icon}</span>}
      {children}
      {!noMenuIcon && (
        <span className="ms-2">
          {getMenuIcon(isDropdownOpen, featherIconSize)}
        </span>
      )}
    </button>
  ));

  CustomToggle.displayName = "CustomToggle";

  if (noMenuIcon) {
    return (
      <BootstrapDropdown
        onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
        {...dropdownProps}
      >
        <BootstrapDropdown.Toggle as={CustomToggle} />
        <BootstrapDropdown.Menu>
          {dropdownRender(
            <div>
              {dropdownProps?.children}
            </div>
          )}
        </BootstrapDropdown.Menu>
      </BootstrapDropdown>
    );
  }

  return (
    <ButtonGroup {...buttonProps}>
      <button
        className={classnames("btn", {
          "w-100": buttonProps?.block,
        })}
      >
        {icon && <span className="me-2">{icon}</span>}
        {children}
      </button>
      <BootstrapDropdown
        onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
        {...dropdownProps}
      >
        <BootstrapDropdown.Toggle split className="btn">
          {getMenuIcon(isDropdownOpen, featherIconSize)}
        </BootstrapDropdown.Toggle>
        <BootstrapDropdown.Menu>
          {dropdownRender(
            <div>
              {dropdownProps?.children}
            </div>
          )}
        </BootstrapDropdown.Menu>
      </BootstrapDropdown>
    </ButtonGroup>
  );
};

export default Dropdown;
