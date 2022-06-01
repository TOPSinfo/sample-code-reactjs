import React from "react";

interface UIModalFooterProps {
  children: JSX.Element | JSX.Element[];
  buttonAlignments?: "center" | "space-around" | "space-between" | "space-end";
  className?: string;
}

export const UIModalFooter: React.FC<UIModalFooterProps> = ({
  children,
  className,
  buttonAlignments
}) => {
  return <div className={buttonAlignments + " " + className}>{children}</div>;
};
export default UIModalFooter;
