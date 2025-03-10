
import React from "react";
import { AlertTriangle } from "lucide-react";

const SampleDataAlert = () => {
  return (
    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
      <AlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={20} />
      <div>
        <h3 className="font-medium text-amber-800">Using Sample Data</h3>
        <p className="text-amber-700 text-sm">
          The application is currently using sample data because the Supabase database returned no results.
          This could be because the database is empty or there's a connection issue.
        </p>
      </div>
    </div>
  );
};

export default SampleDataAlert;
