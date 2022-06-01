import React, { PropsWithChildren, Suspense, useEffect } from "react";
import styled from "styled-components";
import "./Layout.scss";
import { Header, Sidebar } from "components";
import { getSettings, getSidebarState, getRoute } from "modules/selectors";
import { useSelector, useDispatch } from "react-redux";
import { LoadingSpinner } from "@theme";
import { setSettings, setEventType } from "modules/actions";
import ReactNotification from "react-notifications-component";
import classNames from "classnames";
import { ToastContainer } from "react-toastify";
import merge from "lodash/merge";
import "react-toastify/dist/ReactToastify.css";

interface IViewProps {
  isprivate?: string;
}

const PageLayout = styled.div`
  .content-container {
    padding: 92px 30px 30px 30px;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    &.aside-open {
      padding-left: 280px;
    }
  }
`;

const defaultSettings = {
  header: { display: true },
  footer: { display: true },
  navbar: { display: true }
};

const LayoutContainer = styled.div<IViewProps>`
  ${({ isprivate }) => isprivate === "false" && "padding: 0"};
`;

function Layout(props: PropsWithChildren<any>) {
  const selectedRoute = useSelector(getRoute);
  const settings = useSelector(getSettings);
  const sidebarState = useSelector(getSidebarState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedRoute) {
      const routeSettings = merge(
        {},
        defaultSettings,
        selectedRoute?.settings?.layout.config
      );
      dispatch(setSettings(routeSettings));
      if (selectedRoute?.type) {
        dispatch(setEventType(selectedRoute?.type));
      }
    }
  }, [selectedRoute, dispatch]);

  return (
    <React.Fragment>
      <PageLayout
        id='layout'
        className={
          sidebarState === 1
            ? "toggle-sidebar"
            : sidebarState === 2
            ? "toggle-sidebar sidebar-remove"
            : ""
        }
      >
        <ReactNotification className='toasterContent' />
        {/* App Sidebar */}
        {settings.navbar.display && <Sidebar />}
        {/*   APP HEADER  */}
        {settings.header.display && <Header />}
        {/* PAGE CONTENT */}
        <LayoutContainer
          isprivate={settings?.header?.display.toString()}
          className={classNames({
            "content-container aside-open ": settings.header.display
          })}
        >
          {/*  PAGE HEADER */}

          {/*  PAGE BODY */}

          <Suspense fallback={<LoadingSpinner withCoverBg position='center' />}>
            {props.children}
          </Suspense>
          <ToastContainer />
        </LayoutContainer>
      </PageLayout>
    </React.Fragment>
  );
}

export default React.memo(Layout);
