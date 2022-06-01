import React, { useEffect, useState } from "react";
import home from "assets/img/icons/header-home.svg";
import { withRouter, useHistory } from "react-router-dom";
import { INavigation } from "modules/types";
import styled from "styled-components";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { getRoute } from "modules/selectors";
import { useSelector } from "react-redux";
import { NavigationConfig } from "routes";

const BreadCrumbLink = styled(Breadcrumb.Item)`
  text-decoration: none;
  &:before {
    color: var(--white) !important;
  }
`;
export const BreadCrumb = () => {
  const [currentRoute, setRoute] = useState<INavigation>();
  const selectedRoute = useSelector(getRoute);
  const history = useHistory();

  const isActiveRoute = (index: number) => {
    return (
      currentRoute &&
      currentRoute.breadCrumbs &&
      currentRoute.breadCrumbs.length - 1 === index
    );
  };

  const routeUrl = (path: string, index: number) => {
    if (!isActiveRoute(index)) history.push(path);
  };

  useEffect(() => {
    if (selectedRoute) {
      let iroute = NavigationConfig.find((route) =>
        route.path.includes(selectedRoute.path)
      );
      if (iroute) {
        if (iroute.routes) {
          const subroute = iroute.routes.find((subroute) => {
            return subroute.path.includes(
              history.location.pathname.includes("create-event")
                ? history.location.pathname.substr(
                  0,
                  history.location.pathname.lastIndexOf("/")
                )
                : history.location.pathname
            );
          });

          if (subroute) {
            iroute = subroute;
          }
        }
        setRoute(iroute);
      }
    }
  }, [selectedRoute, history.location.pathname]);

  const redirectToHome = () => history.push("/");

  return (
    <>
      {currentRoute && (
        <div className='bredcrums'>
          <Breadcrumb>
            <span>
              <BreadCrumbLink onClick={redirectToHome}>
                <img src={home} alt='dashboard' width='20' />
              </BreadCrumbLink>
            </span>
            {currentRoute?.breadCrumbs?.map((_val, index) => {
              return (
                <BreadCrumbLink
                  key={index}
                  active={isActiveRoute(index)}
                  style={isActiveRoute(index) ? { pointerEvents: "none" } : {}}
                  onClick={() => routeUrl(_val.path, index)}
                >
                  <span>{_val.title}</span>
                </BreadCrumbLink>
              );
            })}
          </Breadcrumb>
        </div>
      )}
    </>
  );
};
export default withRouter(BreadCrumb);
