import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import MenuTop from "../components/MenuTop";
import Login from "../pages/Login";
import useAuth from "../hooks/useAuth";

import "../css/LayoutApp.css";

import { getAccessTokenApi, getRefreshTokenApi } from "../api/auth";

const LayoutApp = (props) => {
  const { routes } = props;
  const { Header, Content, Footer } = Layout;
  const { user, isLoading } = useAuth();

  // const accessToken = getAccessTokenApi();
  // const refreshToken = getRefreshTokenApi();

  // console.log("Access Token -->", accessToken);
  // console.log("Refresh Token -->", refreshToken);
  // console.log(user);

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </>
    );
  }

  if (user && !isLoading) {
    return (
      <Layout>
        {/* <MenuSider menuCollapsed={menuCollapsed} /> */}
        <Layout
          className="layout-admin"
          // style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header className="layout-admin__header">
            <MenuTop />
          </Header>
          <Content className="layout-admin__content">
            <LoadRoutes user={user} routes={routes} />
          </Content>
          <Footer className="layout-admin__footer">fen1x</Footer>
        </Layout>
      </Layout>
    );
  }

  return null;
};

const LoadRoutes = ({ routes, user }) => {
  return (
    <Switch>
      {routes.map((route, index) => {
        const Component = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            user={user}
            // component={route.component}
            render={(props) => <Component {...props} user={user} />}
          />
        );
      })}
    </Switch>
  );
};

export default LayoutApp;
