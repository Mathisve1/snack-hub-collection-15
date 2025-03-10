
import { Filter, X } from "lucide-react";

interface FriturenFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRating: number | null;
  setSelectedRating: (rating: number | null) => void;
  selectedProvince: string | null;
  setSelectedProvince: (province: string | null) => void;
  provinces: string[];
  resetFilters: () => void;
  filterOpen: boolean;
  toggleFilter: () => void;
}

const FriturenFilters = ({
  searchTerm,
  setSearchTerm,
  selectedRating,
  setSelectedRating,
  selectedProvince,
  setSelectedProvince,
  provinces,
  resetFilters,
  filterOpen,
  toggleFilter,
}: FriturenFiltersProps) => {
  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleFilter}
          className="w-full flex items-center justify-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-gray-200"
        >
          <Filter size={18} />
          <span>Filters {filterOpen ? '(Hide)' : '(Show)'}</span>
        </button>
      </div>
      
      {/* Filters */}
      <div className={`bg-white p-4 rounded-lg shadow-sm mb-6 ${filterOpen ? 'block' : 'hidden md:block'}`}>
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 items-end">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name, location..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-40">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Rating
            </label>
            <select
              id="rating"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedRating !== null ? selectedRating : ""}
              onChange={(e) => setSelectedRating(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Any Rating</option>
              <option value="1">1+ ★</option>
              <option value="2">2+ ★★</option>
              <option value="3">3+ ★★★</option>
              <option value="4">4+ ★★★★</option>
              <option value="5">5 ★★★★★</option>
            </select>
          </div>
          
          <div className="w-full md:w-48">
            <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
              Province
            </label>
            <select
              id="province"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedProvince || ""}
              onChange={(e) => setSelectedProvince(e.target.value || null)}
            >
              <option value="">All Provinces</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center"
          >
            <X size={16} className="mr-1" />
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default FriturenFilters;
