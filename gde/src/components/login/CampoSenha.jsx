"use client"

import { useState } from "react"

export default function CampoSenha({ id, placeholder, value, onChange }) {
  const [mostrar, setMostrar] = useState(false);

  const toggleSenha = () => {
    setMostrar(!mostrar);
  };

  return (
    <div className="password-container">
      <input
        id={id}
        type={mostrar ? "text" : "password"}
        className="form-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <i
        className={`bi ${mostrar ? "bi-eye" : "bi-eye-slash"}`}
        onClick={toggleSenha}
        style={{ cursor: "pointer" }}
      ></i>
    </div>
  );
}