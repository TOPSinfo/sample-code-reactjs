import React, { useEffect, useState, useContext, useCallback } from "react";
import "./header.scss";
import { useHistory, Link } from "react-router-dom";
import { INavigation } from "modules/types";
import { useSelector, useDispatch, batch } from "react-redux";
import { getSidebarState, getUserProfile } from "modules/selectors";
import {
  sidebarHandler,
  signOutUser,
  setOrganizationModalState,
  resetOrganizationData,
  authUserSuccess,
  fetchOrganizationsByContractId,
  setProfileModalState,
  saveUserPreference,
  setContractId
} from "modules/actions";
import { ErrorBoundary } from "components";
import { setUserVars } from "react-fullstory";
import AppContext from "context/AppContext";
import logo from "assets/img/shared_studio.png";
import { Dropdown } from "react-bootstrap";
import * as selectors from "modules/selectors";
import { topsUtils } from "modules/utils";
import { authRoles } from "modules/utils/RouteAuth";
import { FaCheck } from "react-icons/fa";
import AddProfile from "components/Modal/AddProfile";
import AddContent from "components/Modal/AddContent";
import AddOrganization from "components/Modal/AddOrganization";

export const Header = () => {
  const [, setRoute] = useState<INavigation>();
  const [photoError, setPhotoError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const sidebarFlag = useSelector(getSidebarState);
  const user = useSelector(getUserProfile);
  const { routes } = useContext(AppContext);
  const organizations = useSelector(selectors.getOrganizations);
  const organizationId = useSelector(selectors.getOrganizationId);
  const contractIds = useSelector(selectors.getContractIds);
  const selectedContractId = useSelector(selectors.getContractId);

  useEffect(() => {
    if (user.name) {
      setUserVars({
        displayName: user.name,
        email: user.email
      });
    }
  }, [user]);

  useEffect(() => {
    if (history.location.pathname) {
      const route = routes.find(
        (_val: any) => _val.path === history.location.pathname
      );
      setRoute(route);
    }
  }, [history.location.pathname, routes]);

  const toggleSidebar = () => {
    let flag = 0;
    if (sidebarFlag === 0) {
      flag = 1;
    } else if (sidebarFlag === 1 && window.innerWidth >= 1200) {
      flag = 2;
    } else {
      flag = 0;
    }
    dispatch(sidebarHandler(flag));
  };
  const logoutUser = () => dispatch(signOutUser());

  const organizationClick = () => dispatch(setOrganizationModalState(true));

  const changeOrganization = useCallback(
    (orgId: string) => {
      if (organizationId === orgId) {
        return;
      }
      const obj = {
        organizationId: orgId
      };

      batch(() => {
        dispatch(resetOrganizationData());
        dispatch(authUserSuccess(obj));
        dispatch(saveUserPreference());
      });
    },
    [dispatch, organizationId]
  );

  const changeContract = useCallback(
    (contractId: string) => {
      if (selectedContractId === contractId) {
        return;
      }
      batch(() => {
        dispatch(setContractId(contractId));
        dispatch(fetchOrganizationsByContractId({ changeOrg: true }));
      });
    },
    [dispatch, selectedContractId]
  );

  const accessGranted = topsUtils.hasPermission(user.roles, authRoles.admin);

  const myProfile = () => {
    dispatch(setProfileModalState(true));
  };

  return (
    <ErrorBoundary>
      <div className='header-section'>
        <button className='toggle-btn' onClick={toggleSidebar}>
          <i className='icon-ic-menu' />
        </button>
        <Link to='/dashboard' className='logo'>
          <img src={logo} height='25px;' alt='tops Admin' />
        </Link>
        <div className='right-section'>
          <div className='rs-item-box home-link'>
            <Link to={"/dashboard"}>
              <i className='icon-ic-home' />
            </Link>
          </div>
          <div className='rs-item-box user-section'>
            <Dropdown className='user-dd'>
              <Dropdown.Toggle id='dropdown-basic'>
                {user && user.avatar && !photoError ? (
                  <img
                    src={user.avatar}
                    className='user-img-box'
                    onError={() => setPhotoError(true)}
                  />
                ) : (
                  <div className='user-img-box'>
                    <span>
                      {(user &&
                        (user.name || user.displayName)
                          .split(" ")
                          .map((x: string) => x.charAt(0).toUpperCase())
                          .join("")
                          .substring(0, 2)) ||
                        "DP"}
                    </span>
                  </div>
                )}
                <span className='icon-ic-dropdown-blue' />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {accessGranted && contractIds.length > 1 && (
                  <>
                    <Dropdown.ItemText key='contracts'>
                      Contracts
                    </Dropdown.ItemText>

                    {contractIds.map((contractId) => {
                      return (
                        <Dropdown.Item
                          key={contractId}
                          onClick={() => changeContract(contractId)}
                          bsPrefix={`dropdown-item ${
                            contractId !== selectedContractId &&
                            "dropdown-padding"
                          }`}
                        >
                          {contractId === selectedContractId && (
                            <FaCheck className='mr-3' />
                          )}
                          {contractId}
                        </Dropdown.Item>
                      );
                    })}
                    <Dropdown.Divider />
                  </>
                )}
                {organizations.length > 0 && (
                  <>
                    <Dropdown.ItemText key='org'>
                      Organizations
                    </Dropdown.ItemText>
                    {organizations.map((organization) => {
                      return (
                        <>
                          <Dropdown.Item
                            align={"end"}
                            key={organization.id}
                            onClick={() => changeOrganization(organization.id)}
                            bsPrefix={`dropdown-item ${
                              organizationId !== organization.id &&
                              "dropdown-padding"
                            }`}
                          >
                            {organizationId === organization.id && (
                              <FaCheck className='mr-3' />
                            )}
                            {organization.name}
                          </Dropdown.Item>
                        </>
                      );
                    })}

                    <Dropdown.Item
                      bsPrefix='dropdown-item 
                              dropdown-padding'
                      key='add-org'
                      onClick={organizationClick}
                    >
                      Add ...
                    </Dropdown.Item>
                    <Dropdown.Divider />
                  </>
                )}
                <Dropdown.ItemText
                  bsPrefix='dropdown-item-text handicon'
                  onClick={myProfile}
                  key='my-profile'
                >
                  Profile
                </Dropdown.ItemText>
                <Dropdown.Divider />
                <Dropdown.ItemText
                  bsPrefix='dropdown-item-text handicon'
                  onClick={logoutUser}
                  key='logout'
                >
                  Logout
                </Dropdown.ItemText>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <AddProfile />
      <AddContent />
      <AddOrganization />
    </ErrorBoundary>
  );
};
export default Header;
