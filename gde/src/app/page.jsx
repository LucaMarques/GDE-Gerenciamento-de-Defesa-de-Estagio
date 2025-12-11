"use client";

import { useState } from "react";
import LoginForm from "@/components/login/LoginForm"
import RegistroForm from "@/components/login/RegistroForm"
import Overlay from "@/components/login/Overlay"
import CanvasBackground from "@/components/login/CanvasBackground"

export default function HomePage() {
    const [modo, setModo] = useState("login");
    return (
        <>
        <CanvasBackground />
        <main>
            <div className={`login-container ${modo === "register" ? "move" : ""}`}>
            
            <div className="form-container">
                <LoginForm abrirCadastro={() => setModo("register")} />
                <RegistroForm abrirLogin={() => setModo("login")} />
            </div>

            <Overlay 
                modo={modo}
                abrirCadastro={() => setModo("register")}
                abrirLogin={() => setModo("login")}
            />

            </div>
        </main>
        </>
  );
}