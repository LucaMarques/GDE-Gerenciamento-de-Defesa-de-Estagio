"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

import LoginForm from "@/components/login/LoginForm"
import RegistroForm from "@/components/login/RegistroForm"
import Overlay from "@/components/login/Overlay"
import CanvasBackground from "@/components/login/CanvasBackground"

export default function HomePage() {
    const [modo, setModo] = useState("login");

    const { user, loading } = useAuth();
    const router = useRouter();

    // Estando logado vai para dashboard direto
    useEffect(() => {

        if (!loading && user) {
        router.push("/dashboard");
        }

    }, [user, loading, router]);

    if (loading) return null; //evita erro

    return (
        <>
        <CanvasBackground />
        <main className="main">
            <div className={`login-container ${modo === "register" ? "move" : ""}`}>
            
            <div className="form-container">
                <LoginForm abrirCadastro={() => setModo("register")} />
                <RegistroForm abrirLogin={() => setModo("login")} />
            </div>

            <Overlay  modo={modo} abrirCadastro={() => setModo("register")} abrirLogin={() => setModo("login")} />
            </div>
        </main>
        </>
  );
}