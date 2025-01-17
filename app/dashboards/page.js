'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';

export default function ApiKeysDashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [monthlyLimit, setMonthlyLimit] = useState('1000');
  const [selectedKey, setSelectedKey] = useState(null);
  const [modalMode, setModalMode] = useState('create');
  const [alertThreshold, setAlertThreshold] = useState(90);
  const [isAlertEnabled, setIsAlertEnabled] = useState(true);

  // Fetch API keys
  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/keys');
      const data = await response.json();
      if (response.ok) {
        setApiKeys(data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error fetching API keys:', error);
      toast.error('Failed to fetch API keys');
    }
  };

  const handleModalOpen = (mode, key = null) => {
    setModalMode(mode);
    setSelectedKey(key);
    if (mode === 'edit' && key) {
      setNewKeyName(key.name);
      setMonthlyLimit(key.monthlyLimit || '1000');
    } else if (mode === 'create') {
      setNewKeyName('');
      setMonthlyLimit('1000');
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalMode('create');
    setSelectedKey(null);
    setNewKeyName('');
    setMonthlyLimit('1000');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'edit') {
        const response = await fetch(`/api/keys/${selectedKey.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            name: newKeyName,
            monthlyLimit: parseInt(monthlyLimit)
          }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        
        setApiKeys(apiKeys.map(key => 
          key.id === selectedKey.id ? data : key
        ));
        handleModalClose();
        toast.success('API key updated successfully', {
          style: {
            background: '#22c55e',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '9999px',
          },
          icon: '✓',
          duration: 2000,
        });
      } else {
        const response = await fetch('/api/keys', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            name: newKeyName,
            monthlyLimit: parseInt(monthlyLimit)
          }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        setApiKeys([data, ...apiKeys]);
        handleModalClose();
        toast.success('New API key created successfully', {
          style: {
            background: '#22c55e',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '9999px',
          },
          icon: '✓',
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error(error.message || 'Failed to save API key', {
        style: {
          background: '#ef4444',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '9999px',
        },
        icon: '✕',
        duration: 3000,
      });
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied API Key to clipboard', {
        style: {
          background: '#22c55e',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '9999px',
        },
        icon: '✓',
        duration: 2000,
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.error('Failed to copy API Key');
    }
  };

  const deleteApiKey = async (id) => {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      setApiKeys(apiKeys.filter(key => key.id !== id));
      toast.success('API key deleted successfully', {
        style: {
          background: '#ef4444',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '9999px',
        },
        icon: '✓',
        duration: 2000,
      });
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast.error(error.message || 'Failed to delete API key', {
        style: {
          background: '#ef4444',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '9999px',
        },
        icon: '✕',
        duration: 3000,
      });
    }
  };

  return (
    <>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">Pages / Overview</div>
            <h1 className="text-2xl font-bold">Overview</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Operational</span>
            </div>
            <div className="flex gap-2">
              <Link href="https://github.com" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </Link>
              <Link href="https://twitter.com" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sm text-white/80 mb-1">CURRENT PLAN</div>
              <h2 className="text-2xl font-bold text-white mb-4">Researcher</h2>
            </div>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors text-white">
              Manage Plan
            </button>
          </div>
          
          <div>
            <div className="flex justify-between items-center text-white text-sm mb-2">
              <span>API Limit</span>
              <span className="opacity-80">0/1,000 Requests</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-semibold">API Keys</h2>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path d="M12 16v-4m0-4h.01" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-500">
                The key is used to authenticate your requests to the Research API. 
                To learn more, see the <Link href="/documentation" className="text-blue-600 hover:underline">documentation</Link> page.
              </p>
            </div>
            <button
              onClick={() => handleModalOpen('create')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
              </svg>
              Create New Key
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Key</th>
                  <th className="text-left py-3 px-4">Usage</th>
                  <th className="text-left py-3 px-4">Monthly Limit</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr key={key.id} className="border-b dark:border-gray-700">
                    <td className="py-3 px-4">{key.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                          {key.key.slice(0, 12)}...
                        </code>
                        <button
                          onClick={() => copyToClipboard(key.key)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(key.usage / key.monthlyLimit) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {key.usage}/{key.monthlyLimit}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{key.monthlyLimit}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleModalOpen('edit', key)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteApiKey(key.id)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-red-500"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Email usage alerts</h2>
          <p className="text-sm text-gray-500 mb-6">
            An alert will be sent to your email when your monthly usage reaches the set threshold.
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Your alert threshold is currently set to</span>
              <input
                type="number"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
                className="w-16 px-2 py-1 border rounded-lg text-center"
              />
              <span className="text-sm">%</span>
            </div>
            <button 
              className={`px-3 py-1 rounded-full text-sm ${
                isAlertEnabled 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => setIsAlertEnabled(!isAlertEnabled)}
            >
              {isAlertEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-500">
            Have any questions, feedback or need support? We'd love to hear from you!
          </p>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Contact us
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {modalMode === 'create' ? 'Create New API Key' : 'Edit API Key'}
              </h3>
              <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Key Name
                    <span className="text-gray-500 ml-1">— A unique name to identify this key</span>
                  </label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="Key Name"
                    className="w-full px-4 py-2 border rounded-lg bg-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 mr-2"
                      defaultChecked
                    />
                    <span className="text-sm font-medium">Limit monthly usage</span>
                  </label>
                  <input
                    type="text"
                    value={monthlyLimit}
                    onChange={(e) => setMonthlyLimit(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg bg-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    *If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {modalMode === 'create' ? 'Create' : 'Save changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <Toaster position="top-center" />
    </>
  );
} 