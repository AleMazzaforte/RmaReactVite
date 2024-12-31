import React, { useState } from 'react';

export const BusquedaClientes = ({ endpoint, onClienteSeleccionado, campos }) => {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      try {
        const response = await fetch(`${endpoint}?query=${value}`);
        const data = await response.json();
        setResultados(data.filter(cliente => cliente.nombre.toLowerCase().includes(value.toLowerCase())));
        console.log(data);
      } catch (error) {
        console.error('Error buscando clientes:', error);
      }
    } else {
      setResultados([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' && selectedIndex < resultados.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else if (e.key === 'ArrowUp' && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      onClienteSeleccionado(resultados[selectedIndex]);
      setResultados([]);
      setQuery(resultados[selectedIndex].nombre);  // Mostrar el nombre seleccionado en el input
    }
  };

  const handleClick = (cliente) => {
    onClienteSeleccionado(cliente);
    setResultados([]);
    setQuery(cliente.nombre);  // Mostrar el nombre seleccionado en el input
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Buscar cliente"
        className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
      />
      {resultados.length > 0 && (
        <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {resultados.map((cliente, index) => (
            <div
              key={cliente.id}
              onClick={() => handleClick(cliente)}
              className={`px-4 py-2 hover:bg-gray-200 cursor-pointer ${selectedIndex === index ? 'bg-gray-200' : ''}`}
            >
              {campos.map((campo) => (
                <div key={campo}>{cliente[campo]}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


