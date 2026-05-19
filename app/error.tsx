"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f7f7] px-4">
      {/* Error Image */}
      <img
        src="../assets/image/error.png"
        alt="error"
        className="mb-8 w-[280px]"
      />

      {/* Title */}
      <h1 className="text-center text-4xl font-bold text-[#2c5fb8]">
        Oops! Something Went Wrong
      </h1>

      {/* Message */}
      <p className="mt-4 text-center text-gray-500">
        It seems your request is invalid. Please check the URL or try again.
      </p>

      {/* Backend Error Message */}
      <p className="mt-2 text-sm text-red-500">{error.message}</p>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          Go to Homepage
        </Link>

        <button
          onClick={() => reset()}
          className="rounded-lg bg-red-500 px-6 py-3 text-white transition hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
