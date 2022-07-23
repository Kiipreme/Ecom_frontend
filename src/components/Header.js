import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";

function Header() {
  return (
    <header>
      <Navbar bg="primary" expand="lg" collapseOnSelect>
        <Container>
          <Link className='mx-2 text-black fs-3 fw-bold' to="/">Tech Store</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/cart">
                <FaIcons.FaShoppingCart />
                Cart
              </Nav.Link>
              <Nav.Link href="/login">
                <FaIcons.FaUser />
                Login
              </Nav.Link>
              <Nav.Link href="/add">
                <BsIcons.BsPlusCircle />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
export default Header;
