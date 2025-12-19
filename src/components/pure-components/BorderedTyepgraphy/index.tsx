import React from 'react';
import { Card } from 'react-bootstrap';
import classnames from 'classnames';

export type BorderedTypographyVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

export interface BorderedTypographyProps {
  /** The content to display */
  data: string;
  /** The color variant of the bordered typography */
  variant?: BorderedTypographyVariant;
  /** Additional CSS class name */
  className?: string;
  /** Whether to show a hover effect */
  hover?: boolean;
  /** Whether to make the text bold */
  bold?: boolean;
  /** Whether to make the text italic */
  italic?: boolean;
  /** Whether to make the text underlined */
  underline?: boolean;
}

const BorderedTypography: React.FC<BorderedTypographyProps> = ({ 
  data, 
  variant = 'light',
  className,
  hover = true,
  bold = false,
  italic = false,
  underline = false,
}) => {
  const textColor = variant === 'light' ? 'dark' : 'white';
  const textClasses = classnames({
    'fw-bold': bold,
    'fst-italic': italic,
    'text-decoration-underline': underline,
  });

  return (
    <Card 
      bg={variant}
      text={textColor}
      className={classnames('app-bordered-typography', className, {
        'app-bordered-typography-no-hover': !hover,
      })}
    >
      <Card.Body className={`p-2 ${textClasses}`}>
        {data}
      </Card.Body>
    </Card>
  );
};

export default BorderedTypography;
