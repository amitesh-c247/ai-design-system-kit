import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';
import classnames from 'classnames';
import { useLocalStorage } from 'usehooks-ts';
import Link from '../Link';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  LoaderIcon,
} from '../Icons';
import styles from './styles.module.scss';

export const PERSISTED_CLOSED_ALERTS_STORAGE_KEY = 'alerts-closed';
const PERSISTED_CLOSED_ALERTS_INITIAL_STATE: string[] = [];

const usePersistedClosedAlert = (persistCloseId?: string) => {
  const [persistedClosedAlerts, setPersistedClosedAlerts] = useLocalStorage<string[]>(
    PERSISTED_CLOSED_ALERTS_STORAGE_KEY,
    PERSISTED_CLOSED_ALERTS_INITIAL_STATE,
  );

  const reset = () => setPersistedClosedAlerts(PERSISTED_CLOSED_ALERTS_INITIAL_STATE);

  const isAlertAlreadyClosed = persistCloseId
    ? persistedClosedAlerts.includes(persistCloseId)
    : false;

  const closeAlert = () => {
    if (!persistCloseId) {
      throw new Error('No alert id provided to close');
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

export interface AlertProps {
  className?: string;
  color?: 'grey';
  type?: 'success' | 'info' | 'warning' | 'error' | 'loading';
  isInline?: boolean;
  message?: React.ReactNode;
  description?: React.ReactNode;
  showIcon?: boolean;
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Links to be displayed next to the alert message */
  links?: [AlertLink?, AlertLink?];
  /** Persists the close of the alert in the local storage until the user clears the cache.
   *
   * NOTE: use a unique id for each alert that you want to persist, indicating the location of the alert, the status, and the id of the entity
   * e.g. `resource-propagation-last-resource-levels-${lastPropagation.id}-${lastPropagation.status}`
   * */
  persistCloseId?: string;
}

/**
 * When adding a message with links, make sure to use 16px separation between the link and the end of the text
 */
const Alert: React.FC<AlertProps> = ({
  className,
  type,
  color,
  isInline,
  showIcon = true,
  message,
  description,
  links,
  onClose,
  persistCloseId,
  ...props
}) => {
  const { isAlertAlreadyClosed, closeAlert } = usePersistedClosedAlert(persistCloseId);

  const hideAlert = Boolean(persistCloseId) && isAlertAlreadyClosed;

  const typeProps = {
    info: {
      icon: <Info size={16} />,
      className: styles['color-grey'],
      variant: 'info',
    },
    error: {
      icon: <AlertCircle size={16} />,
      variant: 'danger',
    },
    warning: {
      icon: <AlertTriangle size={16} />,
      variant: 'warning',
    },
    success: {
      icon: <CheckCircle size={16} />,
      variant: 'success',
    },
    loading: {
      icon: <LoaderIcon size={16} className={styles.loader} />,
      className: styles['color-blue'],
      variant: 'info',
    },
  }[type || 'info'];

  if (hideAlert) return null;

  const onCloseAlert = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (persistCloseId) {
      closeAlert();
    }
    onClose?.(event);
  };

  return (
    <BootstrapAlert
      variant={typeProps.variant}
      className={classnames(styles.alert, typeProps.className, className, {
        [styles.inline]: isInline,
      })}
      onClose={onCloseAlert}
      dismissible={!!onClose}
      {...props}
    >
      {showIcon && typeProps.icon && (
        <div className="me-2">{typeProps.icon}</div>
      )}
      <div>
        {message && <div className={styles['alert-message']}>{message}</div>}
        {description && <div className={styles['alert-description']}>{description}</div>}
        {links && links.length > 0 && (
          <div className="mt-2">
            {links.filter((link): link is AlertLink => !!link).map(({ to, label, openExternalLinkInNewTab }) => (
              <Link
                key={JSON.stringify(to)}
                to={to}
                variant="standalone"
                openExternalLinkInNewTab={openExternalLinkInNewTab}
                className="me-3"
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </BootstrapAlert>
  );
};

export default Alert;
