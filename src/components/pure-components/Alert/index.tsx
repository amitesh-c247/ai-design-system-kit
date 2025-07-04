import React from "react";
import { Alert as BootstrapAlert } from "react-bootstrap";
import classnames from "classnames";
import { useLocalStorage } from "usehooks-ts";
import Link from "../Link";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  LoaderIcon,
} from "../Icons";
import styles from "./styles.module.scss";

export const PERSISTED_CLOSED_ALERTS_STORAGE_KEY = "alerts-closed";
const PERSISTED_CLOSED_ALERTS_INITIAL_STATE: string[] = [];

const usePersistedClosedAlert = (persistCloseId?: string) => {
  const [persistedClosedAlerts, setPersistedClosedAlerts] = useLocalStorage<
    string[]
  >(PERSISTED_CLOSED_ALERTS_STORAGE_KEY, PERSISTED_CLOSED_ALERTS_INITIAL_STATE);

  const reset = () =>
    setPersistedClosedAlerts(PERSISTED_CLOSED_ALERTS_INITIAL_STATE);

  const isAlertAlreadyClosed = persistCloseId
    ? persistedClosedAlerts.includes(persistCloseId)
    : false;

  const closeAlert = () => {
    if (!persistCloseId) {
      throw new Error("No alert id provided to close");
    } else if (isAlertAlreadyClosed) {
      return;
    } else {
      setPersistedClosedAlerts((prev: string[]) => [...prev, persistCloseId]);
    }
  };

  return {
    persistedClosedAlerts,
    setPersistedClosedAlerts,
    reset,
    isAlertAlreadyClosed,
    closeAlert,
  };
};

export interface AlertLink {
  to: string;
  label: string;
  openExternalLinkInNewTab?: boolean;
}

interface AlertProps {
  type?: string;
  inline?: boolean;
  className?: string;
  onClose?: () => void;
}

const Alert: React.FC<React.PropsWithChildren<AlertProps>> = ({
  children,
  type = "grey",
  inline = false,
  className = "",
  onClose,
}) => {
  const typeClass = `color${type.charAt(0).toUpperCase() + type.slice(1)}`;

  return (
    <div
      className={`${styles.alert} ${styles[typeClass]} ${
        inline ? styles.inline : ""
      } ${className}`}
    >
      <div className={styles.content}>{children}</div>
      {onClose && (
        <button
          type="button"
          className={styles.alertCloseIcon}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
