'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        {/* 404 Illustration */}
        <div className="mb-8 relative">
          <div className="text-[150px] font-bold text-gray-200 dark:text-gray-800">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/404-illustration.svg"
              alt="404 Illustration"
              width={200}
              height={200}
              className="dark:invert"
              priority
            />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Oops! It seems like you've ventured into uncharted territory. 
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Go Back
          </button>
        </div>

        {/* Support Link */}
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Need help? {' '}
          <Link 
            href="/contact" 
            className="text-blue-600 hover:underline"
          >
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
} 