'use client';
import { toast } from 'react-hot-toast';

export function ApiKeyModal({ 
  isOpen, 
  onClose, 
  mode, 
  selectedKey, 
  newKeyName, 
  setNewKeyName,
  monthlyLimit,
  setMonthlyLimit,
  setApiKeys,
  apiKeys 
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'edit') {
        const response = await fetch(`/api/keys/${selectedKey.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
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
        onClose();
        toast.success('API key updated successfully');
      } else {
        const response = await fetch('/api/keys', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: newKeyName,
            monthlyLimit: parseInt(monthlyLimit)
          }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        setApiKeys([data, ...apiKeys]);
        onClose();
        toast.success('API key created successfully');
      }
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error(error.message || 'Failed to save API key');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {mode === 'create' ? 'Create New API Key' : 'Edit API Key'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {mode === 'create' ? 'Create' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 