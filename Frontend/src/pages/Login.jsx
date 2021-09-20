import React from "react";
import { Layout, Tabs } from "antd";
import LoginForm from "../components/LoginForm";
import CreateAcountForm from "../components/CreateAcountForm";

import "../css/Login.css";

const Login = () => {
  const { Content } = Layout;
  const { TabPane } = Tabs;

  return (
    <Layout className="sing-in">
      <Content className="sing-in__content">
        <div className="sing-in__content-tabs">
          <Tabs type="card">
            <TabPane tab={<span>Login</span>} key="1">
              <LoginForm />
            </TabPane>
            <TabPane tab={<span>Create Acount</span>} key="2">
              <CreateAcountForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
