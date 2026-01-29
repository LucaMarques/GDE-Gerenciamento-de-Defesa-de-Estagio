"use client";

import { useState, useEffect } from "react";
import PainelUsuario from "@/components/dashboard/PainelUsuario";
import "@/css/dashboard.css";

export default function PainelPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <PainelUsuario />;
}