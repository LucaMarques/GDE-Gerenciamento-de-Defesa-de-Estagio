"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarUsuario = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            setUser(user);

            const { data: perfilData, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("user_id", user.id)
            .single();

            if (!error) {
            setPerfil(perfilData);
            }
        }

        setLoading(false);
    };

        carregarUsuario();
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setPerfil(null);
    };

    return (
        <AuthContext.Provider value={{user, perfil, loading, logout}}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
