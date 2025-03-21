import { useNavigate } from "react-router-dom";
import "./home.css"
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Shagun Ki Diary</h1>
      <button className="new-friend-btn" onClick={() => navigate("/new-friend")}>
        New Shagun
      </button>
    </div>
  );
};

export default Home;
