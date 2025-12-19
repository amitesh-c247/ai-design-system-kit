import React from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import classnames from 'classnames';

export interface PasswordProps extends Omit<FormControlProps, 'size'> {
  isValid?: boolean;
  isInvalid?: boolean;
  feedback?: string;
  feedbackType?: 'valid' | 'invalid';
}

const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
  ({ className, isValid, isInvalid, feedback, feedbackType = 'invalid', ...props }, ref) => {
    return (
      <>
        <Form.Control
          ref={ref}
          type="password"
          className={className}
          isValid={isValid}
          isInvalid={isInvalid}
          {...props}
        />
        {feedback && (
          <Form.Control.Feedback type={feedbackType}>{feedback}</Form.Control.Feedback>
        )}
      </>
    );
  },
);

Password.displayName = 'Password';

export default Password;
