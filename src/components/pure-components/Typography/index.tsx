import React from "react";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
}

const Typography: React.FC<React.PropsWithChildren<TypographyProps>> = ({
  children,
  variant = "p",
  className = "",
  style,
}) => {
  const Component = variant;

  return (
    <Component className={className} style={style}>
      {children}
    </Component>
  );
};

export default Typography;
