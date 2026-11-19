import { useState, useEffect, useContext } from "react";
import Header from "./Header";
import ExpenseForm from "./ExpenseForm";
import FilterBar from "./FilterBar";
import ExpenseList from "./ExpenseList";
import useFetch from "./hooks/useFetch";
import { ThemeContext } from "./context/ThemeContext";
import { formatMoney } from "./constants";

const API_URL = "https://6ad637e7f71f154ac486aa01.mockapi.io/expenses"

function App() {
  const { data: expenses, setData, loading, error } = useFetch(API_URL);
  const [filter, setFilter] = useState("Tất cả");
  const [message, setMessage] = useState("");
  const { theme } = useContext(ThemeContext);

  // thay cho componentDidUpdate: cập nhật tiêu đề tab
  useEffect(() => {
    const sum = expenses.reduce((s, e) => s + Number(e.amount), 0);
    document.title = `Tổng chi: ${formatMoney(sum)}`;
  }, [expenses]);

  const addExpense = async (item) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const created = await res.json();
      setData((prev) => [...prev, created]);
      setMessage("");
      return true;
    } catch (err) {
      setMessage("Không thêm được: " + err.message);
      return false;
    }
  };

  const removeExpense = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa khoản chi này?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      setData((prev) => prev.filter((e) => e.id !== id));
      setMessage("");
    } catch (err) {
      setMessage("Không xóa được: " + err.message);
    }
  };

  const shown = filter === "Tất cả" ? expenses : expenses.filter((e) => e.category === filter);
  const total = shown.reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div className={"app " + (theme === "dark" ? "dark" : "")}>
      <Header />
      <main className="container">
        <ExpenseForm onAdd={addExpense} />
        {message && <p className="error">{message}</p>}
        <FilterBar filter={filter} onChange={setFilter} />
        <div className="card">
          {loading && <p className="status">Đang tải...</p>}
          {error && <p className="error">Lỗi tải dữ liệu: {error}</p>}
          {!loading && !error && (
            <>
              <ExpenseList items={shown} onRemove={removeExpense} />
              <div className="total">Tổng: {formatMoney(total)}</div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;