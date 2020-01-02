import React, {
  Fragment,
  useState, 
  useContext 
} from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { Link } from "react-router-dom";
import { AuthContext } from '../providers/authProvider';

function Navigation() {
  const { user, auth } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <Navbar color="light" light expand="md">
        <Link 
          className="navbar-brand text-primary" 
          to="/">
          RotaApp
        </Link>

        { user && <NavbarToggler onClick={() => setIsOpen(!isOpen)} />}

        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          {(user && user.admin) && <NavLinks />}
          </Nav>

          <Nav className="ml-auto" navbar>
          { user && <Menu user={user} signOut={() => auth.signOut()}/> }
          </Nav>

        </Collapse>
      </Navbar>
    </Fragment>
  );
}

const NavLinks = () => (
  <Fragment>
    <NavItem>
      <Link className="nav-link" to="/rota">New Rota ✏️</Link>
    </NavItem>
    <NavItem>
      <Link className="nav-link" to="/staff">Manage Staff 👤</Link>
    </NavItem>
  </Fragment>
);

const Menu = ({user, signOut}) => {
  const handleSignOut = () => {
    if (window.confirm('Are you sure?')) {
      signOut();
    }
  }

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        {user.name.first}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          <Link className="no-decor" to="/settings">Settings ⚙️</Link>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem className="text-primary" onClick={handleSignOut}>
          Sign Out 👋
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Navigation;