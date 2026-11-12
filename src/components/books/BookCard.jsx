import Link from "next/link";
import { BookOpen, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function BookCard({ book }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Book Image */}
      <div className="relative h-64 overflow-hidden bg-stone-100">
        {book.image ? (
          <Image
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            src={book.image}
            alt={book.title}
            width={450}
            height={450}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen size={48} className="text-stone-300" />
          </div>
        )}
      </div>

      {/* Book Information */}
      <div className="p-5">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {book.category}
        </span>

        <h3 className="mt-4 line-clamp-1 text-lg font-bold text-stone-900">
          {book.title}
        </h3>

        <p className="mt-2 flex items-center gap-2 text-sm text-stone-500">
          <UserRound size={16} />
          {book.author}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
          <span className="text-sm text-stone-500">
            Available: {book.availableCopies ?? "—"}
          </span>

          <Button asChild size="sm">
            <Link href={`/books/${book._id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
