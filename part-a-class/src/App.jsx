import { Component } from "react";
import Header from "./Header";
import ExpenseForm from "./ExpenseForm";
import FilterBar from "./FilterBar";
import ExpenseList from "./ExpenseList";
import { formatMoney } from "./constants";

class App extends Component {
  state = {
    expenses: [
      { id: 1, title: "Cơm trưa", amount: 35000, category: "Ăn uống", date: "2026-11-18" },
      { id: 2, title: "Xe buýt đi học", amount: 7000, category: "Đi lại", date: "2026-11-18" },
      { id: 3, title: "Mua sách React", amount: 120000, category: "Học tập", date: "2026-11-17" },
      { id: 4, title: "Xem phim", amount: 90000, category: "Giải trí", date: "2026-11-16" },
    ],
    filter: "Tất cả",
  };

  componentDidMount() { this.updateTitle(); }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenses !== this.state.expenses) this.updateTitle();
  }

  updateTitle() {
    const sum = this.state.expenses.reduce((s, e) => s + e.amount, 0);
    document.title = `Tổng chi: ${formatMoney(sum)}`;
  }

  addExpense = (item) =>
    this.setState((p) => ({ expenses: [...p.expenses, item] }));

  removeExpense = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khoản chi này?")) {
      this.setState((p) => ({ expenses: p.expenses.filter((e) => e.id !== id) }));
    }
  };

  setFilter = (filter) => this.setState({ filter });

  render() {
    const { expenses, filter } = this.state;
    const shown = filter === "Tất cả" ? expenses : expenses.filter((e) => e.category === filter);
    const total = shown.reduce((s, e) => s + e.amount, 0);

    return (
      <div className="app">
        <Header />
        <main className="container">
          <ExpenseForm onAdd={this.addExpense} />
          <FilterBar filter={filter} onChange={this.setFilter} />
          <div className="card">
            <ExpenseList items={shown} onRemove={this.removeExpense} />
            <div className="total">Tổng: {formatMoney(total)}</div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;