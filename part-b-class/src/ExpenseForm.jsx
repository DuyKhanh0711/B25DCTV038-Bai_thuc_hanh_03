import { useState, useRef } from "react";
import { CATEGORIES } from "./constants";

function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({ title: "", amount: "", category: CATEGORIES[0], date: "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const titleRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (form.title.trim().length < 3) e.title = "Nội dung tối thiểu 3 ký tự";
    if (!(Number(form.amount) > 0)) e.amount = "Số tiền phải lớn hơn 0";
    if (!form.date) e.date = "Vui lòng chọn ngày";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSaving(true);
    const ok = await onAdd({
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
    });
    setSaving(false);

    if (ok) {
      setForm({ title: "", amount: "", category: CATEGORIES[0], date: "" });
      titleRef.current.focus(); // focus lại ô nhập
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="field full">
        <label>Nội dung</label>
        <input ref={titleRef} name="title" value={form.title} onChange={handleChange} placeholder="VD: Cơm trưa" />
        {errors.title && <div className="error">{errors.title}</div>}
      </div>
      <div className="field">
        <label>Số tiền (đ)</label>
        <input name="amount" type="number" value={form.amount} onChange={handleChange} />
        {errors.amount && <div className="error">{errors.amount}</div>}
      </div>
      <div className="field">
        <label>Loại</label>
        <select name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="field">
        <label>Ngày chi</label>
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        {errors.date && <div className="error">{errors.date}</div>}
      </div>
      <div className="field" style={{ alignSelf: "end" }}>
        <button type="submit" disabled={saving}>{saving ? "Đang lưu..." : "+ Thêm khoản chi"}</button>
      </div>
    </form>
  );
}

export default ExpenseForm;