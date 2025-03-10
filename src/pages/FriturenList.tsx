
import { useParams } from "react-router-dom";
import { useFriturenData } from "@/hooks/frituren";
import FriturenHeader from "@/features/frituren/FriturenHeader";
import FriturenFilters from "@/features/frituren/FriturenFilters";
import FriturenItem from "@/features/frituren/FriturenItem";
import NoResults from "@/features/frituren/NoResults";
import IntroSection from "@/features/frituren/IntroSection";
import FriturenFooter from "@/features/frituren/FriturenFooter";
import FriturenFolders from "@/features/frituren/FriturenFolders";
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
    usingSampleData
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
          
          {/* Your Selections section */}
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
          
          {/* Results count */}
          <div className="mb-4 text-gray-600 flex justify-between items-center">
            <span>Showing {filteredFrituren.length} of {frituren.length} frituren</span>
            <span className="text-sm">Your selections: {getTeamSelectedCount()}</span>
          </div>
          
          {/* Frituren list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFrituren.map((frituur, index) => {
              const businessName = frituur["Business Name"];
              const selectedByTeam = getSelectedBy(businessName);
              const isSelectedByCurrentTeam = selectedByTeam === team;
              const isSelectedByOtherTeam = selectedByTeam && selectedByTeam !== team;
              
              return (
                <FriturenItem
                  key={index}
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
          
          {filteredFrituren.length === 0 && (
            <NoResults resetFilters={resetFilters} />
          )}
        </div>
      </main>

      <FriturenFooter />
    </div>
  );
};

export default FriturenList;
