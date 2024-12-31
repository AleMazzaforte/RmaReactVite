import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginContainer } from '../componentes/LoginContainer';
import { Componente404 } from '../componentes/Componente404';
import {CargarUsuario} from '../componentes/CargarUsuario';
import {CargarCliente} from '../componentes/CargarCliente';
import {CargarMarcas} from '../componentes/CargarMarcas';
import {CargarProductos} from '../componentes/CargarProductos';
import {CargarRma} from '../componentes/CargarRma';  // Reutilizando este como el elemento para "/"
import {GestionarRma} from '../componentes/GestionarRma';
import {ImprimirEtiqueta} from '../componentes/ImprimirEtiqueta';
import {AgregarTransporte} from '../componentes/AgregarTransporte';
import {GestionarTransporte} from '../componentes/GestionarTransporte';
import {ConsultarStock} from '../componentes/ConsultarStock';
import {CargarOp} from '../componentes/CargarOp';
import {ActualizarOp} from '../componentes/ActualizarOp';
import {Estadisticas} from '../componentes/Estadisticas';
import {Selector} from '../plantillas/selector';

export const Rutas = () => {
  return (
    <div>
        <BrowserRouter> 
            <Selector />    
            <Routes>
                <Route path="/login" element={<LoginContainer />} /> 
                <Route path="/" element={<CargarRma />} />
                <Route path="/cargarUsuario" element={<CargarUsuario />} />
                <Route path="/cargarCliente" element={<CargarCliente />} />
                <Route path="/cargarMarcas" element={<CargarMarcas />} />
                <Route path="/cargarProductos" element={<CargarProductos />} />
                <Route path="/agregarRma" element={<CargarRma />} />
                <Route path="/gestionarRma" element={<GestionarRma />} />
                <Route path="/imprimirEtiqueta" element={<ImprimirEtiqueta />} />
                <Route path="/agregarTransporte" element={<AgregarTransporte />} />
                <Route path="/gestionarTransporte" element={<GestionarTransporte />} />
                <Route path="/stockEjs" element={<ConsultarStock />} />
                <Route path="/cargarOp" element={<CargarOp />} />
                <Route path="/actualizarOp" element={<ActualizarOp />} />
                <Route path="/estadisticas" element={<Estadisticas />} />
                <Route path="*" element={<Componente404 />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

