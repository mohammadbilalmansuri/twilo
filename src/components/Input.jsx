import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", placeholder = "", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label htmlFor={id} className="cursor-pointer font-bold">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        className={`w-full font-semibold outline-none focus:outline-accent/75 rounded-md h-10 px-3 border-none placeholder:text-gray-400 text-gray-300 bg-gray-700 ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
