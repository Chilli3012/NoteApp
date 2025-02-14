import React, { useState } from "react";

function SecondaryNavbar({ tags, onFilterTags, clearTagFilter }) {
  const [activeTags, setActiveTags] = useState([]); // Track selected tags

  const handleTagClick = (tag) => {
    const updatedTags = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag) // Remove if already selected
      : [...activeTags, tag]; // Add if not selected
    setActiveTags(updatedTags);
    onFilterTags(updatedTags); // Pass selected tags to parent
  };

  const handleClearFilter = () => {
    setActiveTags([]); // Clear local active tags
    clearTagFilter(); // Call parent clear function
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-2 px-6 shadow-md mb-4">
      <div className="flex space-x-4 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-1 rounded-lg 
              ${
                activeTags.includes(tag)
                  ? "bg-blue-500 text-white dark:bg-blue-700" // Active tag styling
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
          >
            {tag}
          </button>
        ))}

        {tags.length>0 ? (
          <button
            onClick={handleClearFilter}
            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
          >
            Clear Filter
          </button>
        ):<></>}
      </div>
    </div>
  );
}


export default SecondaryNavbar;
