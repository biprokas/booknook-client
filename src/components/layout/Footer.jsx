
import Link from "next/link";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-stone-950 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

        {/* Brand */}
        <div>
          <Link href="/" className="mb-4 flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <BookOpen size={22} />
            </span>

            <span className="text-2xl font-bold text-white">
              Book<span className="text-emerald-500">Nook</span>
            </span>
          </Link>

          <p className="max-w-xs text-sm leading-7 text-stone-400">
            A little corner for every book lover. Discover books,
            share your collection, and enjoy reading together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 font-semibold text-white">Quick Links</h3>

          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-emerald-400">Home</Link></li>
            <li><Link href="/books" className="hover:text-emerald-400">All Books</Link></li>
            <li><Link href="/login" className="hover:text-emerald-400">Login</Link></li>
            <li><Link href="/register" className="hover:text-emerald-400">Register</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-5 font-semibold text-white">Explore</h3>

          <ul className="space-y-3 text-sm">
            <li>Discover New Books</li>
            <li>Share Your Collection</li>
            <li>Borrow Your Favorites</li>
            <li>Return and Read Again</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 font-semibold text-white">Contact Us</h3>

          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail size={17} className="text-emerald-500" />
              hello@booknook.com
            </li>

            <li className="flex items-center gap-3">
              <Phone size={17} className="text-emerald-500" />
              +880 1700-000000
            </li>

            <li className="flex items-center gap-3">
              <MapPin size={17} className="text-emerald-500" />
              Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-stone-800">
        <div className="mx-auto max-w-7xl px-5 py-6 text-center text-sm text-stone-500">
          © {new Date().getFullYear()} BookNook. All rights reserved.
          Made for book lovers.
        </div>
      </div>
    </footer>
  );
}
