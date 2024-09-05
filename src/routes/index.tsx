import {Route, Routes} from "react-router-dom";
import Main from "../pages/Main.tsx";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import PublicRoutes from "./PublicRoutes.tsx";
import Signup from "../pages/Signup.tsx";
import Login from "../pages/Login.tsx";


export default function Router(){
    return(
        <Routes>

            <Route element={<PublicRoutes/>}>
                <Route path={'/login'} element={<Login/>} />
                <Route path={'/signup'} element={<Signup/>} />
            </Route>

            <Route element={<ProtectedRoutes/>}>
                <Route path="/" element={<Main />} />
            </Route>
        </Routes>
    )
}
