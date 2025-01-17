export const copyToClipboard = async (text, toast) => {
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

export const deleteApiKey = async (id, setApiKeys, apiKeys, toast) => {
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
    toast.error(error.message || 'Failed to delete API key');
  }
}; 