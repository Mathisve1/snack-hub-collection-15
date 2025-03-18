
export interface VoiceAnalysis {
  id: string;
  team: string;
  bucket_id: string;
  file_path: string;
  transcript: string | null;
  analysis: string | null;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
  created_at: string;
  duration_seconds: number;
  file_name?: string; // Kept for backward compatibility
}

export type VoiceAnalysisType = 'frituren' | 'interviews' | 'buyer';
