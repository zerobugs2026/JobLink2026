import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './views/Inicio';
import './styles/Inicio.css'; // Importar estilos de Home
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
