import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

export interface ModalProps {
  open: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  title?: string;
  children: React.ReactNode;
  okText?: string;
  cancelText?: string;
  size?: 'sm' | 'lg' | 'xl';
  centered?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onOk,
  onCancel,
  title,
  children,
  okText = 'OK',
  cancelText = 'Cancel',
  size,
  centered = true,
  className = '',
}) => {
  return (
    <BootstrapModal
      show={open}
      onHide={onCancel}
      size={size}
      centered={centered}
      className={className}
    >
      {title && (
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>{title}</BootstrapModal.Title>
        </BootstrapModal.Header>
      )}
      <BootstrapModal.Body>{children}</BootstrapModal.Body>
      <BootstrapModal.Footer>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>
        )}
        {onOk && (
          <Button variant="primary" onClick={onOk}>
            {okText}
          </Button>
        )}
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal; 