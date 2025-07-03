import React, { useState, cloneElement, isValidElement } from "react";
import {
  OverlayTrigger,
  Tooltip as RbTooltip,
  OverlayTriggerProps,
  TooltipProps as RbTooltipProps,
} from "react-bootstrap";

export interface TooltipProps extends Omit<RbTooltipProps, "children" | "title"> {
  title: React.ReactNode;
  placement?: OverlayTriggerProps["placement"];
  children: React.ReactElement<any>;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  placement = "top",
  children,
  ...rest
}) => {
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => setShow(true);
  const handleMouseLeave = () => setShow(false);

  const childWithHandlers = isValidElement(children)
    ? cloneElement(children, {
        onMouseEnter: (e: React.MouseEvent) => {
          handleMouseEnter();
          children.props.onMouseEnter?.(e);
        },
        onMouseLeave: (e: React.MouseEvent) => {
          handleMouseLeave();
          children.props.onMouseLeave?.(e);
        },
      })
    : children;

  return (
    <OverlayTrigger
      placement={placement}
      overlay={<RbTooltip id="common-tooltip" {...rest}>{title}</RbTooltip>}
      show={show}
      {...rest}
    >
      {childWithHandlers}
    </OverlayTrigger>
  );
};

export default Tooltip;
