import React from "react";
import { Breadcrumb as BootstrapBreadcrumb } from "react-bootstrap";
import NextLink from "next/link";
import type { BreadcrumbProps } from "./types";
import styles from "./styles.module.scss";

// Conditional Link component for breadcrumbs
const ConditionalBreadcrumbLink: React.FC<
  React.PropsWithChildren<{ href?: string }>
> = ({ href, children }) => {
  if (!href || href.trim() === "") {
    return <span>{children}</span>;
  }

  return (
    <NextLink href={href} passHref legacyBehavior>
      <a>{children}</a>
    </NextLink>
  );
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ crumbs, className }) => {
  return (
    <BootstrapBreadcrumb className={`${styles.breadcrumbs} ${className || ""}`}>
      {crumbs.map(({ link, title }, index) => {
        const isLastBreadcrumb = index === crumbs.length - 1;

        return (
          <BootstrapBreadcrumb.Item
            key={`${link}-${title}`}
            linkAs={ConditionalBreadcrumbLink}
            linkProps={{ href: link }}
            active={isLastBreadcrumb}
            className={styles.breadcrumbItem}
          >
            {title}
          </BootstrapBreadcrumb.Item>
        );
      })}
    </BootstrapBreadcrumb>
  );
};

export default Breadcrumb;
