"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { uploadBookImage } from "@/lib/api";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

export default function AddBookForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (!session?.user) {
      toast.error("Please log in first.");
      return;
    }

    if (!image) {
      toast.error("Please select a book cover image.");
      return;
    }

    try {
      setLoading(true);

      // Get the logged-in user's JWT
      setStatus("Preparing upload...");

      const tokenResponse = await fetch("/api/auth/token");
      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok || !tokenData.token) {
        throw new Error("Unable to get authentication token.");
      }

      const token = tokenData.token;

      // Upload book cover to ImgBB
      setStatus("Uploading book cover...");

      const imageUrl = await uploadBookImage(image, token);

      // Prepare book information
      setStatus("Saving book information...");

      const bookData = {
        title: formData.get("title"),
        author: formData.get("author"),
        category: formData.get("category"),
        description: formData.get("description"),
        totalCopies: Number(formData.get("totalCopies")),
        image: imageUrl,
        addedByName: session.user.name,
      };

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add book.");
      }

      toast.success("Book added successfully!");

      router.push("/books");
      router.refresh();
    } catch (error) {
      console.error("Add book error:", error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
      setStatus("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block font-medium">Book Title</label>
        <input
          name="title"
          type="text"
          required
          placeholder="Enter book title"
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-600"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Author</label>
        <input
          name="author"
          type="text"
          required
          placeholder="Enter author's name"
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-600"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Category</label>
        <select
          name="category"
          required
          defaultValue=""
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 outline-none focus:border-emerald-600"
        >
          <option value="" disabled>
            Select a category
          </option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">Book Cover</label>
        <input
          type="file"
          accept="image/*"
          required
          onChange={handleImageChange}
          className="w-full rounded-lg border border-stone-300 px-4 py-3"
        />

        {preview && (
          <img
            src={preview}
            alt="Book cover preview"
            className="mt-4 h-48 w-36 rounded-lg object-cover"
          />
        )}

        <p className="mt-2 text-sm text-stone-500">Maximum image size: 5 MB.</p>
      </div>

      <div>
        <label className="mb-2 block font-medium">Description</label>
        <textarea
          name="description"
          required
          rows={5}
          placeholder="Write a short description about the book"
          className="w-full resize-y rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-600"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Total Copies</label>
        <input
          name="totalCopies"
          type="number"
          min="1"
          step="1"
          required
          placeholder="Enter total copies"
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-600"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Added By</label>
        <input
          type="text"
          value={session?.user?.name || "Loading..."}
          readOnly
          className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Email Address</label>
        <input
          type="email"
          value={session?.user?.email || "Loading..."}
          readOnly
          className="w-full rounded-lg border border-stone-300 bg-stone-100 px-4 py-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !session?.user}
        className="w-full rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? status || "Please wait..." : "Add Book"}
      </button>
    </form>
  );
}
