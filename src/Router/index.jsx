import React from "react";
import { LoginConfig } from "../pages/Login/LoginConfigs";
import { Redirect } from "react-router-dom";
import { ResetPasswordConfig } from "../pages/ResetPassword/PasswordConfig";
import { topsUtils } from "modules/utils";
import { DashboardConfig } from "../pages/Dashboard/DashboardConfigs";
import { ChangePasswordConfig } from "../pages/ChangePassword/ChangePasswordConfigs";
import { UnAuthrizedAccessConfigs } from "../pages/UnAuthrizedAccess/UnAuthrizedAccessConfigs";
import { AboutConfig } from "../pages/About/AboutConfig";
import { AccountConfig } from "../pages/Account/AccountConfig";

const routeConfigs = [
  AboutConfig,
  AccountConfig,
 
  DashboardConfig,
 
  LoginConfig,
  ChangePasswordConfig,
  UnAuthrizedAccessConfigs,
  ResetPasswordConfig,
 
];

const routes = [
  ...topsUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    exact: true,
    isPrivate: true,
    component: () => <Redirect to='/dashboard' />
  }
];

export default routes;
