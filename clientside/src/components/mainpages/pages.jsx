import { Route, Routes } from "react-router-dom";
import Login from "./login/login.jsx"
import Signup from "./signup/signup.jsx";
import Home from "./home/home.jsx"
import PayPage from "./paypage.jsx";
import Allevent from "./event/allevent.jsx";
import EventTransaction from "./event/eventTransaction.jsx";
import CreateEvent from "./event/createEvent.jsx";
import Allfriends from "./friends/allfriends.jsx"
import FriendDetail from "./friends/friendDetail.jsx"
import PaytoFriend from "./friends/payTofriend.jsx"
import NewFriend from "./home/newFriend.jsx"
import Profile from "./profile/profile.jsx"
export default function Pages() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/allevent" element={<Allevent/>}/>
            <Route path="/event/:id" element={<EventTransaction/>}/>
            <Route path="/create-event" element={<CreateEvent/>}/>
            <Route path="/allfriends" element={<Allfriends/>}/>
            <Route path="/friend/:id" element={<FriendDetail/>}/>
            <Route path="/friend/:id/pay" element={<PaytoFriend/>}/>
            <Route path="/new-friend" element={<NewFriend/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/pay/:formattedEventName/:formattedFriendName/:friendId" element={<PayPage />} /> 
        </Routes>
        // har ek api request pe checkToken file pass karo aur forntend se header authication pass karo
    );
}

// const token = localStorage.getItem("token"); // Retrieve token from localStorage
// if (!token) {
//     throw new Error("No authentication token found");
// }
// console.log("token of the login user :",token)
// const res = await axios.get(`http://localhost:8080/api_market/category/${id}/api/all`, {
//     headers: { Authorization: `Bearer ${token}` }
// }); // ✅ Replace with actual API endpoint
