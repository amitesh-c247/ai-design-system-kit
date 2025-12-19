import React, { forwardRef } from 'react';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';

export interface PillButtonProps extends React.ComponentProps<typeof Button> {
  active?: boolean;
}

const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ className, active, ...props }, ref) => {
    return (
      <Button
        className={classnames(className, 'app-filter-pill-button', { active })}
        ref={ref}
        {...props}
      />
    );
  },
);

export default PillButton;
