import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../css/base.css";
import "../css/login.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { ModalProvider } from "@/contexts/ModalContext";
import Modal from "@/components/Modal";
import { NotificacaoProvider } from "@/contexts/NotificacaoContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GDE",
  description: "Gerenciamento de Defesas de Estágio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <AuthProvider>
          <ModalProvider>
          <NotificacaoProvider>
            <Header />
            <Modal />
            {children}
            <Footer />
          </NotificacaoProvider>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
