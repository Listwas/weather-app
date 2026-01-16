import { Provider } from "react-redux";
import store from "./store/store.js";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import "./styles/App.css";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("searchQuery");
    if (saved) setSearchQuery(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  return (
    <Provider store={store}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route
          path="/favorites"
          element={<Favorites searchQuery={searchQuery} />}
        />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Provider>
  );
}
