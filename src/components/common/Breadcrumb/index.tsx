import React from 'react';
import { Breadcrumb as BootstrapBreadcrumb } from 'react-bootstrap';
import NextLink from 'next/link';
import styles from './styles.module.scss';

export interface BreadcrumbProps {
  crumbs: {
    link: string;
    title: string;
  }[];
  className?: string;
}

// Custom Link component for breadcrumbs
const BreadcrumbLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <NextLink href={href} passHref legacyBehavior>
    <a>{children}</a>
  </NextLink>
);

const Breadcrumb: React.FC<BreadcrumbProps> = ({ crumbs, className }) => {
  return (
    <BootstrapBreadcrumb className={`${styles.breadcrumbs} ${className || ''}`}>
      {crumbs.map(({ link, title }, index) => {
        const isLastBreadcrumb = index === crumbs.length - 1;
        return (
          <BootstrapBreadcrumb.Item
            key={`${link}-${title}`}
            linkAs={isLastBreadcrumb ? 'span' : BreadcrumbLink}
            linkProps={isLastBreadcrumb ? undefined : { href: link }}
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
