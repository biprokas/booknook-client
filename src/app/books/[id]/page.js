import { headers } from "next/headers";
import { requireAuth } from "@/lib/auth-guard";
import { auth } from "@/lib/auth";
import { getBookById } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import BorrowButton from "@/components/books/BorrowButton";

export default async function BookDetailsPage({ params }) {
  await requireAuth();

  const { id } = await params;

  const requestHeaders = await headers();

  const tokenResult = await auth.api.getToken({
    headers: requestHeaders,
  });

  const token = tokenResult?.token;

  if (!token) {
    throw new Error("Unable to generate authentication token.");
  }

  const book = await getBookById(id, token);

  if (!book) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <Image
            src={book.image}
            alt={book.title}
            width={450}
            height={450}
            className="h-auto w-full rounded-2xl object-cover"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">
            {book.category}
          </p>

          <h1 className="text-3xl font-bold text-stone-900">{book.title}</h1>

          <p className="mt-3 text-lg text-stone-600">By {book.author}</p>

          <p className="mt-6 leading-7 text-stone-600">{book.description}</p>

          <div className="mt-8 space-y-2 text-sm text-stone-700">
            <p>
              <strong>Total Copies:</strong> {book.totalCopies}
            </p>

            <p>
              <strong>Available Copies:</strong> {book.availableCopies}
            </p>

            <p>
              <strong>Added By:</strong> {book.addedByName}
            </p>
          </div>

          <BorrowButton book={book} />
        </div>
      </div>
    </main>
  );
}
