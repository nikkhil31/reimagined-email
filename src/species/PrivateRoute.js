import {  Outlet, useNavigate } from 'react-router-dom';
import { useAppcontext } from '../context/AppProvider';

const PrivateRoute = () => {

    const {state:{user}}    = useAppcontext()
    let navigate            = useNavigate();

    console.log(user);
    return user ? <Outlet />  : navigate('/login')
};

export default PrivateRoute;
