import React from 'react';
import { Toast as BootstrapToast, ToastContainer } from 'react-bootstrap';
import styles from './styles.module.scss';

export interface ToastProps {
  content: React.ReactNode;
  onClose?: () => void;
}

const ToastComponent: React.FC<ToastProps> = ({ content, onClose }) => (
  <ToastContainer position="top-end" className="p-3">
    <BootstrapToast onClose={onClose} delay={3000} autohide>
      <BootstrapToast.Body>{content}</BootstrapToast.Body>
    </BootstrapToast>
  </ToastContainer>
);

const success = (content: React.ReactNode) => {
  return <ToastComponent content={content} />;
};

const error = (content: React.ReactNode) => {
  return <ToastComponent content={content} />;
};

const info = (content: React.ReactNode) => {
  return <ToastComponent content={content} />;
};

const Toast = {
  success,
  error,
  info,
};

export default Toast;
