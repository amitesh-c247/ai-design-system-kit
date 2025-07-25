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
