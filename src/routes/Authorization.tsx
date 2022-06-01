import React, {
  PropsWithChildren,
  useEffect,
  memo,
  useState,
  useContext
} from "react";
import { useHistory } from "react-router-dom";

import { getUserProfile, getIsUserAuth, getLoading } from "modules/selectors";
import { useSelector, useDispatch } from "react-redux";
import AppContext from "context/AppContext";
import { topsUtils } from "modules/utils";
import { setRoute } from "modules/actions/settings";
import { matchRoutes } from "react-router-config";

const Authorization = (props: PropsWithChildren<any>) => {
  /** Authenticated flag */
  const { routes } = useContext(AppContext);
  const isUserAuthorized = useSelector(getIsUserAuth);

  const user = useSelector(getUserProfile);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const isLoadingAuth = useSelector(getLoading);
  const [accessGranted, setAccessGranted] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (selectedRoute && !isLoadingAuth) {
      const accessGranted = topsUtils.hasPermission(
        user.roles,
        selectedRoute.auth
      );
      setAccessGranted(accessGranted);
    }
  }, [selectedRoute, user.roles, isLoadingAuth]);

  useEffect(() => {
    const unlisten = history.listen((location) => {
      const matchedRoute = matchRoutes(routes, location.pathname)[0];
      if (matchedRoute && matchedRoute.route) {
        setSelectedRoute(matchedRoute.route);
        dispatch(setRoute(matchedRoute.route));
      }
    });
    return () => {
      unlisten();
    };
  }, [history, routes, dispatch]);

  useEffect(() => {
    if (history.location.pathname) {
      const matchedRoute = matchRoutes(routes, history.location.pathname)[0];
      if (matchedRoute && matchedRoute.route) {
        setSelectedRoute(matchedRoute.route);
        dispatch(setRoute(matchedRoute.route));
      }
    }
  }, [history.location.pathname, routes, dispatch]);

  useEffect(() => {
    if (!accessGranted && isUserAuthorized) {
      history.push("/403");
    }
  }, [accessGranted, history, isUserAuthorized]);

  useEffect(() => {
    if (selectedRoute && isUserAuthorized) {
      if (
        accessGranted &&
        (selectedRoute.path === "/login" ||
          selectedRoute.path === "/change-password")
      )
        history.push("/dashboard");
    }
  }, [selectedRoute, isUserAuthorized, accessGranted, history]);

  useEffect(() => {
    if (selectedRoute && selectedRoute.isPrivate) {
      if (!isLoadingAuth && !isUserAuthorized) {
        history.push("/login");
      }
    }
  }, [selectedRoute, isUserAuthorized, isLoadingAuth, history]);

  return (
    <React.Fragment>{accessGranted ? props.children : null}</React.Fragment>
  );
};

export default memo(Authorization);
