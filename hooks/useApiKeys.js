'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState('1000');
  const [selectedKey, setSelectedKey] = useState(null);
  const [modalMode, setModalMode] = useState('create');

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

  return {
    apiKeys,
    setApiKeys,
    isModalOpen,
    newKeyName,
    setNewKeyName,
    monthlyLimit,
    setMonthlyLimit,
    selectedKey,
    modalMode,
    handleModalOpen,
    handleModalClose
  };
} 