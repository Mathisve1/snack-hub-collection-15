
import React from "react";
import { Loader2 } from "lucide-react";

const LoadingState = ({ loading, message }: { loading: boolean, message?: string }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4">
          <Loader2 className="h-12 w-12 text-primary" />
        </div>
        <p className="text-gray-600 font-medium">Loading...</p>
        {loading && (
          <p className="text-sm text-gray-500 mt-2">
            {message || "Loading all frituren, this might take a moment..."}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-4">
          This may take longer for the initial load as we're retrieving over 4000 items in multiple batches.
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
