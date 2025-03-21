
/**
 * Helper function to categorize numeric values into ranges
 */
export const categorizeNumericValues = (record: Record<string, number>): Record<string, number> => {
  const categories: Record<string, number> = {};
  
  for (const [valueStr, count] of Object.entries(record)) {
    const value = parseFloat(valueStr);
    if (isNaN(value)) continue;
    
    let category: string;
    // Categorize based on value ranges (adjust for your data)
    if (value < 5) category = "< 5";
    else if (value < 10) category = "5-10";
    else if (value < 15) category = "10-15";
    else if (value < 20) category = "15-20";
    else category = "20+";
    
    categories[category] = (categories[category] || 0) + count;
  }
  
  return categories;
};
