
import { getBooks } from "@/lib/api";
import BookCard from "@/components/books/BookCard";
import { Library } from "lucide-react";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "BookNook | All Books",
  description: "Explore all books available in the BookNook library.",
};

export default async function AllBooksPage() {
  const books = await getBooks();

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-5 py-16 lg:px-8">
      {/* Page Heading */}
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-2 text-emerald-700">
          <Library size={20} />
          <span className="text-sm font-semibold uppercase tracking-widest">
            Explore our collection
          </span>
        </div>

        <h1 className="text-4xl font-bold text-stone-900">
          All Books
        </h1>

        <p className="mt-3 text-stone-500">
          Discover your next favorite read from our growing collection.
        </p>

        <p className="mt-4 text-sm font-medium text-stone-600">
          {books.length} {books.length === 1 ? "book" : "books"} available
        </p>
      </div>

      {/* Books Grid */}
      {books.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-5 py-20 text-center">
          <Library
            size={48}
            className="mx-auto text-stone-300"
          />

          <h2 className="mt-5 text-xl font-bold text-stone-800">
            No books available yet
          </h2>

          <p className="mt-2 text-stone-500">
            Books will appear here when they are added to the library.
          </p>
        </div>
      )}
    </section>
  );
}
