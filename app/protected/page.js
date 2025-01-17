'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function Protected() {
  const router = useRouter();

  useEffect(() => {
    // You could add additional validation here if needed
    toast.success('Successfully accessed protected route!', {
      style: {
        background: '#22c55e',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '9999px',
      },
      duration: 3000,
    });
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-4">Protected Route</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This is a protected route that can only be accessed with a valid API key.
        </p>
        <button
          onClick={() => router.push('/playground')}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Back to Playground
        </button>
      </div>
    </div>
  );
} 