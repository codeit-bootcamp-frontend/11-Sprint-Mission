import { useState } from "react";
import "./Btn.css";

function Btn({ text, status, type, size, onClick }) {
  return <button className={`Btn ${status} ${size}`} type={type} onClick={onClick}>{text}</button>;
}

export default Btn;
