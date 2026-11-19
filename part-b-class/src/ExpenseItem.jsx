import { formatMoney } from "./constants";

function ExpenseItem({ item, onRemove }) {
  return (
    <li className="item">
      <div>
        <strong>{item.title}</strong>
        <br />
        <small>{item.category} · {item.date}</small>
      </div>
      <div className="item-right">
        <span>{formatMoney(item.amount)}</span>
        <button className="danger" onClick={() => onRemove(item.id)}>Xóa</button>
      </div>
    </li>
  );
}

export default ExpenseItem;