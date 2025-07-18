import React from "react";
import { Dropdown } from "react-bootstrap";
import classnames from "classnames";
import type { MenuItemProps, MenuProps } from "./types";
import styles from "./styles.module.scss";

const MenuItem: React.FC<React.PropsWithChildren<MenuItemProps>> = ({
  children,
  onClick,
  active,
  disabled,
  className,
}) => {
  return (
    <Dropdown.Item
      onClick={onClick}
      active={active}
      disabled={disabled}
      className={classnames(styles.menuItem, className)}
    >
      {children}
    </Dropdown.Item>
  );
};

const Menu: React.FC<React.PropsWithChildren<MenuProps>> & {
  Item: typeof MenuItem;
} = ({ children, className }) => {
  return (
    <Dropdown.Menu className={classnames(styles.menu, className)}>
      {children}
    </Dropdown.Menu>
  );
};

Menu.Item = MenuItem;

export default Menu;
