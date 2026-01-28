"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [defesas, setDefesas] = useState([]);

    const carregarDefesas = async (perfilData) => {
        if (!perfilData) {
            setDefesas([]);
            return;
        }

        let query = supabase
            .from("defesas")
            .select("*, aluno:profiles!defesas_aluno_id_fkey ( id, nome_completo ), orientador:profiles!defesas_orientador_id_fkey (id, nome_completo)");

        if (perfilData.tipo_usuario === "aluno") {
            query = query.eq("aluno_id", perfilData.id);
        }

        if (perfilData.tipo_usuario === "orientador") {
            query = query.eq("orientador_id", perfilData.id);
        }

        const response = await query;
        console.log(response)
        if (response.error) {
            //console.error("Erro ao buscar defesas:", response.error);
            console.log("ERRO SUPABASE:", response.error);
            setDefesas([]);
            return;
        }

        setDefesas(response.data || []);
    };

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
                    await carregarDefesas(perfilData);
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
                    await carregarDefesas(perfilData);
                } else {
                    setPerfil(null);
                    setDefesas([]);
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
            setDefesas([]);
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
            setUser(null);
            setPerfil(null);
            setDefesas([]);
        }
    };

    return (
        <AuthContext.Provider value={{ user, perfil, defesas, setDefesas, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
