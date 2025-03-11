
import { Frituur } from "@/types";

interface AdditionalInfoTabProps {
  frituur: Frituur;
}

const AdditionalInfoTab = ({ frituur }: AdditionalInfoTabProps) => {
  return (
    <div className="space-y-6">
      {/* Category */}
      {frituur.Category && (
        <div>
          <h3 className="font-medium text-gray-700 mb-1">Category</h3>
          <p>{frituur.Category}</p>
        </div>
      )}
      
      {/* Reviews */}
      {frituur.Review && (
        <div>
          <h3 className="font-medium text-gray-700 mb-1">Reviews</h3>
          <p className="text-gray-600">{frituur.Review}</p>
        </div>
      )}
    </div>
  );
};

export default AdditionalInfoTab;
