import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Authenticator';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    // Verificamos si isAuthenticated es null para mostrar un mensaje de carga
    if (isAuthenticated === null) {
        return <div>Cargando...</div>;
    }

    // Si el usuario no está autenticado, redirigimos al login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Si el usuario está autenticado, mostramos el contenido protegido
    return children;
};

export default ProtectedRoute;
