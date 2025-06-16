import classnames from 'classnames';
import React, { forwardRef, Ref } from 'react';
import styles from './styles.module.scss';

export interface SpaceProps {
  className?: string;
  /** Make element as wide to its parent */
  block?: boolean;
  justify?: React.CSSProperties['justifyContent'];
  size?: number | string;
  align?: React.CSSProperties['alignItems'];
  /**  Whether flex items are forced onto one line or can wrap onto multiple lines */
  wrap?: boolean;
  /** The direction of the flex container, as well as its wrapping behavior */
  flowWrap?: boolean;
  /** A component/node/text... to be inserted between 2 components.
   *
   * I.e. a `Space` component wrapping 2 divs with NEW and SPACE with `separator={<Divider type="vertical"` will be displayed as `NEW | SPACE`. */
  separator?: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  id?: string;
  ref?: Ref<HTMLDivElement>;
  style?: React.CSSProperties;
}

const Space = forwardRef<HTMLDivElement, React.PropsWithChildren<SpaceProps>>(
  (
    {
      block,
      className,
      justify,
      align,
      size = '0.5rem',
      children,
      direction = 'horizontal',
      wrap,
      flowWrap,
      separator: split,
      style,
      ...props
    },
    ref,
  ) => {
    const mergedAlign = !align && direction === 'horizontal' ? 'center' : align;
    const flexDirection = direction === 'vertical' ? 'column' : 'row';

    return (
      <div
        className={classnames(styles.space, className, {
          [styles.block]: block,
        })}
        style={{
          flexDirection,
          justifyContent: justify,
          alignItems: mergedAlign,
          ...(wrap && {
            flexWrap: 'wrap',
          }),
          ...(flowWrap && {
            flexFlow: 'wrap',
          }),
          gap: size,
          ...style,
        }}
        ref={ref}
        {...props}
      >
        {split
          ? React.Children.map(children as React.ReactElement[], (child, index) => (
              <React.Fragment key={child.key ?? index}>
                {child}
                {index < (children as React.ReactElement[]).length - 1 && (
                  <span className="space-split">{split}</span>
                )}
              </React.Fragment>
            ))
          : children}
      </div>
    );
  },
);

export default Space;
