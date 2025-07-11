import React from "react";
import { Button } from "react-bootstrap";
import classnames from "classnames";
import NextLink from "next/link";
import styles from "./styles.module.scss";

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: "tertiary" | "standalone" | "inline" | "inlineIcon" | "button";
  emphasized?: boolean;
  icon?: React.ReactElement;
  iconPosition?: "start" | "end";
  openExternalLinkInNewTab?: boolean;
  isDisabled?: boolean;
}

const isUrl = (path: string): boolean => {
  return path.startsWith("http://") || path.startsWith("https://");
};

const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({
  href,
  icon,
  title,
  className,
  onClick,
  variant = "tertiary",
  emphasized = false,
  iconPosition = "start",
  children,
  openExternalLinkInNewTab,
  isDisabled,
  ...props
}) => {
  const isExternalLink = isUrl(href);

  const linkContent = (
    <>
      {icon && iconPosition === "start" && <span className="me-1">{icon}</span>}
      {children}
      {icon && iconPosition === "end" && <span className="ms-1">{icon}</span>}
    </>
  );

  const linkClassName = classnames(className, styles.link, {
    [styles.tertiary]: variant === "tertiary",
    [styles.emphasized]: emphasized,
    [styles.standalone]: variant === "standalone",
    [styles.inline]: variant === "inline",
    [styles.inlineIcon]: variant === "inlineIcon",
    [styles.disabled]: isDisabled,
  });

  if (variant === "button") {
    if (isExternalLink) {
      return (
        <Button
          as="a"
          href={href}
          target={openExternalLinkInNewTab ? "_blank" : undefined}
          rel={openExternalLinkInNewTab ? "noopener noreferrer" : undefined}
          disabled={isDisabled}
          className={linkClassName}
          onClick={
            onClick as unknown as React.MouseEventHandler<HTMLButtonElement>
          }
        >
          {linkContent}
        </Button>
      );
    }

    return (
      <NextLink href={href} passHref legacyBehavior>
        <Button
          as="a"
          disabled={isDisabled}
          className={linkClassName}
          onClick={
            onClick as unknown as React.MouseEventHandler<HTMLButtonElement>
          }
        >
          {linkContent}
        </Button>
      </NextLink>
    );
  }

  if (isExternalLink) {
    return (
      <a
        href={href}
        target={openExternalLinkInNewTab ? "_blank" : undefined}
        rel={openExternalLinkInNewTab ? "noopener noreferrer" : undefined}
        title={title}
        className={linkClassName}
        onClick={onClick}
        aria-disabled={isDisabled}
        {...props}
      >
        {linkContent}
      </a>
    );
  }

  return (
    <NextLink href={href} passHref legacyBehavior>
      <a
        title={title}
        className={linkClassName}
        onClick={onClick}
        aria-disabled={isDisabled}
        {...props}
      >
        {linkContent}
      </a>
    </NextLink>
  );
};

export default Link;
