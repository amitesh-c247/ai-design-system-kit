import classnames from 'classnames';
import { ElementType } from 'react';
import styles from './styles.module.scss';

export interface TypographyProps {
  /** Sets the style of the text */
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h5'
    | 'h6'
    | 'h7'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'small'
    | 'tiny';
  color?:
    | 'text'
    | 'primary'
    | 'secondary'
    | 'disabled'
    | 'link'
    | 'inverted'
    | 'error'
    | 'success'
    | 'warning';
  /** Underlying component or HTML tag to use */
  component?: ElementType | React.FC<React.ComponentPropsWithoutRef<ElementType>>;
  breakWhiteSpace?: boolean;
  ellipsis?: boolean;
  title?: string;
  noMargin?: boolean;
}

const Typography: React.FC<
  React.ComponentPropsWithRef<
    TypographyProps & React.FC<React.ComponentPropsWithoutRef<ElementType>>
  >
> = ({
  variant = 'body1',
  component = 'div',
  color,
  children,
  className,
  breakWhiteSpace,
  ellipsis,
  title,
  noMargin,
  ...otherProps
}) => {
  const Component = component as React.FC<
    React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>
  >;
  return (
    <Component
      className={classnames(
        styles[`variant-${variant}`],
        {
          [styles[`color-${color}`]]: Boolean(color),
          [styles.whitespace]: breakWhiteSpace,
          [styles.ellipsis]: ellipsis,
          [styles.noMargin]: noMargin,
        },
        className,
      )}
      title={title}
      {...otherProps}
    >
      {children}
    </Component>
  );
};

export default Typography;
