import { noop } from "lodash";
import { useState, useEffect } from "react";
import { fromEvent } from "rxjs";
import { map, bufferCount, filter } from "rxjs/operators";

const DEBOUNCE_TIME = 30;

export const useWindowScrollDirection = (
  options = {
    useNumberDirection: false,
    afterCalc: noop,
  }
) => {
  const [direction, setDir] = useState(options.useNumberDirection ? 0 : "");

  const scroll$ = fromEvent(window, "wheel", {
    capture: true,
  });

  const scrollWithTimestamp$ = scroll$.pipe(
    map((e, index) => {
      return {
        e,
        index,
      };
    }),
    filter((data) => {
      return data.e.deltaY !== 0;
    })
  );

  const finalScroll$ = scrollWithTimestamp$.pipe(
    bufferCount(2, 1),
    filter(([prev, next], index) => {
      const duration = next.e.timeStamp - prev.e.timeStamp;
      return (
        duration >= DEBOUNCE_TIME ||
        index === 0 ||
        next.e.deltaY * prev.e.deltaY < 0 // 2. 反向滚动
      );
    }),
    map(([, current]) => {
      const delta = current.e.deltaY;
      if (options.useNumberDirection) {
        return delta < 0 ? -1 : 1;
      }
      return delta < 0 ? "UP" : "DOWN";
    })
  );

  useEffect(() => {
    const sub = finalScroll$.subscribe((d) => {
      setDir(d);
      options.afterCalc(d);
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);

  return direction;
};
