
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DebugInfo {
  dataLength?: number;
  dataExists?: boolean;
  isLoading?: boolean;
  error?: string;
  currentPath?: string;
  isTeam38?: boolean;
  team38DataLength?: number;
  team3DataLength?: number;
  team13DataLength?: number;
  personasLength?: number;
}

interface EmptyPersonasStateProps {
  debug?: DebugInfo;
}

export const EmptyPersonasState = ({ debug }: EmptyPersonasStateProps) => {
  return (
    <div className="py-10 text-center">
      <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <AlertTriangle className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Buying Personas Found</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">
        There are no buying personas available in this dataset. Please check that the data has been loaded correctly.
      </p>
      
      {debug && (
        <Alert className="max-w-3xl mx-auto mt-4 border-blue-200 bg-blue-50 text-blue-800">
          <AlertDescription>
            <details>
              <summary className="cursor-pointer font-medium">Debug Information</summary>
              <div className="mt-2 text-left text-xs font-mono">
                <pre className="p-2 bg-blue-100 rounded overflow-x-auto">
                  {JSON.stringify(debug, null, 2)}
                </pre>
              </div>
            </details>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
