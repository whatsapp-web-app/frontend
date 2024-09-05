import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/regsiter" element={<Register />} />
    </Routes>
  );
}

export default Router;
