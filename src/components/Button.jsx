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
    1: "bg-blue text-white hover:bg-blue/85",
    2: "bg-black/5 text-black font-medium hover:bg-black/10",
  };

  const sizes = {
    sm: "h-10 px-4 text-base",
    md: "h-[46px] px-4 text-lg",
    lg: "h-13 px-5 text-lg",
  };

  const classes = `leading-tight transition-all rounded-lg active:scale-[0.98] flex items-center justify-center ${
    styles[style] || styles[1]
  } ${sizes[size] || sizes.md}${className ? ` ${className}` : ""}`;

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
