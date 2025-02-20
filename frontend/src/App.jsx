import React from 'react';
import MapboxExample from './components/MapboxExample';
import IrradiationData from './components/IrradiationData';
import Home from './components/Home';
import { Route, Routes, BrowserRouter } from "react-router"
import './App.css';
import WeatherComponent from './components/MLModelData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/MapboxExample" element={<MapboxExample />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </BrowserRouter>
    // <WeatherComponent />
    // <IrradiationData />
  );
}

export default App;
