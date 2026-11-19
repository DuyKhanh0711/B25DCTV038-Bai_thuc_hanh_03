import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer); // cleanup ngay cạnh phần khởi tạo
  }, []);

  return <span className="clock">{time.toLocaleTimeString("vi-VN")}</span>;
}

export default Clock;