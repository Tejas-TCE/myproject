import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbarpag = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          {/* Navbar.Brand માટે React Router's Link વાપરીએ */}
          <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* Nav.Link સાથે as={Link} વાપરીએ */}
              <Nav.Link as={Link} to="/Home">Home</Nav.Link>
              <Nav.Link as={Link} to="/About">About</Nav.Link>
              <Nav.Link as={Link} to="/Contact">Contact</Nav.Link>
            </Nav>
            <Nav className="gap-2">
              {/* Button માટે Link નો ઉપયોગ */}
              {
                localStorage.getItem("Loginpag") ?
                <Link to="/Detallogin">
                  <Button variant="danger">btn</Button>
                  </Link> 
                  :
                  <Link to="/Loginpag">
                    <Button variant="primary">Login</Button>
                  </Link>
              }


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbarpag;
