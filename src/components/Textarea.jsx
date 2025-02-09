import { forwardRef } from "react";
import cn from "../utils/cn";

const Textarea = forwardRef(
  ({ placeholder = "", maxLength = 300, className, ...props }, ref) => {
    return (
      <textarea
        placeholder={placeholder}
        maxLength={maxLength}
        ref={ref}
        className={cn(
          "w-full text outline-none rounded-lg p-3 placeholder:text-black/60 bg-transparent border-1.5 border-black/10 focus:border-blue",
          className
        )}
        {...props}
      />
    );
  }
);

export default Textarea;
