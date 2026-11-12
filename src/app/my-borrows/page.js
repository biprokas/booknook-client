import { headers } from "next/headers";
import { requireAuth } from "@/lib/auth-guard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ReturnBookButton from "@/components/books/ReturnBookButton";

export const metadata = {
  title: "My Borrows | BookNook",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getMyBorrows(token) {
  try {
    const response = await fetch(`${API_URL}/borrows`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch borrowed books");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    return [];
  }
}

export default async function MyBorrowsPage() {
  await requireAuth();

  const requestHeaders = await headers();

  const tokenResult = await auth.api.getToken({
    headers: requestHeaders,
  });

  const token = tokenResult?.token;

  if (!token) {
    redirect("/login");
  }

  const borrows = await getMyBorrows(token);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-12">
      <div className="mb-10">
        <p className="font-semibold text-emerald-700">MY LIBRARY</p>

        <h1 className="mt-2 text-3xl font-bold text-stone-900">
          My Borrowed Books
        </h1>

        <p className="mt-2 text-stone-600">
          Keep track of the books you have borrowed.
        </p>
      </div>

      {borrows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 py-20 text-center">
          <h2 className="text-xl font-semibold text-stone-800">
            No borrowed books yet
          </h2>

          <p className="mt-2 text-stone-500">
            Explore our collection and borrow your first book.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-stone-100 text-sm text-stone-600">
              <tr>
                <th className="px-6 py-4">Book</th>
                <th className="px-6 py-4">Borrow Date</th>
                <th className="px-6 py-4">Return Date</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100">
              {borrows.map((borrow) => (
                <tr key={borrow._id}>
                  <td className="px-6 py-4 font-semibold text-stone-800">
                    {borrow.bookTitle}
                  </td>

                  <td className="px-6 py-4 text-sm text-stone-600">
                    {new Date(borrow.borrowDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-sm text-stone-600">
                    {new Date(borrow.returnDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <ReturnBookButton borrowId={borrow._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
