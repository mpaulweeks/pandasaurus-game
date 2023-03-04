import { useCallback, useEffect, useState } from "react";

export interface DomContainer<T extends HTMLElement> {
  element: T;
  bounding: DOMRect;
}

export function useBoundingContainer<T extends HTMLElement>(
): {
  container: DomContainer<T> | null;
  callbackRef: (elm: T) => void;
 } {
  const [element, setElement] = useState<T>();
  const [bounding, setBounding] = useState<DOMRect | undefined>();
  const callbackRef = useCallback((elm: T) => {
    console.log('callbackRef', elm);
    setElement(elm);
  }, []);

  useEffect(() => {
    console.log('useEffect element', element, bounding);
    if (element) {
      setBounding(element.getBoundingClientRect());
    }
    // todo listen for resize
  }, [element]);

  return {
    callbackRef,
    container: (element && bounding) ? {
      element,
      bounding,
    } : null,
  };
}
