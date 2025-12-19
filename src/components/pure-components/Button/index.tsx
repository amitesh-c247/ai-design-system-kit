import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import classnames from 'classnames';

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
      'd-inline-flex',
      'align-items-center',
      'justify-content-center',
      'gap-1',
      {
        'w-100': block,
        'rounded-circle': variant === 'icon' || variant === 'iconBordered',
        'p-2': variant === 'icon' || variant === 'iconBordered',
        'border': variant === 'iconBordered',
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
          <div className="d-inline-flex align-items-center gap-1">
            {iconPosition === 'left' && (
              <>
                {React.cloneElement(icon, {
                  size: featherIconSize,
                  className: classnames(
                    size === 'default' ? 'w-4' : 'w-6',
                    icon.props.className,
                    {
                      'opacity-0': (variant === 'icon' || variant === 'iconBordered') && otherProps.disabled,
                    }
                  ),
                })}
                {children}
              </>
            )}
            {iconPosition === 'right' && (
              <>
                {children}
                {React.cloneElement(icon, {
                  size: featherIconSize,
                  className: classnames(
                    size === 'default' ? 'w-4' : 'w-6',
                    icon.props.className,
                    {
                      'opacity-0': (variant === 'icon' || variant === 'iconBordered') && otherProps.disabled,
                    }
                  ),
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
