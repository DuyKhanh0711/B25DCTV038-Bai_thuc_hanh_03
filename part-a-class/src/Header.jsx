import { Component } from "react";
import Clock from "./Clock";

class Header extends Component {
  state = { showClock: true };

  toggleClock = () => this.setState((p) => ({ showClock: !p.showClock }));

  render() {
    return (
      <header className="header">
        <h1>💰 Sổ chi tiêu cá nhân</h1>
        <div className="header-right">
          {this.state.showClock && <Clock />}
          <button className="ghost" onClick={this.toggleClock}>
            {this.state.showClock ? "Ẩn đồng hồ" : "Hiện đồng hồ"}
          </button>
        </div>
      </header>
    );
  }
}

export default Header;