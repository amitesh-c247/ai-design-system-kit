import React, { useState, cloneElement, isValidElement } from "react";
import {
  OverlayTrigger,
  Tooltip as RbTooltip,
  OverlayTriggerProps,
  TooltipProps as RbTooltipProps,
} from "react-bootstrap";
import type { TooltipProps } from "./types";

const Tooltip: React.FC<TooltipProps> = ({
  title,
  placement = "top",
  children,
  onToggle,
  ...rest
}) => {
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => setShow(true);
  const handleMouseLeave = () => setShow(false);

  const childWithHandlers = isValidElement(children)
    ? cloneElement(children, {
        onMouseEnter: (e: React.MouseEvent) => {
          handleMouseEnter();
          (children as React.ReactElement).props.onMouseEnter?.(e);
        },
        onMouseLeave: (e: React.MouseEvent) => {
          handleMouseLeave();
          (children as React.ReactElement).props.onMouseLeave?.(e);
        },
      } as any)
    : children;

  return (
    <OverlayTrigger
      placement={placement}
      overlay={
        <RbTooltip id="common-tooltip" style={{ zIndex: 9999 }} {...rest}>
          {title}
        </RbTooltip>
      }
      show={show}
    >
      {childWithHandlers}
    </OverlayTrigger>
  );
};

export default Tooltip;
