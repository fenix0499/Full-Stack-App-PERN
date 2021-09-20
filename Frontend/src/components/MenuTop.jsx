import React from "react";
import { Button } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import LogoImage from "../assets/images/logo.png";
import { logout } from "../api/auth";

import "../css/MenuTop.css";

export default function MenuTop(props) {
  const logoutUser = () => {
    logout();
    window.location.reload();
  };
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img className="menu-top__left-logo" src={LogoImage} alt="logo" />
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={logoutUser}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
