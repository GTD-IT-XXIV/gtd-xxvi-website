import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
}

// Use only on client-side javascript when has finished mounting
export function useScreenSize() {
  const isSm = useMediaQuery({ query: "(min-width: 540px)" });
  const isMd = useMediaQuery({ query: "(min-width: 768px)" });
  const isLg = useMediaQuery({ query: "(min-width: 1024px)" });
  const isXl = useMediaQuery({ query: "(min-width: 1280px)" });
  const is2Xl = useMediaQuery({ query: "(min-width: 1400px)" });
  if (is2Xl) {
    return "2xl";
  }
  if (isXl) {
    return "xl";
  }
  if (isLg) {
    return "lg";
  }
  if (isMd) {
    return "md";
  }
  if (isSm) {
    return "sm";
  }
  return "xs";
}
