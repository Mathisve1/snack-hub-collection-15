
import { useEffect } from "react";

type EmptyPersonasStateProps = {
  debug?: {
    dataLength?: number;
    dataExists?: boolean;
    isLoading?: boolean;
    error?: string | null;
    currentPath?: string;
    isTeam3?: boolean;
    isTeam38?: boolean;
  };
};

export const EmptyPersonasState = ({ debug }: EmptyPersonasStateProps) => {
  useEffect(() => {
    if (debug) {
      console.log("EmptyPersonasState debug info:", debug);
    }
  }, [debug]);

  return (
    <div className="text-gray-500 p-8 text-center border border-gray-200 rounded-lg bg-gray-50 my-4">
      <p className="mb-4 text-lg">No buying personas data available.</p>
      <p className="text-sm mb-2">Check that the database contains entries for this team.</p>
      
      {debug && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md text-left text-xs font-mono">
          <p>Debug Info:</p>
          <p>Data Length: {debug.dataLength !== undefined ? debug.dataLength : 'unknown'}</p>
          <p>Data Exists: {debug.dataExists !== undefined ? String(debug.dataExists) : 'unknown'}</p>
          <p>Is Loading: {debug.isLoading !== undefined ? String(debug.isLoading) : 'unknown'}</p>
          {debug.currentPath && <p>Current Path: {debug.currentPath}</p>}
          {debug.isTeam3 !== undefined && <p>Is Team 3: {String(debug.isTeam3)}</p>}
          {debug.isTeam38 !== undefined && <p>Is Team 38: {String(debug.isTeam38)}</p>}
          {debug.error && <p>Error: {debug.error}</p>}
        </div>
      )}
    </div>
  );
};
