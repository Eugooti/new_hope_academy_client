// ProtectedRoute.jsx

import { Navigate, Outlet,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {getFromSessionStorage} from "./LocalStorage/sessionStorage.jsx";

const ProtectedRoute = () => {

    const location=useLocation()

    const { isLoggedIn } = useSelector(state => state.auth);

    // Check if logged in and token exists in localStorage
    const isAuthenticated = isLoggedIn || getFromSessionStorage('token');

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{from:location}} replace />;
};

export default ProtectedRoute;
