import SearchBar from "./SearchBar";
import UnitsSelector from "./UnitsSelector";
import "../styles/Header.css";

function Header() {
  return (
    <div className="header">
      <SearchBar />
      <UnitsSelector />
    </div>
  );
}

export default Header;
