
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

export const metadata = {
  title: "BookNook | Your Little Library",
  description:
    "Discover books, share your collection, and borrow your next favorite read.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        <Navbar />

        <main className="min-h-[60vh]">
          {children}
        </main>

        <Footer />

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
