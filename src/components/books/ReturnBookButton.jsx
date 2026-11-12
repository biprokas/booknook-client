
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ReturnBookButton({ borrowId }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleReturn = async () => {
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
        `${process.env.NEXT_PUBLIC_API_URL}/borrows/${borrowId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to return book.");
      }

      toast.success("Book returned successfully!");

      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleReturn}
      disabled={isLoading}
      variant="outline"
      className="border-emerald-700 text-emerald-700 hover:bg-emerald-50"
    >
      {isLoading ? "Returning..." : "Return Book"}
    </Button>
  );
}
