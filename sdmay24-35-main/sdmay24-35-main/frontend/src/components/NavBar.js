import React from "react";
import { ReactComponent as Logo } from "./logo512.png";

const NavBar = () => {
  return (
    <>
      <Nav>
        <NavLogo to="/">
          Logo
          <Logo />
        </NavLogo>

        <Bars />

        <NavMenu>
          <NavLink to="/home/" activeStyle={{ color: "black" }}>
            Home
          </NavLink>
          <NavLink to="/survey/" activeStyle={{ color: "black" }}>
            Take Survey
          </NavLink>
          <NavLink to="/results/" activeStyle={{ color: "black" }}>
            View Results
          </NavLink>
          <NavBtn>
            <NavBtnLink to="/login/">Login</NavBtnLink>
          </NavBtn>
        </NavMenu>
      </Nav>
    </>
  );
};
export default NavBar;
