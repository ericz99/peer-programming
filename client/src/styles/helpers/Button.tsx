import React from "react";

interface TextProps {
  className?: string;
  fontSize?: any;
  color?: string;
}

export const Button: React.FC<TextProps> = ({ className, children }) => {
  return <button className={className}>{children}</button>;
};
