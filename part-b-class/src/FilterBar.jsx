import { CATEGORIES } from "./constants";

function FilterBar({ filter, onChange }) {
  return (
    <div className="filter">
      {["Tất cả", ...CATEGORIES].map((c) => (
        <button key={c} className={c === filter ? "active" : ""} onClick={() => onChange(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;