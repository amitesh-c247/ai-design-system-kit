import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface CommonModalProps {
  show: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'lg' | 'xl';
}

const CommonModal: React.FC<CommonModalProps> = ({
  show,
  onClose,
  title,
  children,
  footer,
  size
}) => {
  return (
    <Modal show={show} onHide={onClose} size={size}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footer && <Modal.Footer>{footer}</Modal.Footer>}
    </Modal>
  );
};

export default CommonModal;
