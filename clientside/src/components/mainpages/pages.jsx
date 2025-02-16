import { Route, Routes } from "react-router-dom";
import Login from "./login/login.jsx"
import Signup from "./signup/signup.jsx";
import Allevent from "./event/allevent.jsx";
import EventTransaction from "./event/eventTransaction.jsx";
import Allfriends from "./friends/allfriends.jsx"
import FriendDetail from "./friends/friendDetail.jsx"
export default function Pages() {
    return (
        <Routes>
            <Route path="/" element={"This is home Page"} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/allevent" element={<Allevent/>}/>
            <Route path="/event/:id" element={<EventTransaction/>}/>
            <Route path="/allfriends" element={<Allfriends/>}/>
            <Route path="/friend/:id" element={<FriendDetail/>}/>
        </Routes>
    );
}
