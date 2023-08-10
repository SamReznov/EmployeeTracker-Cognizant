import React from "react";
import AppHeader, { AppHeaderProps } from "../containers/header/AppHeader";
import AppFooter from "../containers/footer/AppFooter";
import AppBody from "../containers/body/AppBody";
import './LandingPage.scss';
import SideBar from "../containers/sidebar/SideBar";
import { Outlet } from "react-router-dom";

function LandingPage() {
    return(
      <div className="App">
        <AppHeader/>
        <AppBody/> 
        <AppFooter/>
      </div>
    );
}
export default LandingPage;