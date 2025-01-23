import formatClasses from "../utils/formatClasses";

export default function Container({
  parentTag: ParentTag,
  parentClasses = "",
  children,
  className = "",
}) {
  const content = (
    <div
      className={formatClasses(
        `w-full max-w-screen-lg px-4 relative ${className}`
      )}
    >
      {children}
    </div>
  );

  return ParentTag ? (
    <ParentTag
      className={formatClasses(
        `w-full relative flex flex-col items-center px-4 ${parentClasses}`
      )}
    >
      {content}
    </ParentTag>
  ) : (
    content
  );
}
