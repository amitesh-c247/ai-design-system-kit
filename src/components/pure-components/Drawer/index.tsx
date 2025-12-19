import React from "react";
import { Offcanvas } from "react-bootstrap";
import classnames from "classnames";


interface DrawerProps {
  show: boolean;
  onHide: () => void;
  placement?: "top" | "bottom" | "end" | "start";
  title?: React.ReactNode;
  className?: string;
  minHeight?: string;
  maxHeight?: string;
  height?: string;
  backdrop?: boolean;
  scrollable?: boolean;
  closeButton?: boolean;
}

const Drawer: React.FC<React.PropsWithChildren<DrawerProps>> = ({
  show,
  onHide,
  placement = "bottom",
  title,
  children,
  className,
  minHeight = "35%",
  maxHeight = "95%",
  height,
  backdrop = true,
  scrollable = true,
  closeButton = true,
  ...props
}) => {
  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement={placement}
      backdrop={backdrop}
      scrollable={scrollable}
      className={className}
      style={{
        minHeight: minHeight,
        maxHeight: maxHeight,
        height: height ?? "auto",
      }}
      {...props}
    >
      {title && (
        <Offcanvas.Header closeButton={closeButton}>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
      )}
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default Drawer;
