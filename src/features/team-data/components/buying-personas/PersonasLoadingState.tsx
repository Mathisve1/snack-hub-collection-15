
import { Loader2 } from "lucide-react";

export const PersonasLoadingState = () => {
  return (
    <div className="flex justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
    </div>
  );
};
