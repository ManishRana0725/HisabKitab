import { Route, Routes } from "react-router-dom";
import Login from "./login/login.jsx"
export default function Pages() {
    return (
        <Routes>
            <Route path="/" element={"This is home Page"} />
            <Route path="/login" element={<Login />} />
            
        </Routes>
    );
}
