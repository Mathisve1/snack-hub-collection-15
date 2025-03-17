
export const formatDuration = (seconds: number): string => {
  if (seconds === undefined || seconds === null) return "Unknown";
  
  if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
