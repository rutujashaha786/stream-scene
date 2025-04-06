import Footer from "@/components/section/Footer";
import Header from "@/components/section/Header";
import StoreProvider from "@/providers/StoreProvider";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stream Scene",
  description: "Stream Scene is an educational project inspired by JioCinema, showcasing a streaming platform with movies, TV shows, and Watchlist features. Built using Next.js for learning purposes only.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <StoreProvider>
        <AuthProvider>
          <Header></Header>
            {children}
          <Footer></Footer>
          <Toaster />
        </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
