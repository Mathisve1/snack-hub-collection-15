
import { Filter } from "lucide-react";

interface NoResultsProps {
  resetFilters: () => void;
}

const NoResults = ({ resetFilters }: NoResultsProps) => {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <Filter size={40} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium mb-2">No frituren found</h3>
      <p className="text-gray-500">Try adjusting your filters or search term</p>
      <button
        onClick={resetFilters}
        className="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default NoResults;
