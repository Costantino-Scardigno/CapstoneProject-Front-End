import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./component_css/Navbar.css";
import { Button } from "react-bootstrap";
import { GoArrowDownRight } from "react-icons/go";
import logoImage from "../assets/Logo2.png";

function MyNavbar({ setShowForm }) {
  return (
    <Navbar
      expand="xl"
      className="fixed-top border-bottom  bg-light-custom pt-3 px-lg-3 "
    >
      <Container fluid className=" px-4">
        <Navbar.Brand
          className="fs-2 fw-medium d-flex align-items-center m-0 w-xs-50 "
          href="#home"
        >
          <img className="w-20 " src={logoImage} alt="" />
          ScattiFestosi
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className=" fs-3 btn-animated text-primary-custom nav-link-custom mt-2 mt-xl-0"
              href="#how"
            >
              Come funziona
            </Nav.Link>
            <Nav.Link
              className="fs-3 btn-animated text-primary-custom nav-link-custom mt-2 mt-xl-0"
              href="#reviewCarousel"
            >
              Recensioni
            </Nav.Link>
            <Nav.Link
              className="fs-3 btn-animated text-primary-custom nav-link-custom mt-2 mt-xl-0"
              href="#utilità"
            >
              Utilità
            </Nav.Link>
          </Nav>
          <div className="d-flex justify-content-between mt-3  mt-xl-0 border-custom">
            <Button
              onClick={() => setShowForm(true)}
              className="btn-animated fs-4 p-0 pe-3 text-primary-custom"
              variant=""
            >
              Login
            </Button>
            <Button
              onClick={() => setShowForm(true)}
              className="btn-sign rounded-pill border-custom bg-secondary-custom text-primary-custom"
              variant=""
              size="lg"
            >
              Registrati
              <GoArrowDownRight className="react-icon" />
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
