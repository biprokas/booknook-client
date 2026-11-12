
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { toast } from "sonner";

const getTomorrowDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function BorrowButton({ book }) {
  const [isOpen, setIsOpen] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBorrow = async () => {
    if (!returnDate) {
      toast.error("Please select a return date.");
      return;
    }

    try {
      setIsLoading(true);

      const tokenResponse = await fetch("/api/auth/token", {
        credentials: "include",
      });

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok || !tokenData.token) {
        throw new Error("Unable to authenticate. Please log in again.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/borrows`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },
          body: JSON.stringify({
            bookId: book._id,
            returnDate,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to borrow book.");
      }

      setIsOpen(false);
      setReturnDate("");

      toast.success("Book borrowed successfully!");

      // Reload after the toast becomes visible
      window.setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        disabled={book.availableCopies <= 0}
        onClick={() => setIsOpen(true)}
        className="mt-8 bg-emerald-700 hover:bg-emerald-800"
      >
        {book.availableCopies > 0
          ? "Borrow Book"
          : "Currently Unavailable"}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-stone-900">
              Borrow This Book
            </h2>

            <p className="mt-2 text-sm text-stone-600">
              Choose a date when you plan to return this book.
            </p>

            <label className="mt-6 block text-sm font-medium text-stone-700">
              Return Date
            </label>

            <div className="relative mt-2">
              <CalendarDays className="absolute left-3 top-3 h-5 w-5 text-stone-400" />

              <input
                type="date"
                value={returnDate}
                onChange={(event) => setReturnDate(event.target.value)}
                min={getTomorrowDate()}
                className="w-full rounded-lg border border-stone-300 py-3 pl-11 pr-3 outline-none focus:border-emerald-600"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                disabled={!returnDate || isLoading}
                onClick={handleBorrow}
                className="bg-emerald-700 hover:bg-emerald-800"
              >
                {isLoading ? "Processing..." : "Confirm Borrow"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
