import React from 'react'
import { Container, Navbar, Nav, NavItem } from 'reactstrap'

function Footer() {
  return (
    <Navbar color="light" light className="navbar fixed-bottom">
      <Container>
        <small className="text-muted">RotaApp</small>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <small className="text-center text-muted">
              Github <a href="https://github.com/fellowwws">Fellowwws</a>
            </small>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Footer
