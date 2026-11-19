import { useState, useContext } from "react";
import Clock from "./Clock";
import { ThemeContext } from "./context/ThemeContext";

function Header() {
  const [showClock, setShowClock] = useState(true);
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <header className="header">
      <h1>💰 Sổ chi tiêu cá nhân</h1>
      <div className="header-right">
        {showClock && <Clock />}
        <button className="ghost" onClick={() => setShowClock((s) => !s)}>
          {showClock ? "Ẩn đồng hồ" : "Hiện đồng hồ"}
        </button>
        <button className="ghost" onClick={toggle}>
          {theme === "light" ? "🌙 Tối" : "☀️ Sáng"}
        </button>
      </div>
    </header>
  );
}

export default Header;