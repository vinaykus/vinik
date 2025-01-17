'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Valid API Key (${data.name}), /protected can be accessed.`, {
          style: {
            background: '#22c55e',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '9999px',
          },
          duration: 3000,
        });
        router.push('/protected');
      } else {
        // Handle different error cases
        const errorMessage = data.error || 'Invalid API key';
        toast.error(errorMessage, {
          style: {
            background: '#ef4444',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '9999px',
          },
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error('Failed to validate API key', {
        style: {
          background: '#ef4444',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '9999px',
        },
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">API Playground</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Test your API key to access protected endpoints
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              API Key
              <span className="text-gray-500 ml-1">— Enter your API key to test access</span>
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="tvly-xxxxxxxxxxxxxxxx"
              className="w-full px-4 py-2 border rounded-lg bg-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Validating...' : 'Validate Key'}
          </button>
        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
} 