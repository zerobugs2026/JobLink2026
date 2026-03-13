import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Encabezado.css';

const Encabezado = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    setExpanded(false);
  };

  const navItems = [
    { path: "/comunidad", label: "Comunidad" },
    { path: "/empleos", label: "Empleos" },
    { path: "/empresas", label: "Empresas" },
    { path: "/salarios", label: "Salarios" },
    { path: "/para-empleadores", label: "Para empleadores" }
  ];

  return (
    <>
      <Navbar 
        expand="lg" 
        fixed="top" 
        className="navbar-custom"
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container>
          <Navbar.Brand 
            onClick={() => handleNavigate("/")} 
            className="navbar-brand-custom"
          >
            <div className="logo-placeholder">
              JL
            </div>
            <span>JobLink</span>
          </Navbar.Brand>
          
          <Navbar.Toggle 
            aria-controls="navbar-nav"
            className="navbar-toggler-custom"
          />
          
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mx-auto">
              {navItems.map((item) => (
                <Nav.Link
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`nav-link-custom ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
            
            <Button 
              onClick={() => handleNavigate("/login")}
              className="btn-iniciar-sesion"
            >
              Iniciar sesión
              <i className="bi bi-arrow-right ms-2"></i>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      {/* Espaciado para evitar que el contenido quede debajo del navbar fijo */}
      <div className="navbar-spacer"></div>
    </>
  );
};

export default Encabezado;