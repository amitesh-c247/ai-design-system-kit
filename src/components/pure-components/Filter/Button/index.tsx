import React, { forwardRef } from 'react';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';

export interface PillButtonProps extends React.ComponentProps<typeof Button> {
  active?: boolean;
}

const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ className, active, ...props }, ref) => {
    return (
      <Button
        className={classnames(className, styles.button, { [styles.active]: active })}
        ref={ref}
        {...props}
      />
    );
  },
);

export default PillButton;
