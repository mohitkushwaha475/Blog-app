 import { useContext, useEffect, useState } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { getCurrentUserDetail, isLoggedIn, doLogout } from "../auth";
import { toast } from "react-toastify";
import userContext from "../context/userContext";

const CustomNavbar = () => {

  const userContextData=useContext(userContext)
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);

  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(
    () => {
      setLogin(isLoggedIn());
      setUser(getCurrentUserDetail());
    },
    { login }
  );

  const logout = () => {
    doLogout(() => {
      //logged out
     
      setLogin(false);
     
      userContextData.setUser({
        data:null,
        login:false
      })
      navigate("/login");
    });
  };

  return (
    <div>
      <Navbar  dark expand="md" fixed="top" className="px-4 NavManual" >
        <NavbarBrand tag={ReactLink} to="/">
          MyBlogs
        </NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                New Feed
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/services">
                Services
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Contact us</DropdownItem>
                <DropdownItem>Facebook</DropdownItem>

                <DropdownItem divider />
                <DropdownItem>Linkedin</DropdownItem>
                <DropdownItem>Instagram</DropdownItem>
                <DropdownItem>YouTube</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {login  && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`}>
                    Profile Info
                  </NavLink>
                </NavItem>
                <NavItem onClick={logout}>
                  <NavLink tag={ReactLink} to="/">Logout</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ReactLink} to={`/user/dashboard`}>{user.email}</NavLink>
                </NavItem>
              </>
            )}

            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default CustomNavbar;
