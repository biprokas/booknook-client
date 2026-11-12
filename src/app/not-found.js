
import Link from "next/link";
import { BookOpen, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-stone-50 px-5 py-16">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <BookOpen size={40} />
        </div>

        <h1 className="mt-6 text-7xl font-bold text-emerald-700">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-stone-900">
          Book Not Found!
        </h2>

        <p className="mt-3 text-stone-600">
          Sorry, the page you're looking for doesn't exist.
          Let's get you back to the library.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
