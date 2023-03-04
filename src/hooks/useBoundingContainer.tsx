import { useCallback, useEffect, useState } from "react";

export interface DomContainer<T extends HTMLElement> {
  element: T;
  bounding: DOMRect;
}

export function useBounding<T extends HTMLElement>(
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

export function useBoundingContainer() {
  const {container, callbackRef} = useBounding<HTMLDivElement>();
  // div1 ensures it matches the size of the space parent has REMAINING
  // div2 is 100% of that remaining space
  const Wrapper = useCallback((props: React.PropsWithChildren) => (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      border: '1px solid grey',
      backgroundColor: '#010',
    }}>
      <div ref={callbackRef} style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}>
        {props.children}
      </div>
    </div>
  ), [callbackRef]);
  return { Wrapper, container, };
}
