const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Get all books (public API)
export const getBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/books`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

// Get one book by ID (protected API)
export const getBookById = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
};


export const uploadBookImage = async (file, token) => {
  try {
    const formData = new FormData();

    formData.append("image", file);

    const response = await fetch(`${API_URL}/images`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Image upload failed");
    }

    return result.imageUrl;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};