import Link from 'next/link';
import { HomeIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 sm:px-6 sm:py-24 md:grid place-items-center bg-white dark:bg-gray-900">
      <div className="max-w-max mx-auto text-center">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
          404 error
        </p>
        <h1 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
          Oops! This page is toast
        </h1>
        <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
          Looks like this page got a bit overcooked. Let's get you back to the kitchen!
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors duration-150 ease-in-out"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
