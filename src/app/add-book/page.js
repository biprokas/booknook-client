import { requireAuth } from "@/lib/auth-guard";
import AddBookForm from "@/components/books/AddBookForm";

export const metadata = {
  title: "Add Book | BookNook",
};

export default async function AddBookPage() {
  await requireAuth();

  return (
    <main className="min-h-screen bg-stone-50 px-5 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Share your collection
          </p>

          <h1 className="mt-2 text-3xl font-bold text-stone-900 md:text-4xl">
            Add a New Book
          </h1>

          <p className="mt-3 text-stone-600">
            Add a book to BookNook and let other readers discover it.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm md:p-8">
          <AddBookForm />
        </div>
      </div>
    </main>
  );
}