import React from 'react';
import { Breadcrumb as BootstrapBreadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export interface BreadcrumbProps {
  crumbs: {
    link: string;
    title: string;
  }[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ crumbs, className }) => {
  return (
    <BootstrapBreadcrumb className={`${styles.breadcrumbs} ${className || ''}`}>
      {crumbs.map(({ link, title }, index) => {
        const isLastBreadcrumb = index === crumbs.length - 1;
        return (
          <BootstrapBreadcrumb.Item
            key={`${link}-${title}`}
            linkAs={isLastBreadcrumb ? 'span' : Link}
            linkProps={isLastBreadcrumb ? undefined : { to: link }}
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
