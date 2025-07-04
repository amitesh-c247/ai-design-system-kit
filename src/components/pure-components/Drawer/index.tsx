import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import classnames from 'classnames';

import styles from './styles.module.scss';

export interface DrawerProps {
  show: boolean;
  onHide: () => void;
  placement?: 'start' | 'end' | 'top' | 'bottom';
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  minHeight?: string;
  maxHeight?: string;
  height?: string;
  backdrop?: boolean | 'static';
  scrollable?: boolean;
  closeButton?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({
  show,
  onHide,
  placement = 'bottom',
  title,
  children,
  className,
  minHeight = '35%',
  maxHeight = '95%',
  height,
  backdrop = true,
  scrollable = true,
  closeButton = true,
  ...props
}) => {
  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement={placement}
      backdrop={backdrop}
      scrollable={scrollable}
      className={classnames(styles.drawer, className)}
      style={{
        minHeight: minHeight,
        maxHeight: maxHeight,
        height: height ?? 'auto',
      }}
      {...props}
    >
      {title && <Offcanvas.Header closeButton={closeButton}>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>}
      <Offcanvas.Body>
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Drawer;
