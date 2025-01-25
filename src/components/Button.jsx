import { Link, NavLink } from "react-router-dom";

const Button = ({
  children,
  as = "button",
  type = "button",
  to = "",
  style = 1,
  size = "md",
  className,
  ...props
}) => {
  const styles = {
    1: "bg-accent text-primary",
    2: "bg-neutral text-secondary",
  };

  const sizes = {
    sm: "h-9 px-4 text-base",
    md: "h-10 px-4 text-lg",
    lg: "h-12 px-5 text-lg",
  };

  const classes = `leading-tight font-semibold transition-all rounded-lg hover:animate-pulse active:scale-95 flex items-center justify-center ${
    styles[style] || styles[1]
  } ${sizes[size] || sizes["md"]}${className ? ` ${className}` : ""}`;

  if (as === "link") {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (as === "navlink") {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${classes}${isActive ? " pointer-events-none" : ""}`
        }
        {...props}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
