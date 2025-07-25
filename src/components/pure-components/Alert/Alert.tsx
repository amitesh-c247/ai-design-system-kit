import React, { useState, useEffect } from 'react';
import { Alert as BootstrapAlert, Button } from 'react-bootstrap';
import { X } from 'lucide-react';
import styles from './styles.module.scss';

export interface AlertLink {
  label: string;
  to: string;
  openExternalLinkInNewTab?: boolean;
}

export interface AlertProps {
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  message: string;
  showIcon?: boolean;
  closable?: boolean;
  links?: AlertLink[];
  persistCloseId?: string;
  className?: string;
  heading?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const usePersistedClosedAlert = (id: string) => {
  const [isAlertAlreadyClosed, setIsAlertAlreadyClosed] = useState(false);

  useEffect(() => {
    const closedAlerts = localStorage.getItem('closedAlerts');
    if (closedAlerts) {
      const parsed = JSON.parse(closedAlerts);
      setIsAlertAlreadyClosed(parsed.includes(id));
    }
  }, [id]);

  const reset = () => {
    const closedAlerts = localStorage.getItem('closedAlerts');
    if (closedAlerts) {
      const parsed = JSON.parse(closedAlerts);
      const filtered = parsed.filter((alertId: string) => alertId !== id);
      localStorage.setItem('closedAlerts', JSON.stringify(filtered));
      setIsAlertAlreadyClosed(false);
    }
  };

  return { isAlertAlreadyClosed, reset };
};

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  message,
  showIcon = true,
  closable = false,
  links = [],
  persistCloseId,
  className = '',
  heading,
  action,
}) => {
  const [show, setShow] = useState(true);
  const { isAlertAlreadyClosed } = usePersistedClosedAlert(persistCloseId || '');

  if (isAlertAlreadyClosed) {
    return null;
  }

  const handleClose = () => {
    setShow(false);
    if (persistCloseId) {
      const closedAlerts = localStorage.getItem('closedAlerts');
      const parsed = closedAlerts ? JSON.parse(closedAlerts) : [];
      if (!parsed.includes(persistCloseId)) {
        localStorage.setItem('closedAlerts', JSON.stringify([...parsed, persistCloseId]));
      }
    }
  };

  if (!show) {
    return null;
  }

  return (
    <BootstrapAlert
      variant={type}
      onClose={closable ? handleClose : undefined}
      dismissible={closable}
      className={`${styles.alert} ${className}`}
    >
      {heading && <BootstrapAlert.Heading>{heading}</BootstrapAlert.Heading>}
      <div className={styles.content}>
        {message}
        {links.length > 0 && (
          <div className={styles.links}>
            {links.map((link, index) => (
              <React.Fragment key={link.to}>
                <a
                  href={link.to}
                  target={link.openExternalLinkInNewTab ? '_blank' : undefined}
                  rel={link.openExternalLinkInNewTab ? 'noopener noreferrer' : undefined}
                  className={styles.link}
                >
                  {link.label}
                </a>
                {index < links.length - 1 && <span className={styles.divider}>•</span>}
              </React.Fragment>
            ))}
          </div>
        )}
        {action && (
          <Button
            variant={type === 'light' ? 'primary' : 'light'}
            size="sm"
            className={styles.actionButton}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </div>
    </BootstrapAlert>
  );
};

export { usePersistedClosedAlert };
export default Alert; 