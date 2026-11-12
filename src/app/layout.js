import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "BookNook | Your Little Library",
  description:
    "Discover books, share your collection, and borrow your next favorite read.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} min-h-screen bg-stone-50 text-stone-900 antialiased`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <Navbar />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
