
import { useMemo } from 'react';
import { Frituur } from '@/types';

export const useDuplicateValidation = (
  frituren: Frituur[],
  currentValues: Partial<Frituur>
) => {
  const isDuplicate = useMemo(() => {
    if (!frituren || !currentValues["Business Name"]) {
      return false;
    }

    const normalizedName = currentValues["Business Name"].toLowerCase().trim();
    
    return frituren.some((frituur) => {
      // Only check for duplicates if there's a business name
      if (!frituur["Business Name"]) return false;
      
      // Simple string comparison instead of deep object comparison to avoid type issues
      return frituur["Business Name"].toLowerCase().trim() === normalizedName;
    });
  }, [frituren, currentValues["Business Name"]]);

  return { isDuplicate };
};
