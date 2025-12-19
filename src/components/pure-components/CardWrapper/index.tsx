import React from "react";
import { Card } from "react-bootstrap";
import classNames from "classnames";

interface CardWrapperProps {
  title: React.ReactNode;
  onCreate?: () => void;
  createButtonText?: React.ReactNode;
  className?: string;
}

const CardWrapper: React.FC<React.PropsWithChildren<CardWrapperProps>> = ({
  title,
  onCreate,
  createButtonText,
  children,
  className = "",
}) => (
  <Card className={classNames("mb-3 shadow-sm", className)}>
    <Card.Header className="d-flex justify-content-between align-items-center gap-3">
      <h4 className="mb-0">{title}</h4>
      {onCreate && createButtonText && (
        <button className="btn btn-primary" onClick={onCreate}>
          {createButtonText}
        </button>
      )}
    </Card.Header>
    <Card.Body>{children}</Card.Body>
  </Card>
);

export default CardWrapper;
