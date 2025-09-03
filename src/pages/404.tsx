import Link from "next/link";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md"
      >
        <h1 className="text-7xl font-extrabold text-gray-900">404</h1>
        <p className="mt-4 text-xl text-gray-600">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="rounded-2xl bg-purple-600 px-6 py-3 text-white shadow-md transition hover:bg-purple-700"
          >
            Go back home
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default NotFound;
