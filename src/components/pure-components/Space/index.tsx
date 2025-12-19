import classnames from "classnames";
import React, { forwardRef, Ref } from "react";
import type { SpaceProps } from "./types";

const Space = forwardRef<HTMLDivElement, React.PropsWithChildren<SpaceProps>>(
  (
    {
      block,
      className,
      justify,
      align,
      size = "0.5rem",
      children,
      direction = "horizontal",
      wrap,
      flowWrap,
      separator: split,
      style,
      ...props
    },
    ref
  ) => {
    const mergedAlign = !align && direction === "horizontal" ? "center" : align;
    const flexDirection = direction === "vertical" ? "column" : "row";

    return (
      <div
        className={classnames(
          "d-flex",
          {
            "w-100": block,
          },
          className
        )}
        style={{
          flexDirection,
          justifyContent: justify,
          alignItems: mergedAlign,
          ...(wrap && {
            flexWrap: "wrap",
          }),
          ...(flowWrap && {
            flexFlow: "wrap",
          }),
          gap: size,
          ...style,
        }}
        ref={ref}
        {...props}
      >
        {split
          ? React.Children.map(children, (child, index) => (
              <React.Fragment
                key={React.isValidElement(child) ? child.key ?? index : index}
              >
                {child}
                {index < React.Children.count(children) - 1 && (
                  <span className="space-split">{split}</span>
                )}
              </React.Fragment>
            ))
          : children}
      </div>
    );
  }
);

export default Space;
