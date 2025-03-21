
// Export from utility modules
export * from './responseUtils';
export * from './dataProcessing';
export * from './dataGrouping';
export * from './metricExtraction';
export * from './types';

// Export specific functions from calculationUtils to avoid ambiguity
export {
  getMostCommonValue,
  calculateAverage,
  formatBreakdownString,
  formatPercentage
} from './calculationUtils';

// Export calculationUtils with explicit name to avoid direct export conflicts
import * as calculationUtilsModule from './calculationUtils';
export const calculationUtils = calculationUtilsModule;

// Export renamed functions to avoid naming conflicts
export { calculateBooleanPercentage as calculateBoolPercentage } from './calculationUtils';
export { categorizeNumericValues as categorizeNumericRanges } from './calculationUtils';

// Export from dataUtils with renamed function to avoid conflict
export { categorizeNumericValues as categorizeDataValues } from './dataUtils';
