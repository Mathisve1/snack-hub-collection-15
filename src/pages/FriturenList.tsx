
import { useParams } from "react-router-dom";
import { useFriturenData } from "@/hooks/frituren";
import FriturenHeader from "@/features/frituren/FriturenHeader";
import FriturenFilters from "@/features/frituren/FriturenFilters";
import FriturenItem from "@/features/frituren/FriturenItem";
import NoResults from "@/features/frituren/NoResults";
import IntroSection from "@/features/frituren/IntroSection";
import FriturenFooter from "@/features/frituren/FriturenFooter";
import FriturenFolders from "@/features/frituren/FriturenFolders";
import FriturenPagination from "@/features/frituren/FriturenPagination";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

const FriturenList = () => {
  const { team = "" } = useParams<{ team: string }>();
  const [showFolders, setShowFolders] = useState(false);
  
  const {
    isValidTeam,
    loading,
    frituren,
    filteredFrituren,
    paginatedFrituren,
    searchTerm,
    setSearchTerm,
    selectedRating,
    setSelectedRating,
    selectedProvince,
    setSelectedProvince,
    provinces,
    filterOpen,
    toggleFilter,
    resetFilters,
    getSelectedBy,
    handleSelect,
    getTeamSelectedCount,
    handleSaveFrituur,
    handleLikeFrituur,
    isFrituurSaved,
    isFrituurLiked,
    usingSampleData,
    currentPage,
    setCurrentPage,
    totalPages
  } = useFriturenData(team);

  if (!isValidTeam || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
          {loading && <p className="text-sm text-gray-500 mt-2">Loading all frituren, this might take a moment...</p>}
        </div>
      </div>
    );
  }
  
  // Filter frituren to only show those selected by the current team
  const teamFrituren = filteredFrituren.filter(frituur => {
    const selectedByTeam = getSelectedBy(frituur["Business Name"]);
    return selectedByTeam === team;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <FriturenHeader 
        team={team} 
        selectedCount={getTeamSelectedCount()} 
      />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <IntroSection team={team} />
          
          {usingSampleData && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
              <AlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-medium text-amber-800">Using Sample Data</h3>
                <p className="text-amber-700 text-sm">
                  The application is currently using sample data because the Supabase database returned no results.
                  This could be because the database is empty or there's a connection issue.
                </p>
              </div>
            </div>
          )}
          
          {/* Folder management section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your {team} Selections</h2>
              <button
                onClick={() => setShowFolders(!showFolders)}
                className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
              >
                {showFolders ? "Hide Folders" : "Manage Folders"}
              </button>
            </div>
            
            {showFolders && (
              <div className="mb-8">
                <FriturenFolders 
                  team={team}
                  frituren={frituren}
                />
              </div>
            )}
          </div>
          
          {/* All frituren section with filters and pagination */}
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
                        key={`all-${businessName}`}
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
          
          {/* Team selections section at the bottom */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Selected Frituren</h2>
            
            {teamFrituren.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamFrituren.map((frituur, index) => {
                  const businessName = frituur["Business Name"];
                  const selectedByTeam = getSelectedBy(businessName);
                  const isSelectedByCurrentTeam = selectedByTeam === team;
                  const isSelectedByOtherTeam = selectedByTeam && selectedByTeam !== team;
                  
                  return (
                    <FriturenItem
                      key={`team-${businessName}`}
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
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-600">You haven't selected any frituren yet.</p>
                <p className="text-gray-500 mt-2">Browse the list above and start selecting!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <FriturenFooter />
    </div>
  );
};

export default FriturenList;
