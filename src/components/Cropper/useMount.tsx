import React from 'react';

/**
 * @function useMount
 * @description A hook to check if the component is mounted.
 * @returns {isMounted}
 *
 * @example
 * import React from 'react';
 * import { useMount } from 'components/Access/src/hooks';
 *
 * const Component = () => {
 *  const [data, setData] = React.useState({});
 *  const { isMounted } = useMount();
 *  React.useEffect(()=>{
 *      asyncFunction().then((result)=>{
 *          if(isMounted()) setData({...data, ...result})
 *      });
 *  },[data, setData, isMounted])
 *  return <div />;
 * }
 */
export function useMount() {
  const mounted = React.useRef<boolean>(true);
  const isMounted = React.useCallback(() => mounted.current === true, [mounted]);
  React.useEffect(() => () => !(mounted.current = false) && undefined, []);
  return { isMounted };
}
