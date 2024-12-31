import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginContainer } from '../componentes/LoginContainer';
import { Componente404 } from '../componentes/Componente404';
import { CargarUsuario } from '../componentes/CargarUsuario';
import { CargarCliente } from '../componentes/CargarCliente';
import { CargarMarcas } from '../componentes/CargarMarcas';
import { CargarProductos } from '../componentes/CargarProductos';
import { CargarRma } from '../componentes/CargarRma';
import { GestionarRma } from '../componentes/GestionarRma';
import { ImprimirEtiqueta } from '../componentes/ImprimirEtiqueta';
import { AgregarTransporte } from '../componentes/AgregarTransporte';
import { GestionarTransporte } from '../componentes/GestionarTransporte';
import { ConsultarStock } from '../componentes/ConsultarStock';
import { CargarOp } from '../componentes/CargarOp';
import { ActualizarOp } from '../componentes/ActualizarOp';
import { Estadisticas } from '../componentes/Estadisticas';
import { Selector } from '../plantillas/selector';
import { Authenticator } from '../componentes/Authenticator';
import ProtectedRoute from '../componentes/ProtectedRoute';

export const Rutas = () => {
  return (
    <div>
        <BrowserRouter> 
          <Authenticator>
              <Selector />    
              <Routes>
                  <Route path="/login" element={<LoginContainer />} /> 
                  <Route path="/" element={<ProtectedRoute><CargarRma /></ProtectedRoute>} />
                  <Route path="/cargarUsuario" element={<ProtectedRoute><CargarUsuario /></ProtectedRoute>} />
                  <Route path="/cargarCliente" element={<ProtectedRoute><CargarCliente /></ProtectedRoute>} />
                  <Route path="/cargarMarcas" element={<ProtectedRoute><CargarMarcas /></ProtectedRoute>} />
                  <Route path="/cargarProductos" element={<ProtectedRoute><CargarProductos /></ProtectedRoute>} />
                  <Route path="/agregarRma" element={<ProtectedRoute><CargarRma /></ProtectedRoute>} />
                  <Route path="/gestionarRma" element={<ProtectedRoute><GestionarRma /></ProtectedRoute>} />
                  <Route path="/imprimirEtiqueta" element={<ProtectedRoute><ImprimirEtiqueta /></ProtectedRoute>} />
                  <Route path="/agregarTransporte" element={<ProtectedRoute><AgregarTransporte /></ProtectedRoute>} />
                  <Route path="/gestionarTransporte" element={<ProtectedRoute><GestionarTransporte /></ProtectedRoute>} />
                  <Route path="/stockEjs" element={<ProtectedRoute><ConsultarStock /></ProtectedRoute>} />
                  <Route path="/cargarOp" element={<ProtectedRoute><CargarOp /></ProtectedRoute>} />
                  <Route path="/actualizarOp" element={<ProtectedRoute><ActualizarOp /></ProtectedRoute>} />
                  <Route path="/estadisticas" element={<ProtectedRoute><Estadisticas /></ProtectedRoute>} />
                  <Route path="*" element={<Componente404 />} />
              </Routes>
          </Authenticator>
        </BrowserRouter>
    </div>
  );
}


