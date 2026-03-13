import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import './styles/Home.css'; // Importar estilos de Home
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/nosotros" element={<Home />} />
          <Route path="/servicios" element={<Home />} />
          <Route path="/contacto" element={<Home />} />
          <Route path="/login" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
