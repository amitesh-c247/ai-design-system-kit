import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  style?: React.CSSProperties;
}

const Typography: React.FC<TypographyProps> = ({ 
  children, 
  variant = 'p', 
  className = '', 
  style 
}) => {
  const Component = variant;
  
  return (
    <Component className={className} style={style}>
      {children}
    </Component>
  );
};

export default Typography; 