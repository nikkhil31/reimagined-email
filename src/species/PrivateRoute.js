import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppcontext } from '../context/AppProvider';
import { isEmpty } from '../helper/check';

const PrivateRoute = () => {

    const { state: { user } } = useAppcontext()
    let location = useLocation();


    if (isEmpty(user)) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return <Outlet />
};

export default PrivateRoute;
