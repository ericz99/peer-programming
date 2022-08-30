import React from "react";

interface TextProps {
  className?: string;
  isActive?: boolean;
}

export const TreeList: React.FC<TextProps> = ({ className, children }) => {
  return <ul className={className}>{children}</ul>;
};
