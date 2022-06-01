import React, { useCallback, useEffect, useState } from "react";
import "./sidebar.scss";
import { ErrorBoundary } from "components";
import { Nav } from "react-bootstrap";
import logo from "../../assets/img/icons/tops-logo.svg";
import logoicon from "../../assets/img/logo.png";
import { useHistory } from "react-router";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  SideBarContainer,
  SideBarNavigation,
  LogoSidebar,
  LogoIcon
} from "./sidebar.style";
import { SidebarConfig } from "./sidebar.config";
import { sidebarHandler, signOutUser } from "../../modules/actions";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  // getUserProfile,
  getRoute,
  getDocumentationUrl
} from "modules/selectors";
// import { intersectionWith, isEqual } from "lodash";
import { usePrevious } from "hooks/useComponent";

interface NavigationLinkProps {
  hasDropDown?: boolean;
  iconName?: string;
  name: string;
  eventKey: string;
  href?: string;
  innerHref: string[] | undefined;
  onClick?: (event?: any) => void;
  disabled?: boolean;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  hasDropDown,
  iconName,
  name,
  href,
  innerHref = [],
  eventKey,
  onClick,
  disabled
}) => {
  const [toggle, setToggle] = useState(
    window.location.pathname === href ||
    innerHref.indexOf(window.location.pathname) !== -1
  );

  const history = useHistory();
  const selectedRoute = useSelector(getRoute);
  const prevPath: any = usePrevious(selectedRoute?.path);
  const documentUrl = useSelector(getDocumentationUrl);
  const dispatch = useDispatch();

  const openPdf = useCallback(async () => {
    if (documentUrl) window.open(`${documentUrl}`, "_blank");
  }, [documentUrl]);

  const navigateFunction = (event: any, href?: string, redirect?: boolean) => {
    event.preventDefault();
    if (href) {
      if (!(window.innerWidth >= 1200)) {
        dispatch(sidebarHandler(0));
      }
      history.push(href);
    } else if (typeof href !== "undefined") {
      if (redirect) {
        openPdf();
      }
    } else {
      setToggle(!toggle);
    }
  };

  const changeRoute = useCallback(() => {
    if (
      prevPath !== selectedRoute?.path &&
      !(
        selectedRoute?.path === href ||
        innerHref.indexOf(selectedRoute?.path || "") !== -1
      )
    ) {
      setToggle(false);
    }
  }, [href, innerHref, prevPath, selectedRoute]);

  useEffect(() => {
    if (selectedRoute) {
      changeRoute();
    }
  }, [selectedRoute, changeRoute]);

  return (
    <Nav.Link
      eventKey={eventKey}
      active={
        selectedRoute?.path === href ||
        innerHref.indexOf(selectedRoute?.path || "") !== -1 ||
        innerHref.some((x) => selectedRoute?.path.indexOf(x) !== -1)
      }
      className={classNames({ "dd-menu": !href, "dd-toggle": toggle })}
      onClick={onClick || ((event: any) => navigateFunction(event, href, true))}
      disabled={disabled}
    >
      <div>
        {iconName && <i className={iconName} />}
        <span>{name}</span>
      </div>
      {hasDropDown && <span className='icon-ic-dropdown-blue' />}
    </Nav.Link>
  );
};

export const Sidebar = () => {
  const dispatch = useDispatch();
  // const user = useSelector(getUserProfile);
  return (
    <ErrorBoundary>
      <SideBarContainer open className='sidebar-container open'>
        <PerfectScrollbar>
          <SideBarNavigation className='sidebar-navigation'>
            <LogoSidebar className='logo-sidebar'>
              <Link to={"/dashboard"} className='logolarge'>
                <img src={logo} height='25px;' alt='Tooca Admin' />
              </Link>
              <LogoIcon to={"/dashboard"} className='logoicon'>
                <img src={logoicon} height='25px;' alt='Tooca Admin' />
              </LogoIcon>
            </LogoSidebar>
            <Nav defaultActiveKey='/home' className='flex-column sidebarnav'>
              {SidebarConfig.map((routes, index) => {
                const disabled = false;
                if (routes.authRoles) {
                  // const present = intersectionWith(
                  //   user?.roles,
                  //   routes?.authRoles,
                  //   isEqual
                  // );
                  // if (present.length > 0) disabled = false;
                  // else disabled = true;
                }
                if (routes.hasChildren) {
                  return (
                    <div className='multilevenav1' key={index}>
                      <NavigationLink
                        href={routes.href}
                        innerHref={routes.innerHref}
                        hasDropDown={routes.hasChildren}
                        iconName={routes.iconName}
                        name={routes.name}
                        eventKey={routes.name + "_" + index}
                      />
                      {routes.children && (
                        <ul className='multilevenav'>
                          {routes.children.map((child, childIndex) => {
                            if (child.hasChildren) {
                              return (
                                <div
                                  className='multilevenav2'
                                  key={index + "" + childIndex}
                                >
                                  <NavigationLink
                                    href={child.href}
                                    hasDropDown={child.hasChildren}
                                    innerHref={child.innerHref}
                                    name={child.name}
                                    eventKey={
                                      child.name +
                                      "_" +
                                      index +
                                      "_" +
                                      childIndex
                                    }
                                  />
                                  {child.children && (
                                    <ul className='multilevenav3'>
                                      {child.children.map(
                                        (innerChild, innerChildIndex) => {
                                          return (
                                            <li
                                              key={
                                                index +
                                                "" +
                                                childIndex +
                                                "" +
                                                innerChildIndex
                                              }
                                            >
                                              <NavigationLink
                                                href={innerChild.href}
                                                hasDropDown={
                                                  innerChild.hasChildren
                                                }
                                                innerHref={innerChild.innerHref}
                                                name={innerChild.name}
                                                eventKey={
                                                  innerChild.name +
                                                  "_" +
                                                  index +
                                                  "_" +
                                                  childIndex +
                                                  "_" +
                                                  innerChildIndex
                                                }
                                              />
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                  )}
                                </div>
                              );
                            }
                            return (
                              <li key={index + "" + childIndex}>
                                <NavigationLink
                                  href={child.href}
                                  hasDropDown={child.hasChildren}
                                  innerHref={child.innerHref}
                                  name={child.name}
                                  eventKey={
                                    child.name + "_" + index + "_" + childIndex
                                  }
                                />
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                }
                return (
                  <li className="singlelevelnav" key={index}>
                    <NavigationLink
                      href={routes.href}
                      hasDropDown={routes.hasChildren}
                      iconName={routes.iconName}
                      innerHref={routes.innerHref}
                      name={routes.name}
                      eventKey={routes.name + "_" + index}
                      key={index}
                      disabled={disabled}
                    />
                  </li>
                );
              })}
              <NavigationLink
                iconName='icon-ic-logout-white'
                innerHref={[]}
                onClick={() => dispatch(signOutUser())}
                name='Logout'
                eventKey='Logout'
              />
            </Nav>
          </SideBarNavigation>
        </PerfectScrollbar>
      </SideBarContainer>
    </ErrorBoundary>
  );
};

export default Sidebar;
