
export const RecordingsLoadingState = () => {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      <span className="ml-3 text-gray-600">Loading recordings...</span>
    </div>
  );
};
