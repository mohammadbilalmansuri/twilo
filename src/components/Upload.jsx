import React, { useId } from "react";

function Upload({ label, placeholder = "", className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="flex gap-3 items-center h-16">
      {label && (
        <label htmlFor={id} className="text-lg cursor-pointer font-semibold">
          {label}
        </label>
      )}

      <input
        type="file"
        className={`cursor-pointer font-semibold ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
}

export default React.forwardRef(Upload);
