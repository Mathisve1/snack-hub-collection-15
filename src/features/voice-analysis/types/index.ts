
export interface VoiceAnalysis {
  id: string;
  team: string;
  recording_url: string | null;
  transcript: string | null;
  analysis: string | null;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
  created_at: string;
  duration_seconds: number;
  file_name: string;
}

export type VoiceAnalysisType = 'frituren' | 'interviews';
