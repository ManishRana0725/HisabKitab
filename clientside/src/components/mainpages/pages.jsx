import { Route, Routes } from "react-router-dom";
import Login from "./login/login.jsx"
import Signup from "./signup/signup.jsx";
import Allevent from "./event/allevent.jsx";
export default function Pages() {
    return (
        <Routes>
            <Route path="/" element={"This is home Page"} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/allevent" element={<Allevent/>}/>
        </Routes>
    );
}
