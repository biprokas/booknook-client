
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getBooks } from "@/lib/api";
import BookCard from "@/components/books/BookCard";

export default async function NewArrivals() {
  const books = await getBooks();

  // Display only the six newest books.
  const latestBooks = [...books]
    .sort(
      (a, b) =>
        new Date(b.addedAt).getTime() -
        new Date(a.addedAt).getTime()
    )
    .slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      {/* Section Heading */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Fresh from the shelves
          </p>

          <h2 className="text-3xl font-bold text-stone-900 md:text-4xl">
            New Arrivals
          </h2>

          <p className="mt-3 text-stone-500">
            Discover the latest additions to our collection.
          </p>
        </div>

        <Link
          href="/books"
          className="flex items-center gap-2 font-semibold text-emerald-700 transition hover:text-emerald-900"
        >
          See All Books
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Book Grid */}
      {latestBooks.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white py-16 text-center">
          <p className="text-lg font-semibold text-stone-700">
            No books have been added yet.
          </p>

          <p className="mt-2 text-sm text-stone-500">
            New books will appear here when they are added.
          </p>
        </div>
      )}
    </section>
  );
}
