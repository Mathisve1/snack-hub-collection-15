
import { Loader2 } from "lucide-react";

const DataLoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-4" />
      <p className="text-gray-600 font-medium">Loading research data...</p>
      <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
    </div>
  );
};

export default DataLoadingState;
