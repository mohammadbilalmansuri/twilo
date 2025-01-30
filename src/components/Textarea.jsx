import { forwardRef, useId } from "react";

const Textarea = forwardRef(
  ({ label, id = useId(), placeholder = "", className, ...props }, ref) => {
    const classes = `w-full text-lg outline-none rounded-lg p-3.5 placeholder:text-black/25 text-black/75 bg-transparent border border-dashed border-black/25 focus:border-blue${
      className ? ` ${className}` : ""
    }`;

    if (!label) {
      return (
        <textarea
          placeholder={placeholder}
          maxLength={2000}
          rows={16}
          className={classes}
          ref={ref}
          id={id}
          {...props}
        />
      );
    }

    return (
      <div className="w-full flex flex-col relative items-center">
        <label
          htmlFor={id}
          className="cursor-pointer text-lg font-semibold text-center leading-tight"
        >
          {label}
        </label>

        <textarea
          placeholder={placeholder}
          minLength={2000}
          rows={16}
          className={classes}
          ref={ref}
          id={id}
          {...props}
        />
      </div>
    );
  }
);

export default Textarea;
