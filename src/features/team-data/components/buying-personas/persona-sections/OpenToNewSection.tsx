
import { Progress } from "@/components/ui/progress";

type OpenToNewSectionProps = {
  openheid: {
    ja: number;
    nee: number;
    total: number;
  };
};

export const OpenToNewSection = ({ openheid }: OpenToNewSectionProps) => {
  const percentage = Math.round((openheid.ja / openheid.total) * 100);
  
  return (
    <div>
      <h4 className="font-medium text-gray-700 mb-1">Open voor Nieuwe Snack</h4>
      <div className="mt-2">
        <Progress value={percentage} className="h-2.5" />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>{percentage}% is open</span>
          <span>({openheid.ja}/{openheid.total})</span>
        </div>
      </div>
    </div>
  );
};
