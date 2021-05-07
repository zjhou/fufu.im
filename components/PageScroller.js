import React, { useEffect, useRef, useState, useCallback } from "react";
// import { debounce } from "lodash";
import { animated, config, useSpring } from "react-spring";
import { useWindowScrollDirection } from "./UseScrollDirection";

// const useDebounced = (fn) => {
//   return useCallback(debounce(fn, 300, { leading: true, trailing: false }), []);
// };

// const usePrevious = (value) => {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// };

const usePageTransformStyle = (pageIndex, pageHeight) => {
  return useSpring({
    config: config.stiff,
    to: { transform: `translateY(-${pageIndex * pageHeight}px)` },
  });
};

const getNextPageIdx = (current, delta, pagesCount) => {
  const draft = current + delta;
  if (draft < 0) {
    return 0;
  }
  if (draft >= pagesCount - 1) {
    return pagesCount - 1;
  }
  return draft;
};

export const PageScroller = (props) => {
  const { children, className, pagesCount, resetTime } = props;
  const [, refresh] = useState(Date.now());
  const idxRef = useRef(0);

  useWindowScrollDirection({
    useNumberDirection: true,
    afterCalc: (d) => {
      idxRef.current = getNextPageIdx(idxRef.current, d, pagesCount);
      refresh(Date.now());
    },
  });

  const styles = usePageTransformStyle(idxRef.current, 614);

  useEffect(() => {
    idxRef.current = 0;
    refresh(Date.now());
  }, [resetTime]);

  return (
    <div className={className} style={styles}>
      <animated.div style={styles}>{children}</animated.div>
    </div>
  );
};
