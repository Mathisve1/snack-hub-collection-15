
import { VoiceAnalysisType } from "../../types";

interface MainMenuViewProps {
  onSelectView: (view: 'transcripts' | 'analyses') => void;
  type: VoiceAnalysisType;
}

export const MainMenuView = ({ onSelectView, type }: MainMenuViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        className="p-8 border rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center text-center"
        onClick={() => onSelectView('transcripts')}
      >
        <h3 className="text-xl font-semibold mb-2">Transcripts</h3>
        <p className="text-gray-500">
          View all transcriptions of your {type} recordings
        </p>
      </div>

      <div 
        className="p-8 border rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center text-center"
        onClick={() => onSelectView('analyses')}
      >
        <h3 className="text-xl font-semibold mb-2">Analysis</h3>
        <p className="text-gray-500">
          View all AI analyses of your {type} recordings
        </p>
      </div>
    </div>
  );
};
