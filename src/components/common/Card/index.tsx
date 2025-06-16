import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';

export type CardVariant = 'default' | 'strong' | 'tight' | 'tight-strong';

export interface CardProps extends Omit<React.ComponentProps<typeof BootstrapCard>, 'variant'> {
  /** Additional CSS class name */
  className?: string;
  /** The visual style of the card */
  variant?: CardVariant;
  /** Whether to show a border around the card */
  bordered?: boolean;
  /** Whether to disable the shadow effect */
  noShadow?: boolean;
}

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  variant = 'default',
  bordered = false,
  className,
  children,
  noShadow,
  ...props
}) => {
  return (
    <BootstrapCard
      className={classnames(
        styles.card,
        styles[`variant-${variant}`],
        {
          [styles.bordered]: bordered,
          [styles.noShadow]: noShadow,
        },
        className,
      )}
      {...props}
    >
      {children}
    </BootstrapCard>
  );
};

export default Card;
