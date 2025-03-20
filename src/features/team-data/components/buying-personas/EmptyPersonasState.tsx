
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
    isTeam3Data?: boolean; // Add this new property
    team3DataLength?: number; // Add this new property
    team38DataLength?: number; // Add this new property
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
          {debug.isTeam3Data !== undefined && <p>Is Team 3 Data: {String(debug.isTeam3Data)}</p>}
          {debug.team3DataLength !== undefined && <p>Team 3 Data Length: {debug.team3DataLength}</p>}
          {debug.team38DataLength !== undefined && <p>Team 38 Data Length: {debug.team38DataLength}</p>}
          {debug.error && <p>Error: {debug.error}</p>}
        </div>
      )}
    </div>
  );
};
