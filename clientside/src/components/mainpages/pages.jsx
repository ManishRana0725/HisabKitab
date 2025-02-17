import { Route, Routes } from "react-router-dom";
import Login from "./login/login.jsx"
import Signup from "./signup/signup.jsx";
import Home from "./home/home.jsx"
import Allevent from "./event/allevent.jsx";
import EventTransaction from "./event/eventTransaction.jsx";
import Allfriends from "./friends/allfriends.jsx"
import FriendDetail from "./friends/friendDetail.jsx"
import NewFriend from "./home/newFriend.jsx"
export default function Pages() {
    return (
        <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/allevent" element={<Allevent/>}/>
            <Route path="/event/:id" element={<EventTransaction/>}/>
            <Route path="/allfriends" element={<Allfriends/>}/>
            <Route path="/friend/:id" element={<FriendDetail/>}/>
            <Route path="/new-friend" element={<NewFriend/>} />
        </Routes>
        // new friend add karna hai
    );
}
