import React from 'react';
import { Container } from 'react-bootstrap';
import classnames from 'classnames';

import styles from './styles.module.scss';

export interface DividerProps {
  className?: string;
  noMargin?: boolean;
  vertical?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

const Divider: React.FC<DividerProps> = ({
  className,
  noMargin,
  vertical,
  variant,
  ...props
}) => {
  return (
    <Container
      fluid
      className={classnames(
        styles.divider,
        {
          [styles.separatorVertical]: vertical,
          [styles.noMargin]: noMargin,
          [styles[variant || '']]: variant,
        },
        className,
      )}
      {...props}
    >
      <hr className={styles.hr} />
    </Container>
  );
};

export default Divider;
