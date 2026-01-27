import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../css/base.css";
import "../css/login.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { ModalProvider } from "@/contexts/ModalContext";
import Modal from "@/components/Modal";

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
      <body>
        <AuthProvider>
          <ModalProvider>
            <Header />
            <Modal />
            {children}
            <Footer />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
