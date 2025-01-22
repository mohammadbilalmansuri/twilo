import formatClasses from "../utils/formatClasses";

export default function Container({
  parentTag: ParentTag = "div",
  parentClasses = "",
  children,
  className = "",
}) {
  return (
    <ParentTag
      className={formatClasses(
        `w-full relative flex flex-col items-center px-4 ${parentClasses}`
      )}
    >
      <div
        className={formatClasses(
          `w-full max-w-screen-lg px-4 relative ${className}`
        )}
      >
        {children}
      </div>
    </ParentTag>
  );
}
