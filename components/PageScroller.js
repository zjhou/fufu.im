import React, { useEffect, useRef, useState, useCallback } from "react";
import { animated, config, useSpring } from "react-spring";
import { useWheel } from "react-use-gesture";
import { Lethargy } from "lethargy";
const lethargy = new Lethargy();

const usePageTransformStyle = (pageIndex, pageHeight) => {
  return useSpring({
    config: config.stiff,
    to: { transform: `translateY(-${pageIndex * pageHeight}px)` },
  });
};

const clamp = (value, min, max) => Math.max(Math.min(max, value), min);

export const PageScroller = (props) => {
  const { children, className, pagesCount, resetTime } = props;
  const [index, setIndex] = useState(0);

  const bind = useWheel(({ event, last, memo: wait = false }) => {
    if (!last) {
      const s = lethargy.check(event);
      if (s) {
        if (!wait) {
          setIndex((i) => clamp(i - s, 0, pagesCount - 1));
          return true;
        }
      } else return false;
    } else {
      return false;
    }
  });

  const styles = usePageTransformStyle(index, 614);

  useEffect(() => {
    setIndex(0);
  }, [resetTime]);

  return (
    <div className={className} style={styles} {...bind()}>
      <animated.div style={styles}>{children}</animated.div>
    </div>
  );
};
