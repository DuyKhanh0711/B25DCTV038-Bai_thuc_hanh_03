import { Component } from "react";
import { CATEGORIES } from "./constants";

class FilterBar extends Component {
  render() {
    const { filter, onChange } = this.props;
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
}

export default FilterBar;