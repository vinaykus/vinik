'use client';
import Link from 'next/link';
import Image from 'next/image';

function Sidebar() {
  return (
    <div className="w-[200px] min-h-screen border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col bg-white dark:bg-gray-900 shadow-lg">
      {/* Logo */}
      <div className="mb-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/tavily-logo.svg"
            alt="Tavily Logo"
            width={120}
            height={30}
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboards"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Overview
            </Link>
          </li>
          <li>
            <Link
              href="/playground"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              API Playground
            </Link>
          </li>
          {/* ... other menu items ... */}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar; 