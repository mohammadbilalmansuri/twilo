import { Link, NavLink } from "react-router-dom";
import cn from "../utils/cn";

const Button = ({
  children,
  as = "button",
  type = "button",
  to = "",
  style = "primary",
  size = "lg",
  className,
  ...props
}) => {
  const classes = cn(
    "md:text-lg text-base leading-none transition-all rounded-lg active:scale-[0.98] flex items-center justify-center",
    size === "sm" ? "md:h-9 h-8 md:px-3 px-2.5" : "md:h-13 h-12 md:px-5 px-4",
    style === "secondary"
      ? "bg-black/5 text-black font-medium hover:bg-black/10"
      : "bg-blue text-white hover:bg-blue/85",
    className
  );

  if ((as === "link" || as === "navlink") && !to) {
    console.warn(
      "Button component with 'link' or 'navlink' as 'as' requires a 'to' prop."
    );
  }

  const Component =
    as === "link" ? Link : as === "navlink" ? NavLink : "button";

  return (
    <Component
      {...(as !== "button" && { to })}
      {...(as === "button" && { type })}
      className={
        as === "navlink"
          ? ({ isActive }) => cn(classes, isActive && "pointer-events-none")
          : classes
      }
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
