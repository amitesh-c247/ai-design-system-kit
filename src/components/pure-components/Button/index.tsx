import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'icon' | 'iconBordered' | 'danger' | 'link' | 'inlineIcon';
export type ButtonSize = 'default' | 'large';

export interface ButtonProps extends Omit<React.ComponentProps<typeof BootstrapButton>, 'variant' | 'size'> {
  /** The visual style of the button */
  variant?: ButtonVariant;
  /** The size of the button */
  size?: ButtonSize;
  /** Icon to display in the button */
  icon?: React.ReactElement;
  /** Position of the icon relative to the text */
  iconPosition?: 'left' | 'right';
  /** Make button full width */
  block?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'secondary',
      size = 'default',
      icon,
      children,
      className,
      iconPosition = 'left',
      block = false,
      ...otherProps
    },
    ref,
  ) => {
    const featherIconSize = size === 'default' ? 16 : 24;
    const classNames = classnames(
      styles.button,
      styles[`size-button-${size}`],
      {
        [styles[`type-${variant}`]]: Boolean(variant),
        [styles[`size-button-${variant}-${size}`]]: variant === 'icon' || variant === 'iconBordered',
        [styles.block]: block,
        'w-100': block,
      },
      className,
    );

    const getBootstrapVariant = (variant: ButtonVariant): string => {
      switch (variant) {
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

    // Remove block from otherProps so it doesn't get passed to BootstrapButton
    const { block: _block, ...restProps } = otherProps;

    return (
      <BootstrapButton
        variant={getBootstrapVariant(variant)}
        size={size === 'large' ? 'lg' : undefined}
        className={classNames}
        ref={ref}
        {...restProps}
      >
        {icon ? (
          <div className={styles.buttonWithIcon}>
            {iconPosition === 'left' && (
              <>
                {React.cloneElement(icon, {
                  size: featherIconSize,
                  className: classnames(styles[`size-icon-${size}`], icon.props.className, {
                    [styles.hideIconOnLoading]:
                      (variant === 'icon' || variant === 'iconBordered') && otherProps.disabled,
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
                      (variant === 'icon' || variant === 'iconBordered') && otherProps.disabled,
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
