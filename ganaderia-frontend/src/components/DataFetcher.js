import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/usuarios');
        setData(response.data); // Guardar los datos en el estado
      } catch (error) {
        setError('Error al obtener datos del backend');
        console.error('Error al obtener datos del backend:', error);
      }
    };

    fetchData(); // Llamada a la API cuando el componente se monta
  }, []); // El arreglo vacío asegura que solo se ejecute una vez al montar el componente

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Datos del Backend</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Muestra los datos */}
    </div>
  );
};

export default DataFetcher;
