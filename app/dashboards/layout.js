'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed left-0 top-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-r-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 16 16" 
          fill="currentColor"
          className={`transform transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`}
        >
          <path d={isSidebarOpen 
            ? "M6 2l-4 4 4 4V2zm4 0v8l4-4-4-4z"  // Collapse icon
            : "M10 2l4 4-4 4V2zM2 2v8l4-4-4-4z"   // Expand icon
          }/>
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed md:relative z-40
      `}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className={`
        flex-1 transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'md:ml-0' : ''}
      `}>
        {children}
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
} 