import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Navbar, NavbarBrand, NavbarToggler, NavbarText, Nav, NavItem, Collapse } from "reactstrap";

export default function Navi(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="dark" dark expand="md" container="lg" className="mb-4">
        <div>
          <NavbarBrand tag={Link} to="/">
            The Rick And Morty
          </NavbarBrand>
          | Characters
        </div>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem className="mb-2 mb-md-0">
              <a href="https://github.com/serdargoleli/" target="_blank">
                Github
              </a>
            </NavItem>
            <NavItem className="mb-2 mb-md-0">
              <a href="https://www.linkedin.com/in/serdargoleli/" target="_blank">
                Linkedin
              </a>
            </NavItem>
          </Nav>
          <NavbarText>{props.children}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}
