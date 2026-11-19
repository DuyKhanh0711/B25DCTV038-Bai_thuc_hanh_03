import { Component } from "react";
import { CATEGORIES } from "./constants";

class ExpenseForm extends Component {
  state = { title: "", amount: "", category: CATEGORIES[0], date: "", errors: {} };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validate() {
    const e = {};
    if (this.state.title.trim().length < 3) e.title = "Nội dung tối thiểu 3 ký tự";
    if (!(Number(this.state.amount) > 0)) e.amount = "Số tiền phải lớn hơn 0";
    if (!this.state.date) e.date = "Vui lòng chọn ngày";
    return e;
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const errors = this.validate();
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }
    const { title, amount, category, date } = this.state;
    this.props.onAdd({
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    });
    this.setState({ title: "", amount: "", date: "", errors: {} });
  };

  render() {
    const { title, amount, category, date, errors } = this.state;
    return (
      <form className="card form" onSubmit={this.handleSubmit}>
        <div className="field full">
          <label>Nội dung</label>
          <input name="title" value={title} onChange={this.handleChange} placeholder="VD: Cơm trưa" />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>
        <div className="field">
          <label>Số tiền (đ)</label>
          <input name="amount" type="number" value={amount} onChange={this.handleChange} />
          {errors.amount && <div className="error">{errors.amount}</div>}
        </div>
        <div className="field">
          <label>Loại</label>
          <select name="category" value={category} onChange={this.handleChange}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Ngày chi</label>
          <input name="date" type="date" value={date} onChange={this.handleChange} />
          {errors.date && <div className="error">{errors.date}</div>}
        </div>
        <div className="field" style={{ alignSelf: "end" }}>
          <button type="submit">+ Thêm khoản chi</button>
        </div>
      </form>
    );
  }
}

export default ExpenseForm;