import React from 'react';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';
import { Link as RouterLink, To } from 'react-router-dom';
import styles from './styles.module.scss';

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string | To;
  variant?: 'tertiary' | 'standalone' | 'inline' | 'inlineIcon' | 'button';
  emphasized?: boolean;
  icon?: React.ReactElement;
  iconPosition?: 'start' | 'end';
  openExternalLinkInNewTab?: boolean;
  state?: Record<string, any>;
  isDisabled?: boolean;
}

const isUrl = (path: string | To): boolean => {
  if (typeof path === 'string') {
    return path.startsWith('http://') || path.startsWith('https://');
  }
  return false;
};

const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({
  to,
  icon,
  title,
  className,
  onClick,
  variant = 'tertiary',
  emphasized = false,
  iconPosition = 'start',
  children,
  openExternalLinkInNewTab,
  state,
  isDisabled,
  ...props
}) => {
  const isExternalLink = isUrl(to);
  const LinkComponent = isExternalLink ? 'a' : RouterLink;
  const linkProps = isExternalLink
    ? {
        href: to as string,
        target: openExternalLinkInNewTab ? '_blank' : undefined,
        rel: openExternalLinkInNewTab ? 'noopener noreferrer' : undefined,
      }
    : {
        to,
        state,
      };

  const linkContent = (
    <>
      {icon && iconPosition === 'start' && <span className="me-1">{icon}</span>}
      {children}
      {icon && iconPosition === 'end' && <span className="ms-1">{icon}</span>}
    </>
  );

  if (variant === 'button') {
    return (
      <Button
        as={LinkComponent}
        {...linkProps}
        title={title}
        disabled={isDisabled}
        className={classnames(className, styles.link)}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        {...props}
      >
        {linkContent}
      </Button>
    );
  }

  return (
    <LinkComponent
      {...linkProps}
      title={title}
      aria-disabled={isDisabled}
      className={classnames(className, styles.link, {
        [styles.tertiary]: variant === 'tertiary',
        [styles.emphasized]: emphasized,
        [styles.standalone]: variant === 'standalone',
        [styles.inline]: variant === 'inline',
        [styles.inlineIcon]: variant === 'inlineIcon',
        [styles.disabled]: isDisabled,
      })}
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      {...props}
    >
      {linkContent}
    </LinkComponent>
  );
};

export default Link;
