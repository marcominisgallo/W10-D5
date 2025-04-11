import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const MyNavbar = () => {
  const location = useLocation();
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark">
      <Container fluid>
        <Link className="navbar-brand" href="#home">
          MinisMeteo
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link
              className={
                location.pathname === "/" ? "nav-link active" : "nav-link"
              }
              to={"/"}
            >
              Home
            </Link>
            <Link
              className={
                location.pathname === "/search" ? "nav-link active" : "nav-link"
              }
              to={"/search"}
            >
              Cerca la tua città
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
