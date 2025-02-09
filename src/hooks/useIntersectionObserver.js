import { useEffect, useRef } from "react";
import { useDebounce } from ".";

const useIntersectionObserver = (callback, options) => {
  const ref = useRef();
  const debouncedCallback = useDebounce(callback, 100);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) debouncedCallback();
    }, options);

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [debouncedCallback, options]);

  return ref;
};

export default useIntersectionObserver;
