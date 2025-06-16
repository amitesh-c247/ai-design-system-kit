import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

export interface CardProps {
  variant?: 'default' | 'strong' | 'tight' | 'tight-strong';
  bordered?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  bordered = false,
  children,
  className = '',
}) => {
  const getCardStyle = () => {
    const baseStyle = 'shadow-sm';
    const variantStyles = {
      default: '',
      strong: 'bg-light',
      tight: 'p-0',
      'tight-strong': 'bg-light p-0',
    };
    const borderStyle = bordered ? 'border' : 'border-0';

    return `${baseStyle} ${variantStyles[variant]} ${borderStyle} ${className}`.trim();
  };

  return (
    <BootstrapCard className={getCardStyle()}>
      <BootstrapCard.Body>{children}</BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card; 