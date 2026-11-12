import { headers } from "next/headers";
import { requireAuth } from "@/lib/auth-guard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import EditBookButton from "@/components/books/EditBookButton";
import DeleteBookButton from "@/components/books/DeleteBookButton";

export const metadata = {
  title: "My Books | BookNook",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getMyBooks(token) {
  try {
    const response = await fetch(`${API_URL}/books/my-books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch your books");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching your books:", error);
    return [];
  }
}

export default async function MyBooksPage() {
  await requireAuth();

  const requestHeaders = await headers();

  const tokenResult = await auth.api.getToken({
    headers: requestHeaders,
  });

  const token = tokenResult?.token;

  if (!token) {
    redirect("/login");
  }

  const books = await getMyBooks(token);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-12">
      <div className="mb-10">
        <p className="font-semibold text-emerald-700">MY COLLECTION</p>

        <h1 className="mt-2 text-3xl font-bold text-stone-900">My Books</h1>

        <p className="mt-2 text-stone-600">
          Manage the books you have added to BookNook.
        </p>
      </div>

      {books.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 py-20 text-center">
          <h2 className="text-xl font-semibold text-stone-800">
            You haven't added any books yet.
          </h2>

          <p className="mt-2 text-stone-500">
            Add your first book to build your collection.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div
              key={book._id}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
            >
              <div className="flex gap-4 p-5">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={110}
                  height={150}
                  className="h-[150px] w-[110px] rounded-lg object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase text-emerald-700">
                    {book.category}
                  </p>

                  <h2 className="mt-2 line-clamp-2 font-bold text-stone-900">
                    {book.title}
                  </h2>

                  <p className="mt-1 text-sm text-stone-500">
                    By {book.author}
                  </p>

                  <div className="mt-4 space-y-1 text-sm text-stone-600">
                    <p>Total: {book.totalCopies}</p>
                    <p>Available: {book.availableCopies}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-stone-100 px-5 py-3">
                <p className="text-xs text-stone-500">Added by you</p>

                <EditBookButton book={book} />
                <DeleteBookButton bookId={book._id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
