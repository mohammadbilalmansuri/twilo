import { forwardRef, useId } from "react";

const Textarea = forwardRef(
  ({ id, placeholder = "", maxLength = 300, className, ...props }, ref) => {
    const generatedId = useId();
    id = id || generatedId;
    return (
      <textarea
        id={id}
        placeholder={placeholder}
        maxLength={maxLength}
        ref={ref}
        className={`w-full text-lg outline-none rounded-lg p-3 placeholder:text-black/50 bg-transparent border-1.5 border-black/10 focus:border-blue${
          className ? ` ${className}` : ""
        }`}
        {...props}
      />
    );
  }
);

export default Textarea;
