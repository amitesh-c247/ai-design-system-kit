import React from "react";
import { Button } from "react-bootstrap";
import classnames from "classnames";
import NextLink from "next/link";
import type { LinkProps } from "./types";

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

  const linkClassName = classnames(className, {
    'text-primary text-decoration-none': variant === "tertiary",
    'fw-bold': emphasized,
    'd-inline-block': variant === "standalone",
    'd-inline': variant === "inline",
    'd-inline-flex align-items-center': variant === "inlineIcon",
    'text-muted text-decoration-none': isDisabled,
    'text-primary': !isDisabled && variant !== "tertiary",
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
