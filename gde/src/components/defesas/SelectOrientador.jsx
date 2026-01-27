"use client";

export default function SelectOrientador({ orientadores, value, onChange }) {
  return (
    <select
      className="campo-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    >
      <option value="">Selecione um orientador</option>

      {orientadores.map((p, index) => (
        <option key={index} value={p.nome}>
          {p.nome}
        </option>
      ))}
    </select>
  );
}
