
import { useParams } from "react-router-dom";
import { useFriturenData } from "@/hooks/useFriturenData";
import FriturenHeader from "@/features/frituren/FriturenHeader";
import FriturenFilters from "@/features/frituren/FriturenFilters";
import FriturenItem from "@/features/frituren/FriturenItem";
import NoResults from "@/features/frituren/NoResults";
import IntroSection from "@/features/frituren/IntroSection";
import FriturenFooter from "@/features/frituren/FriturenFooter";

const FriturenList = () => {
  const { team = "" } = useParams<{ team: string }>();
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
    getTeamSelectedCount
  } = useFriturenData(team);

  if (!isValidTeam || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
