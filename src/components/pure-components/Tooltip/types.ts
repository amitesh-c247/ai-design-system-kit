import {
  OverlayTriggerProps,
  TooltipProps as RbTooltipProps,
} from "react-bootstrap";

export interface TooltipProps
  extends Omit<RbTooltipProps, "children" | "title"> {
  title: React.ReactNode;
  placement?: OverlayTriggerProps["placement"];
  children: React.ReactElement<any>;
}
