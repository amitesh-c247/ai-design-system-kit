import React, { useState, useEffect } from "react";
import { Toast as BootstrapToast, ToastContainer } from "react-bootstrap";
import styles from "./styles.module.scss";

export interface ToastProps {
  show?: boolean;
  title?: string;
  message?: string;
  variant?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
  autoHide?: boolean;
  delay?: number;
  position?:
    | "top-end"
    | "top-start"
    | "bottom-end"
    | "bottom-start"
    | "top-center"
    | "bottom-center";
}

const Toast: React.FC<ToastProps> = ({
  show = false,
  title,
  message,
  variant = "info",
  onClose,
  autoHide = true,
  delay = 3000,
  position = "top-end",
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return "bg-success text-white";
      case "error":
        return "bg-danger text-white";
      case "warning":
        return "bg-warning text-dark";
      case "info":
        return "bg-info text-white";
      default:
        return "bg-info text-white";
    }
  };

  if (!isVisible) return null;

  return (
    <ToastContainer position={position} className="p-3">
      <BootstrapToast
        onClose={handleClose}
        delay={autoHide ? delay : undefined}
        autohide={autoHide}
        className={getVariantClass()}
      >
        {title && (
          <BootstrapToast.Header closeButton>
            <strong className="me-auto">{title}</strong>
          </BootstrapToast.Header>
        )}
        <BootstrapToast.Body>{message}</BootstrapToast.Body>
      </BootstrapToast>
    </ToastContainer>
  );
};

export default Toast;
