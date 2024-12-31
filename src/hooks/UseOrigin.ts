import React from "react";

export const useOrigin = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => setIsMounted(true), []);
  if (!isMounted) return "";

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  return origin;
};