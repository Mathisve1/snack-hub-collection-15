
import { AlertTriangle } from "lucide-react";

interface DataErrorStateProps {
  personasError: string | null;
  friturenError: string | null;
  interviewsError: string | null;
}

const DataErrorState = ({ personasError, friturenError, interviewsError }: DataErrorStateProps) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
      <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-medium text-red-800 mb-2">Error Loading Data</h3>
      <p className="text-red-700 mb-4">
        There was a problem loading the research data. Please try refreshing the page.
      </p>
      <div className="bg-white rounded p-4 text-left max-w-lg mx-auto border border-red-100">
        <p className="text-sm font-medium text-red-800">Error details:</p>
        {personasError && <p className="text-xs text-red-700 mt-1">Personas: {personasError}</p>}
        {friturenError && <p className="text-xs text-red-700 mt-1">Frituren: {friturenError}</p>}
        {interviewsError && <p className="text-xs text-red-700 mt-1">Interviews: {interviewsError}</p>}
      </div>
    </div>
  );
};

export default DataErrorState;
