import React, { useState } from 'react'; 
import { BusquedaClientes } from './utilidades/BusquedaClientes.jsx'; 
import { BusquedaProductos } from './utilidades/ListarProductos.jsx'; 
import { ListarMarcas } from './utilidades/ListarMarcas.jsx'; 
import Swal from 'sweetalert2'; 

export const CargarRma = () => { 
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null); 
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); 
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null); 



  let urlClientes = 'https://rmareactviteback.onrender.com/buscarCliente'; 
  let urlProductos = 'https://rmareactviteback.onrender.com/buscarProductos'; 
  let urlMarcas = 'https://rmareactviteback.onrender.com/listarMarcas';
  let urlAgregarRma = 'https://rmareactviteback.onrender.com/agregarRma'; 
  
  if (window.location.hostname === 'localhost') { 
    urlClientes = 'http://localhost:8080/buscarCliente'; 
    urlProductos = 'http://localhost:8080/buscarProductos'; 
    urlMarcas = 'http://localhost:8080/listarMarcas'; 
    urlAgregarRma = 'http://localhost:8080/agregarRma';
  }

  
  const handleClienteSeleccionado = (cliente) => { 
    setClienteSeleccionado(cliente); };

  const handleProductoSeleccionado = (producto) => { 
      setProductoSeleccionado(producto); 
  }; 
    
  const handleMarcaSeleccionada = (marca) => { 
    setMarcaSeleccionada(marca); 
  }; 
  
  const enviarFormulario = async (e) => {
     e.preventDefault(); 
     const formData = { 
      modelo: productoSeleccionado?.sku || '', 
      cantidad: e.target.cantidad.value, marca: marcaSeleccionada?.nombre || '',
       solicita: e.target.solicita.value, opLote: e.target.opLote.value || null, 
       vencimiento: e.target.vencimiento.value || null, 
       seEntrega: e.target.seEntrega.value || null, 
       seRecibe: e.target.seRecibe.value || null, 
       observaciones: e.target.observaciones.value || null, 
       nIngreso: e.target.nIngreso.value || null, 
       nEgreso: e.target.nEgreso.value || null, 
       idCliente: clienteSeleccionado?.id || '' 
      }; 
      
      try { 
        
        const response = await fetch(urlAgregarRma, { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify(formData), 
      }); 
      
      if (response.ok) { 
        Swal.fire({ 
          icon: 'success', 
          title: 'RMA agregado', 
          text: 'El RMA se ha agregado correctamente', 
        }); 
      } 
      else { 
        Swal.fire({ 
          icon: 'error', 
          title: 'Error', 
          text: 'Hubo un problema al agregar el RMA', 
        }); 
      } 
    } 
    catch (error) { 
      console.error('Error al enviar el formulario:', error); 
      Swal.fire({ 
        icon: 'error', 
        title: 'Error', 
        text: 'Hubo un problema al enviar el formulario',
      }); 
    } 
  }; 
  
  


  return (
    <div className="w-full max-w-xl bg-white rounded-lg shadow-lg shadow-gray-500 p-8 mx-auto mb-6" style={{ maxWidth: '600px', boxShadow: '0 -10px 20px rgba(0, 0, 0, 0.3)' }}>
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-500 font-bold">LOGO</span>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-8">Cargar RMA</h2>
      <form id="formRma" className="space-y-6" onSubmit={enviarFormulario}>
        <div>
          <label htmlFor="clienteSearch" className="block text-sm font-medium text-gray-700 mb-1">Cliente:</label>
          <BusquedaClientes endpoint={urlClientes} onClienteSeleccionado={handleClienteSeleccionado} campos={['nombre']} />
        </div>
        {clienteSeleccionado && (<input type="hidden" name="idCliente" value={clienteSeleccionado.id} />)}

        <div>
          <label htmlFor="modelo" className="block text-sm font-medium text-gray-700 mb-1 campoOculto">SKU:</label>
          <BusquedaProductos endpoint={urlProductos} onProductoSeleccionado={handleProductoSeleccionado} campos={['sku']} />
        </div>
        {productoSeleccionado && (<input type="hidden" name="idProducto" value={productoSeleccionado.id} />)}

        <div className="divrelleno"></div>
        <div id="suggestionsContainer2" style={{ display: 'none' }}></div>

        <div>
          <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 mb-1 campoOculto">Cantidad:</label>
          <input type="number" id="cantidad" name="cantidad" min="1" className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none campoOculto" />
        </div>

        <div>
          <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-1 campoOculto">Marca:</label>
          <ListarMarcas endpoint={urlMarcas} onMarcaSeleccionada={handleMarcaSeleccionada} campos={['nombre']} />
        </div>
        {marcaSeleccionada && (<input type="hidden" name="idMarca" value={marcaSeleccionada.id} />)}

        <div>
          <label htmlFor="solicita" className="block text-sm font-medium text-gray-700 mb-1 campoOculto">Solicita:</label>
          <input type="date" id="solicita" name="solicita" autoComplete="off" className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none campoOculto" required />
        </div>

        <div>
          <label htmlFor="opLote" className="block text-sm font-medium text-gray-700 mb-1 campoOculto">OP/Lote:</label>
          <input type="text" id="opLote" name="opLote" autoComplete="off" className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none campoOculto" />
        </div>
        <div className="divrelleno"></div>
        <div id="suggestionsOp" className="suggestions-container" style={{ display: 'none' }}></div>

        <div>
          <label htmlFor="vencimiento" className="block text-sm font-medium text-gray-700 mb-1 campoOculto">Vencimiento:</label>
          <input type="date" id="vencimiento" name="vencimiento" className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none campoOculto" />
        </div>

        <div>
          <label htmlFor="seEntrega" className="block text-sm font-medium text-gray-700 mb-1 campoOculto">Se Entrega:</label>
          <input type="date" id="seEntrega" name="seEntrega" autoComplete="off" className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none campoOculto" />
        </div>

        <div>
          <label htmlFor="seRecibe" className="block text-sm font-medium text-gray-700 mb-1 campoOculto">Se Recibe:</label>
          <input type="date" id="seRecibe" name="seRecibe" autoComplete="off" className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none campoOculto" />
        </div>

        <div>
          <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1 campoOculto">Observaciones:</label>
          <textarea id="observaciones" name="observaciones" rows="2" className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none campoOculto"></textarea>
        </div>

        <div>
          <label htmlFor="numIngreso" className="block text-sm font-medium text-gray-700 mb-1 campoOculto">N° de Ingreso:</label>
          <input type="text" id="numIngreso" name="nIngreso" className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none campoOculto" /> </div>


        <div>
          <label htmlFor="numEgreso" className="block text-sm font-medium text-gray-700 mb-1 campoOculto">N° de Egreso:</label>
          <input type="text" id="numEgreso" name="nEgreso" className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none campoOculto" />
        </div>

        <input type="hidden" id="idCliente" name="idCliente" />

        <div>
          <button type="submit" id="botonCargar" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 campoOculto" disabled={!productoSeleccionado}>Cargar RMA</button>
        </div>
      </form>
    </div>
  );
};








