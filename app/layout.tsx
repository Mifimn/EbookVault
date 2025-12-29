import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // <--- NOW IMPORTING FROM CORRECT PLACE

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EbookVault | Premium Digital Assets",
  description: "The secure marketplace for high-value ebooks and digital downloads.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>

        <div className="flex flex-col min-h-screen bg-black text-white">

          {/* 1. NAVBAR */}
          <Navbar />

          {/* 2. MAIN CONTENT AREA */}
          <main className="flex-grow pt-20">
            {children}
          </main>

          {/* 3. FOOTER */}
          <Footer />

        </div>

      </body>
    </html>
  );
}