import useAppSelector from "../hooks/useAppSelector.tsx";
import {Navigate, Outlet} from "react-router-dom";

const PublicRoutes=()=>{
    const {isAuthenticated}=useAppSelector(state=>state.authSlice)
    return isAuthenticated?<Navigate to={'/'}/>:<Outlet/>
}

export default PublicRoutes;
