"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Email and password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError(error.message || "Login failed.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Google login failed.");
        setGoogleLoading(false);
      }
    } catch {
      setError("Google login failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-stone-900">Welcome Back</h1>

        <p className="mt-2 text-center text-stone-500">
          Login to continue exploring BookNook.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Email Address
            </label>

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-900 placeholder-stone-400 outline-none focus:border-emerald-600"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Password
            </label>

            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-stone-300 px-4 py-3 text-stone-900 placeholder-stone-400 outline-none focus:border-emerald-600"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-stone-200" />
          <span className="text-sm text-stone-400">OR</span>
          <div className="h-px flex-1 bg-stone-200" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-stone-300 px-4 py-3 font-semibold text-stone-700 transition hover:bg-stone-50 disabled:opacity-60"
        >
          <span className="text-xl font-bold text-emerald-700">G</span>
          {googleLoading ? "Connecting to Google..." : "Continue with Google"}
        </button>

        <p className="mt-6 text-center text-sm text-stone-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-emerald-700 hover:text-emerald-600">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}