import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BusquedaClientes } from "./utilidades/BusquedaClientes.jsx";
import TablaRmas from "./utilidades/TablasRmas.jsx";
import Loader from "./utilidades/Loader.jsx"; // Importa el loader

export const GestionarRma = () => {
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [rmas, setRmas] = useState([]);
  const [editRma, setEditRma] = useState(null);
  const [clienteId, setClienteId] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Estado para el loader

  const handleClienteSeleccionado = (cliente) => {
    event.preventDefault();
    setClienteSeleccionado(cliente);
    setClienteId(cliente.id);
  };

  let urlClientes = "https://rmareactviteback.onrender.com/buscarCliente";
  let urlRmasCliente = "https://rmareactviteback.onrender.com/getRmaCliente";
  let urlEliminarRma = "https://rmareactviteback.onrender.com/eliminarRma";
  let urlActualizarRma = "https://rmareactviteback.onrender.com/actualizarProductoRma";

  if (window.location.hostname === "localhost") {
    urlClientes = "http://localhost:8080/buscarCliente";
    urlRmasCliente = "http://localhost:8080/getRmaCliente";
    urlEliminarRma = "http://localhost:8080/eliminarRma";
    urlActualizarRma = "http://localhost:8080/actualizarProductoRma";
  }
  const url = `${urlRmasCliente}/${clienteId}`;

  useEffect(() => {
    if (clienteId !== 0) {
      const loadingTimeout = setTimeout(() => setIsLoading(true), 3000);
      fetch(url, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Datos recibidos:", data);
          if (Array.isArray(data) && data.length === 0) {
            Swal.fire({
              icon: "info",
              title: "No hay RMAs",
              text: `El cliente ${clienteSeleccionado.nombre} no tiene RMAs registrados`,
            });
          } else if (Array.isArray(data)) {
            setRmas(data);
          } else {
            console.error("Datos inesperados recibidos:", data);
          }
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
        })
        .finally(() => {
          clearTimeout(loadingTimeout);
          setIsLoading(false);
        });
    }
  }, [clienteId]);

  const handleEliminar = async (idRma) => {
    alert("Eliminando RMA con ID:", idRma);
    try {
      const response = await fetch(`${urlEliminarRma}/${idRma}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "RMA eliminado",
          text: "El RMA se ha eliminado correctamente",
        });
        setRmas(rmas.filter((rma) => rma.id !== idRma));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al eliminar el RMA",
        });
      }
    } catch (error) {
      console.error("Error al eliminar RMA:", error);
    }
  };

  const handleActualizar = (rma) => {
    alert("Actualizando RMA:", rma);
    setEditRma(rma);
  };

  const handleSubmitActualizar = async (e) => {
    e.preventDefault();
    const formData = {
      modelo: e.target.modelo.value,
      cantidad: e.target.cantidad.value,
      marca: e.target.marca.value,
      solicita: e.target.solicita.value,
      opLote: e.target.opLote.value || null,
      vencimiento: e.target.vencimiento.value || null,
      seEntrega: e.target.seEntrega.value || null,
      seRecibe: e.target.seRecibe.value || null,
      observaciones: e.target.observaciones.value || null,
      nIngreso: e.target.nIngreso.value || null,
      nEgreso: e.target.nEgreso.value || null,
    };

    try {
      const response = await fetch(`${urlActualizarRma}/${editRma.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "RMA actualizado",
          text: "El RMA se ha actualizado correctamente",
        });
        setEditRma(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al actualizar el RMA",
        });
      }
    } catch (error) {
      console.error("Error al actualizar RMA:", error);
    }
  };

  return (
    <>
      <div
        className="w-full max-w-xl bg-white rounded-lg shadow-lg shadow-gray-500 p-8 mx-auto mb-6"
        style={{
          maxWidth: "600px",
          boxShadow: "0 -10px 20px rgba(0, 0, 0, 0.3)",
          height: "330px",
        }}
      >
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-500 font-bold">LOGO</span>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-8">
          Consulta cliente
        </h2>
        <form id="formCliente" className="space-y-6">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre:
            </label>

            <BusquedaClientes
              endpoint={urlClientes}
              onClienteSeleccionado={handleClienteSeleccionado}
              campos={["nombre"]}
            />
          </div>
        </form>
      </div>

      {isLoading && <Loader />} {/* Mostrar el loader si está cargando */}
      {clienteSeleccionado && !isLoading && (
        <TablaRmas
          rmas={rmas}
          handleActualizar={handleActualizar}
          handleEliminar={handleEliminar}
        />
      )}
    </>
  );
};
