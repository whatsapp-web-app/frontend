import useAppSelector from "../hooks/useAppSelector.tsx";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes=()=>{
    const {isAuthenticated}=useAppSelector(state=>state.authSlice)
    return isAuthenticated?<Outlet/>:<Navigate to={'/login'}/>
}

export default ProtectedRoutes;
