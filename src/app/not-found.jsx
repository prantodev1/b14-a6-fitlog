import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-display font-extrabold text-[#ccff00] mb-2">
        404
      </h1>

      <h2 className="text-xl font-bold uppercase text-white mb-2">
        PAGE NOT FOUND
      </h2>

      <p className="text-zinc-500 text-xs mb-6 max-w-xs">
        The workout route or page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="bg-[#ccff00] text-black font-bold text-xs uppercase px-5 py-2.5 rounded-lg hover:bg-lime-400 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
