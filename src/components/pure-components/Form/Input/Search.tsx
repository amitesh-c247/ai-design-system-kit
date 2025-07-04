import React from 'react';
import { Form, FormControlProps, InputGroup } from 'react-bootstrap';
import classnames from 'classnames';
import { FaSearch } from 'react-icons/fa';
import styles from './styles.module.scss';

export interface SearchProps extends Omit<FormControlProps, 'size'> {
  isValid?: boolean;
  isInvalid?: boolean;
  feedback?: string;
  feedbackType?: 'valid' | 'invalid';
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, isValid, isInvalid, feedback, feedbackType = 'invalid', ...props }, ref) => {
    return (
      <>
        <InputGroup>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            ref={ref}
            type="search"
            className={classnames(styles.input, className)}
            isValid={isValid}
            isInvalid={isInvalid}
            {...props}
          />
        </InputGroup>
        {feedback && (
          <Form.Control.Feedback type={feedbackType}>{feedback}</Form.Control.Feedback>
        )}
      </>
    );
  },
);

Search.displayName = 'Search';

export default Search;
