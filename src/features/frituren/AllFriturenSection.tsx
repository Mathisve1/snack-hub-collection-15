
import React from "react";
import { Frituur } from "@/types";
import FriturenFilters from "./FriturenFilters";
import FriturenItem from "./FriturenItem";
import NoResults from "./NoResults";
import FriturenPagination from "./FriturenPagination";

interface AllFriturenSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRating: number | null;
  setSelectedRating: (rating: number | null) => void;
  selectedProvince: string | null;
  setSelectedProvince: (province: string | null) => void;
  provinces: string[];
  resetFilters: () => void;
  filterOpen: boolean;
  toggleFilter: () => void;
  filteredFrituren: Frituur[];
  paginatedFrituren: Frituur[];
  team: string;
  getSelectedBy: (businessName: string) => string | null;
  handleSelect: (frituur: Frituur) => void;
  isFrituurSaved: (businessName: string) => boolean;
  isFrituurLiked: (businessName: string) => boolean;
  handleSaveFrituur: (businessName: string) => void;
  handleLikeFrituur: (businessName: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const AllFriturenSection = ({
  searchTerm,
  setSearchTerm,
  selectedRating,
  setSelectedRating,
  selectedProvince,
  setSelectedProvince,
  provinces,
  resetFilters,
  filterOpen,
  toggleFilter,
  filteredFrituren,
  paginatedFrituren,
  team,
  getSelectedBy,
  handleSelect,
  isFrituurSaved,
  isFrituurLiked,
  handleSaveFrituur,
  handleLikeFrituur,
  currentPage,
  setCurrentPage,
  totalPages,
}: AllFriturenSectionProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">All Available Frituren</h2>
      
      <FriturenFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        selectedProvince={selectedProvince}
        setSelectedProvince={setSelectedProvince}
        provinces={provinces}
        resetFilters={resetFilters}
        filterOpen={filterOpen}
        toggleFilter={toggleFilter}
      />
      
      <div className="mb-4 text-gray-600 flex justify-between items-center mt-4">
        <span>Showing {paginatedFrituren.length} of {filteredFrituren.length} frituren</span>
        <span className="text-sm">Page {currentPage} of {totalPages}</span>
      </div>
      
      {paginatedFrituren.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedFrituren.map((frituur, index) => {
              const businessName = frituur["Business Name"];
              const selectedByTeam = getSelectedBy(businessName);
              const isSelectedByCurrentTeam = selectedByTeam === team;
              const isSelectedByOtherTeam = selectedByTeam && selectedByTeam !== team;
              
              return (
                <FriturenItem
                  key={`all-${businessName}-${index}`}
                  frituur={frituur}
                  index={index}
                  isSelectedByCurrentTeam={isSelectedByCurrentTeam}
                  isSelectedByOtherTeam={isSelectedByOtherTeam}
                  selectedByTeam={selectedByTeam}
                  handleSelect={handleSelect}
                  isSaved={isFrituurSaved(businessName)}
                  isLiked={isFrituurLiked(businessName)}
                  onSave={handleSaveFrituur}
                  onLike={handleLikeFrituur}
                />
              );
            })}
          </div>
          
          <FriturenPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <NoResults resetFilters={resetFilters} />
      )}
    </div>
  );
};

export default AllFriturenSection;
