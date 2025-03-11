
-- Voice Analysis table
CREATE TABLE IF NOT EXISTS voice_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team VARCHAR NOT NULL,
  recording_url TEXT NOT NULL,
  transcript TEXT,
  analysis TEXT,
  status VARCHAR NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  duration_seconds INTEGER,
  file_name VARCHAR
);

-- Add indexes
CREATE INDEX IF NOT EXISTS voice_analysis_team_idx ON voice_analysis(team);
CREATE INDEX IF NOT EXISTS voice_analysis_status_idx ON voice_analysis(status);
