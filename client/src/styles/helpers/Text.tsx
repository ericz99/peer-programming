import React from "react";

interface TextProps {
  className?: string;
  fontSize?: any;
  color?: string;
}

export const Text: React.FC<TextProps> = ({ className, children }) => {
  return <p className={className}>{children}</p>;
};
