import { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import formatClasses from "../utils/formatClasses";

const Button = ({
  children,
  as = "button",
  type = "button",
  to = "",
  style = 1,
  className = "",
  svgViewBox = "0 0 512 512",
  svgPath = "",
  ...props
}) => {
  const baseClasses =
    "hover:animate-pulse active:scale-95 bg-neutral p-2.5 rounded-lg";

  const styleClasses = {
    1: "bg-accent fill-primary",
    2: "bg-neutral fill-secondary",
    3: "bg-secondary fill-primary",
  };

  const combinedClasses = formatClasses(
    `${baseClasses} ${styleClasses[style]} ${className}`
  );

  const svg = `<svg viewBox="${svgViewBox}" class="size-4">${
    children ? (
      children
    ) : (
      <svg viewBox={svgViewBox} className="size-4">
        {svgPath && <path d={svgPath} />}
      </svg>
    )
  }</svg>`;

  switch (as) {
    case "link":
      return (
        <Link to={to} className={combinedClasses} {...props}>
          {children ? (
            children
          ) : (
            <svg viewBox={svgViewBox} className="size-4">
              {svgPath && <path d={svgPath} />}
            </svg>
          )}
        </Link>
      );

    case "navlink":
      return (
        <NavLink
          to={to}
          className={({ isActive }) =>
            `${combinedClasses}${
              isActive ? "fill-accent pointer-events-none" : "fill-secondary"
            }`
          }
          {...props}
        >
          {children}
        </NavLink>
      );

    default:
      return (
        <button type={type} className={combinedClasses} {...props}>
          {children}
        </button>
      );
  }
};

export default memo(Button);
