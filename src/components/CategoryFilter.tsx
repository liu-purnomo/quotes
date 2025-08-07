'use client';

/**
 * Props interface for the CategoryFilter component
 * @property {string[]} categories - Array of available category names
 * @property {string | null} selectedCategory - Currently selected category or null if none selected
 * @property {Function} onSelectCategory - Callback function when a category is selected
 */
interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

/**
 * CategoryFilter Component
 * Displays a list of category filter buttons that allow users to filter quotes by category
 * 
 * @param {CategoryFilterProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    // Container for filter buttons with responsive flex layout
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {/* "All" button to clear category filter */}
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${!selectedCategory
          ? 'bg-primary text-white' // Active state styling
          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600' // Inactive state styling
          }`}
        aria-pressed={!selectedCategory}
      >
        Semua
      </button>
      {/* Map through all categories and create a button for each */}
      {categories.map((category) => (
        <button
          key={category} // Unique key for React list rendering
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${selectedCategory === category
            ? 'bg-primary text-white' // Active state styling
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600' // Inactive state styling
            }`}
          aria-pressed={selectedCategory === category}
        >
          {/* Capitalize first letter of category name */}
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}