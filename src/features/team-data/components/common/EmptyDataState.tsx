
import { Database } from "lucide-react";

const EmptyDataState = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md p-6 text-center">
      <Database className="h-10 w-10 text-blue-500 mx-auto mb-4" />
      <h3 className="text-xl font-medium text-blue-800 mb-2">No Data Available</h3>
      <p className="text-blue-700 mb-4">
        There appears to be no data in the Team 3 tables. Please check the Supabase database 
        to ensure data has been properly uploaded.
      </p>
      <div className="bg-white rounded p-4 text-left max-w-lg mx-auto border border-blue-100">
        <p className="text-sm font-medium text-blue-800">Expected tables:</p>
        <ul className="list-disc pl-5 text-sm text-blue-600">
          <li><code>Team3buyingpersonasforwebsite</code></li>
          <li><code>Team3friturenforwebsite</code></li>
          <li><code>Team3streetinterviewsforwebsite</code></li>
        </ul>
      </div>
    </div>
  );
};

export default EmptyDataState;
