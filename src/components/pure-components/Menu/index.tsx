import React from 'react';
import { Dropdown } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';

export interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface MenuProps {
  children: React.ReactNode;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
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

const Menu: React.FC<MenuProps> & {
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
