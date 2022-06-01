import React from "react";

export enum character {
  enter = 13,
  escape = 27,
  // left = 37,
  up = 38,
  // right = 39,
  down = 40
}

interface UseKeyboardDirectionalProperties {
  currentIndex?: number;
  items: any[];
}

/**
 * @function useKeyboardDirectional
 * @description A hook to observe keyboard input to navigate focus of an array by item index using directional keys.
 * @returns {
 *      currentIndex {number}
 *      setCurrentIndex {function(boolean)}
 *      escape {boolean}
 *      enter {boolean}
 * }
 *
 * @example
 * import React from 'react';
 * import { useKeyboardDirectional } from 'components/Access/src/hooks';
 *
 * export const Component = () => {
 *   keyboard = useKeyboardDirectional();
 *   return <div />;
 * }
 */
export function useKeyboardDirectional({
  items
}: UseKeyboardDirectionalProperties) {
  const total = items.length;
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  const [escape, setEscape] = React.useState(false);
  const [enter, setEnter] = React.useState(false);

  const setFirst = React.useCallback(() => setCurrentIndex(0), [
    setCurrentIndex
  ]);
  const setLast = React.useCallback(() => setCurrentIndex(total - 1), [
    setCurrentIndex,
    total
  ]);
  const setNext = React.useCallback(
    () =>
      currentIndex + 1 < total ? setCurrentIndex(currentIndex + 1) : setFirst(),
    [currentIndex, setCurrentIndex, setFirst, total]
  );
  const setPrevious = React.useCallback(
    () =>
      currentIndex - 1 >= 0 ? setCurrentIndex(currentIndex - 1) : setLast(),
    [currentIndex, setCurrentIndex, setLast]
  );

  const setIndex = React.useCallback(
    (key: character) => {
      if (key === character.down) setNext();
      else if (key === character.up) setPrevious();
      setEscape(key === character.escape);
      setEnter(key === character.enter);
    },
    [setNext, setPrevious, setEscape, setEnter]
  );

  React.useEffect(() => {
    window.document.addEventListener("keydown", onKey, false);
    return () => window.document.removeEventListener("keydown", onKey, false);
    function onKey(event: KeyboardEvent) {
      const key = event.keyCode || event.which;
      if (key in character) {
        event.preventDefault();
        setIndex(key);
      }
    }
  }, [setIndex]);

  return {
    currentIndex,
    setCurrentIndex,
    escape,
    enter
  };
}
