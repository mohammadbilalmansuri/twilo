import { forwardRef } from "react";
import cn from "../utils/cn";

const Textarea = forwardRef(
  ({ placeholder = "", maxLength = 500, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={5}
        className={cn(
          "w-full text outline-none rounded-lg p-3 placeholder:text-black/60 bg-transparent border-1.5 border-black/10 focus:border-blue resize-none overflow-hidden",
          className
        )}
        {...props}
      />
    );
  }
);

export default Textarea;
