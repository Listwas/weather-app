import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUnit } from "../store/unitsSlice.js";
import "../styles/Header.css";

export default function Header({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.units.tempUnit);

  const currentPage = location.pathname === "/favorites" ? "favorites" : "home";

  return (
    <div className="header">
      <div className="nav-buttons">
        <button
          className={currentPage === "home" ? "active" : ""}
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          className={currentPage === "favorites" ? "active" : ""}
          onClick={() => navigate("/favorites")}
        >
          Favorites
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="unit-buttons">
        {["C", "F", "K"].map((u) => (
          <button
            key={u}
            className={unit === u ? "active" : ""}
            onClick={() => dispatch(setUnit(u))}
          >
            {u}°
          </button>
        ))}
      </div>
    </div>
  );
}
