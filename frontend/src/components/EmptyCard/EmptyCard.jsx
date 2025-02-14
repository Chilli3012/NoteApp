import React from 'react'

function EmptyCard() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-5">
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-16 h-16 text-gray-400 mb-4"
          >
            <path
              fillRule="evenodd"
              d="M3 6a1 1 0 011-1h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6zm2 1v10h14V7H5zm4 3a1 1 0 100 2h6a1 1 0 100-2H9z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Notes Yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Start by adding your first note to stay organized!
          </p>
        </div>
      </div>
    );
  }

export default EmptyCard