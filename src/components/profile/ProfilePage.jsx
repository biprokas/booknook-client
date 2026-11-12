
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserRound, Mail, Camera } from "lucide-react";

export default function ProfilePage({ user }) {
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const { error } = await authClient.updateUser({
        name,
        image: image || null,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile.");
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-stone-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="bg-emerald-800 px-6 py-8 text-white">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="mt-2 text-sm text-emerald-100">
              Manage your BookNook account information.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="mb-8 flex flex-col items-center">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="h-24 w-24 rounded-full border-4 border-emerald-100 object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <UserRound size={42} />
                </div>
              )}

              <p className="mt-3 font-semibold text-stone-800">
                {user.name}
              </p>
              <p className="text-sm text-stone-500">{user.email}</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Full Name
                </label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    className="w-full rounded-lg border border-stone-300 py-3 pl-11 pr-4 outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full cursor-not-allowed rounded-lg border border-stone-200 bg-stone-100 py-3 pl-11 pr-4 text-stone-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Profile Image URL
                </label>
                <div className="relative">
                  <Camera className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                  <input
                    type="url"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-lg border border-stone-300 py-3 pl-11 pr-4 outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !name.trim()}
                className="w-full bg-emerald-700 hover:bg-emerald-800"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
