import { useEffect, useRef } from "react";
import { useDebounce } from ".";

const useIntersectionObserver = (callback, options) => {
  const ref = useRef();

  const debouncedCallback = useDebounce(callback, 100);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        debouncedCallback();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [debouncedCallback, options]);

  return ref;
};

export default useIntersectionObserver;
