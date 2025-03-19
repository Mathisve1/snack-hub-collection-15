
export type VoiceAnalysisType = 'frituren' | 'interviews' | 'buyer';

export interface VoiceAnalysis {
  id: string;
  team: string;
  recording_url?: string;
  transcript?: string;
  analysis?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  duration_seconds: number;
  file_path?: string;
  bucket_id?: string;
}
