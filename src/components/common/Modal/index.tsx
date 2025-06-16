import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import classnames from 'classnames';
import { FaTimes } from 'react-icons/fa';
import styles from './styles.module.scss';

export interface ModalProps {
  show: boolean;
  onHide: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'lg' | 'xl';
  centered?: boolean;
  className?: string;
  closeButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onHide,
  title,
  children,
  footer,
  size,
  centered,
  className,
  closeButton = true,
}) => {
  return (
    <BootstrapModal
      show={show}
      onHide={onHide}
      size={size}
      centered={centered}
      className={classnames(styles.modal, className)}
    >
      {(title || closeButton) && (
        <BootstrapModal.Header className={styles.modalHeader}>
          {title && <BootstrapModal.Title className={styles.modalTitle}>{title}</BootstrapModal.Title>}
          {closeButton && (
            <Button
              variant="link"
              onClick={onHide}
              className={styles.closeButton}
              aria-label="Close"
            >
              <FaTimes />
            </Button>
          )}
        </BootstrapModal.Header>
      )}
      <BootstrapModal.Body className={styles.modalBody}>{children}</BootstrapModal.Body>
      {footer && <BootstrapModal.Footer className={styles.modalFooter}>{footer}</BootstrapModal.Footer>}
    </BootstrapModal>
  );
};

export default Modal;
