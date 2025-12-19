import React from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import classnames from 'classnames';

export interface InputProps extends Omit<FormControlProps, 'size'> {
  isValid?: boolean;
  isInvalid?: boolean;
  feedback?: string;
  feedbackType?: 'valid' | 'invalid';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, isValid, isInvalid, feedback, feedbackType = 'invalid', ...props }, ref) => {
    return (
      <>
        <Form.Control
          ref={ref}
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

Input.displayName = 'Input';

export default Input;
