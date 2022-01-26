import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppcontext } from '../context/AppProvider';

const PrivateRoute = () => {

    const { state: { user } } = useAppcontext()
    let location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />
    }


    return <Outlet />
};

export default PrivateRoute;
