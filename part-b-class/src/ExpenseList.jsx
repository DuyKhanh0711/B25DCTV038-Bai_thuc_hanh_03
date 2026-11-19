import ExpenseItem from "./ExpenseItem";

function ExpenseList({ items, onRemove }) {
  if (items.length === 0) return <p className="empty">Chưa có khoản chi nào.</p>;
  return (
    <ul className="list">
      {items.map((e) => (
        <ExpenseItem key={e.id} item={e} onRemove={onRemove} />
      ))}
    </ul>
  );
}

export default ExpenseList;