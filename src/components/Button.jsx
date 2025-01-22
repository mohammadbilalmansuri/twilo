import { memo } from "react";
import { Link } from "react-router-dom";
import formatClasses from "../utils/formatClasses";

const Button = ({
  children,
  as = "button",
  type = "button",
  to = "",
  style = 1,
  padding = "md",
  fontSize = "base",
  className = "",
  ...props
}) => {
  const baseClasses = `text-${fontSize} font-semibold transition-all rounded-lg hover:animate-pulse active:scale-95`;
  const styleClasses = {
    1: "bg-accent text-primary",
    2: "bg-neutral text-secondary",
    3: "bg-secondary text-primary",
  };
  const paddingClasses = {
    sm: "py-1.5 px-3",
    md: "py-2 px-4",
    lg: "py-3 px-5",
  };

  const combinedClasses = formatClasses(
    `${baseClasses} ${styleClasses[style]} ${paddingClasses[padding]} ${className}`
  );

  return as === "button" ? (
    <button type={type} className={combinedClasses} {...props}>
      {children}
    </button>
  ) : (
    <Link to={to} className={combinedClasses} {...props}>
      {children}
    </Link>
  );
};

export default memo(Button);
