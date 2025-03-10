
import React from "react";

const LoadingState = ({ loading }: { loading: boolean }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
        {loading && <p className="text-sm text-gray-500 mt-2">Loading all frituren, this might take a moment...</p>}
      </div>
    </div>
  );
};

export default LoadingState;
