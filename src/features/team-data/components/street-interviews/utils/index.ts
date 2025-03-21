
// Export from utility modules
export * from './responseUtils';
export * from './dataProcessing';
export * from './dataGrouping';
export * from './metricExtraction';
export * from './types';

// Export from calculationUtils, avoiding direct export to prevent ambiguity
import * as calculationUtils from './calculationUtils';
export {
  getMostCommonValue,
  calculateAverage,
  formatBreakdownString,
  formatPercentage
} from './calculationUtils';

// Export with explicit names to avoid ambiguity
export { calculationUtils };
export { calculateBooleanPercentage as calculateBoolPercentage } from './calculationUtils';
export { categorizeNumericValues as categorizeNumericRanges } from './calculationUtils';
export { categorizeNumericValues as categorizeDataValues } from './dataUtils';
