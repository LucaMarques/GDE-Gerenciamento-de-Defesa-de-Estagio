"use client";

import { useRouter } from "next/navigation";

export default function Card({ icon, text, pagina }) {
  const router = useRouter();

  return (
    <div 
      className="card"
      onClick={() => router.push(pagina)}
      style={{ cursor: "pointer" }}
    >
      <i className={`fa-solid ${icon}`}></i>
      <p>{text}</p>
    </div>
  );
}
