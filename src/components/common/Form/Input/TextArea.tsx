import React from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';

export interface TextAreaProps extends Omit<FormControlProps, 'size'> {
  isValid?: boolean;
  isInvalid?: boolean;
  feedback?: string;
  feedbackType?: 'valid' | 'invalid';
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, isValid, isInvalid, feedback, feedbackType = 'invalid', ...props }, ref) => {
    return (
      <>
        <Form.Control
          ref={ref}
          as="textarea"
          className={classnames(styles.input, className)}
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

TextArea.displayName = 'TextArea';

export default TextArea;
