import React from 'react';
import './App.css';
import DataFetcher from './components/DataFetcher'; // Asegúrate de tener la ruta correcta

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenido a mi Aplicación React</h1>
        {/* Aquí puedes agregar tu componente DataFetcher */}
        <DataFetcher />
      </header>
    </div>
  );
}

export default App;