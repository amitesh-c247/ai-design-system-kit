import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'icon' | 'iconBordered' | 'danger' | 'link' | 'inlineIcon';
export type ButtonSize = 'default' | 'large';

export interface ButtonProps extends Omit<React.ComponentProps<typeof BootstrapButton>, 'variant' | 'size'> {
  /** The visual style of the button */
  type?: ButtonVariant;
  /** The size of the button */
  size?: ButtonSize;
  /** Icon to display in the button */
  icon?: React.ReactElement;
  /** Position of the icon relative to the text */
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'secondary',
      size = 'default',
      icon,
      children,
      className,
      iconPosition = 'left',
      ...otherProps
    },
    ref,
  ) => {
    const featherIconSize = size === 'default' ? 16 : 24;
    const classNames = classnames(
      styles.button,
      styles[`size-button-${size}`],
      {
        [styles[`type-${type}`]]: Boolean(type),
        [styles[`size-button-${type}-${size}`]]: type === 'icon' || type === 'iconBordered',
        [styles.block]: otherProps?.block,
      },
      className,
    );

    const getBootstrapVariant = (type: ButtonVariant): string => {
      switch (type) {
        case 'primary':
          return 'primary';
        case 'secondary':
          return 'outline-primary';
        case 'tertiary':
          return 'link';
        case 'danger':
          return 'danger';
        case 'link':
          return 'link';
        default:
          return 'outline-primary';
      }
    };

    return (
      <BootstrapButton
        variant={getBootstrapVariant(type)}
        size={size === 'large' ? 'lg' : undefined}
        className={classNames}
        ref={ref}
        {...otherProps}
      >
        {icon ? (
          <div className={styles.buttonWithIcon}>
            {iconPosition === 'left' && (
              <>
                {React.cloneElement(icon, {
                  size: featherIconSize,
                  className: classnames(styles[`size-icon-${size}`], icon.props.className, {
                    [styles.hideIconOnLoading]:
                      (type === 'icon' || type === 'iconBordered') && otherProps.disabled,
                  }),
                })}
                {children}
              </>
            )}
            {iconPosition === 'right' && (
              <>
                {children}
                {React.cloneElement(icon, {
                  size: featherIconSize,
                  className: classnames(styles[`size-icon-${size}`], icon.props.className, {
                    [styles.hideIconOnLoading]:
                      (type === 'icon' || type === 'iconBordered') && otherProps.disabled,
                  }),
                })}
              </>
            )}
          </div>
        ) : (
          children
        )}
      </BootstrapButton>
    );
  },
);

Button.displayName = 'Button';

export default Button;
