"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarSessao = async () => {
        const { data } = await supabase.auth.getSession();
        const sessionUser = data.session?.user ?? null;

        setUser(sessionUser);

        if (sessionUser) {
            const { data: perfilData, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", sessionUser.id)
            .single();

            if (!error) {
                setPerfil(perfilData);
            }
        }

        setLoading(false);
    };

        carregarSessao();

        const { data: listener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
            const sessionUser = session?.user ?? null;
            setUser(sessionUser);

            if (sessionUser) {
                const { data: perfilData } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", sessionUser.id)
                    .single();

                    setPerfil(perfilData);
            } else {
                 setPerfil(null);
                }
            }
        );
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const logout = async () => {
        try {
            await supabase.auth.signOut();
            setUser(null);
            setPerfil(null);
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
            setUser(null);
            setPerfil(null);
        }
    };

    return (
        <AuthContext.Provider value={{user, perfil, loading, logout}}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
