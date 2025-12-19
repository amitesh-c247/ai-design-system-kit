import React from "react";
import { Container } from "react-bootstrap";
import classnames from "classnames";
import type { DividerProps } from "./types";

const Divider: React.FC<DividerProps> = ({
  className,
  noMargin,
  vertical,
  variant,
  ...props
}) => {
  return (
    <Container
      fluid
      className={classnames(
        {
          "d-flex": vertical,
          "my-0": noMargin,
        },
        className
      )}
      {...props}
    >
      <hr className={vertical ? "vr" : "hr"} />
    </Container>
  );
};

export default Divider;
