import React, { useContext } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from './userContext';

type DropDownProp = {
  logout: () => Promise<void>;
}


function DropDown({logout}: DropDownProp) {
  const { user } = useContext(UserContext);

  return (
    <Navbar variant="secondary" bg="" expand="">
      <Navbar.Toggle aria-controls="navbar-dark-example" />
      <Navbar.Collapse id="navbar-dark-example">
        <Nav>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Bugly"
            menuVariant="dark"
          >
            {/* <NavDropdown.Divider /> */}
            {!user
              ? <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              : <NavDropdown.Item onClick={logout} href="/">Logout</NavDropdown.Item>
            }
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default DropDown;