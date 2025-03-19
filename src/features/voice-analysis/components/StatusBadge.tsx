
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

type StatusType = 'pending' | 'processing' | 'completed' | 'failed';

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch(status) {
    case 'pending':
      return (
        <Badge variant="outline" className="text-yellow-600 border-yellow-300 bg-yellow-50">
          Pending
        </Badge>
      );
    case 'processing':
      return (
        <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50 flex items-center gap-1">
          <Loader2 className="h-3 w-3 animate-spin" />
          Processing
        </Badge>
      );
    case 'completed':
      return (
        <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">
          Completed
        </Badge>
      );
    case 'failed':
      return (
        <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50">
          Failed
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">
          {status}
        </Badge>
      );
  }
};

export default StatusBadge;
