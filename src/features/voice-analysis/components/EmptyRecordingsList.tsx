
import { AudioLines } from "lucide-react";

const EmptyRecordingsList = () => {
  return (
    <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
      <AudioLines className="h-10 w-10 mx-auto text-gray-400 mb-2" />
      <p className="text-gray-500">No voice recordings have been analyzed yet</p>
    </div>
  );
};

export default EmptyRecordingsList;
