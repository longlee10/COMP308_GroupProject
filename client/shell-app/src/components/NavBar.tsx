import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-5">
      <Container>
        <Navbar.Brand>Vital Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto gap-3">
            <Nav.Item>
              <Link to="/vital-sign">Vital Sign</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/alert">Alert</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/motivation">Motivation</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/symptom">Symptom</Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
