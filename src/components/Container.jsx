const Container = ({
  parentTag: ParentTag,
  parentClasses,
  children,
  className,
}) => {
  const content = (
    <div
      className={`w-full max-w-screen-lg px-3 relative${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );

  return ParentTag ? (
    <ParentTag
      className={`w-full relative flex flex-col items-center px-3${
        parentClasses ? ` ${parentClasses}` : ""
      }`}
    >
      {content}
    </ParentTag>
  ) : (
    content
  );
};

export default Container;
