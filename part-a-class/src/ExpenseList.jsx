import { Component } from "react";
import ExpenseItem from "./ExpenseItem";

class ExpenseList extends Component {
  render() {
    const { items, onRemove } = this.props;
    if (items.length === 0) return <p className="empty">Chưa có khoản chi nào.</p>;
    return (
      <ul className="list">
        {items.map((e) => (
          <ExpenseItem key={e.id} item={e} onRemove={onRemove} />
        ))}
      </ul>
    );
  }
}

export default ExpenseList;