
import { Loader2, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (status === 'pending') {
    return (
      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
        Pending
      </span>
    );
  }
  
  if (status === 'processing') {
    return (
      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center">
        <Loader2 className="h-3 w-3 mr-1 animate-spin" /> Processing
      </span>
    );
  }
  
  if (status === 'completed') {
    return (
      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
        Completed
      </span>
    );
  }
  
  if (status === 'failed') {
    return (
      <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full flex items-center">
        <AlertCircle className="h-3 w-3 mr-1" /> Failed
      </span>
    );
  }
  
  return null;
};

export default StatusBadge;
