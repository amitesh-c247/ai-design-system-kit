import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import styles from './styles.module.scss';

export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'iconBordered' | 'danger' | 'link';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  block?: boolean;
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  onClick,
  children,
  className = '',
  href,
  target,
  block = false,
  active = false,
}) => {
  const getVariant = () => {
    switch (type) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      case 'tertiary':
        return 'outline-primary';
      case 'danger':
        return 'danger';
      case 'icon':
      case 'iconBordered':
        return 'outline-secondary';
      case 'link':
        return 'link';
      default:
        return 'primary';
    }
  };

  const getSize = () => {
    switch (size) {
      case 'small':
        return 'sm';
      case 'large':
        return 'lg';
      default:
        return undefined;
    }
  };

  const buttonClasses = [
    styles.button,
    type === 'icon' || type === 'iconBordered' ? styles.iconButton : '',
    block ? styles.block : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <BootstrapButton
      variant={getVariant()}
      size={getSize()}
      disabled={disabled || loading}
      onClick={onClick}
      className={buttonClasses}
      href={href}
      target={target}
      active={active}
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
      ) : null}
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </BootstrapButton>
  );
};

export default Button; 