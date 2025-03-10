
import { useParams } from "react-router-dom";
import { useFriturenData } from "@/hooks/frituren";
import FriturenHeader from "@/features/frituren/FriturenHeader";
import IntroSection from "@/features/frituren/IntroSection";
import FriturenFooter from "@/features/frituren/FriturenFooter";
import LoadingState from "@/features/frituren/LoadingState";
import SampleDataAlert from "@/features/frituren/SampleDataAlert";
import FolderManagementSection from "@/features/frituren/FolderManagementSection";
import AllFriturenSection from "@/features/frituren/AllFriturenSection";
import TeamSelectionsSection from "@/features/frituren/TeamSelectionsSection";
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
    return <LoadingState loading={loading} />;
  }
  
  // Get team-selected frituren separately from all frituren
  // Important: Use the original frituren array, not the filtered one
  const teamFrituren = frituren.filter(frituur => {
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
          
          {usingSampleData && <SampleDataAlert />}
          
          {/* Folder management section */}
          <FolderManagementSection
            showFolders={showFolders}
            setShowFolders={setShowFolders}
            team={team}
            frituren={frituren}
          />
          
          {/* All frituren section with filters and pagination */}
          <AllFriturenSection
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
            filteredFrituren={filteredFrituren}
            paginatedFrituren={paginatedFrituren}
            team={team}
            getSelectedBy={getSelectedBy}
            handleSelect={handleSelect}
            isFrituurSaved={isFrituurSaved}
            isFrituurLiked={isFrituurLiked}
            handleSaveFrituur={handleSaveFrituur}
            handleLikeFrituur={handleLikeFrituur}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
          
          {/* Team selections section at the bottom */}
          <TeamSelectionsSection
            teamFrituren={teamFrituren}
            team={team}
            getSelectedBy={getSelectedBy}
            handleSelect={handleSelect}
            isFrituurSaved={isFrituurSaved}
            isFrituurLiked={isFrituurLiked}
            handleSaveFrituur={handleSaveFrituur}
            handleLikeFrituur={handleLikeFrituur}
          />
        </div>
      </main>

      <FriturenFooter />
    </div>
  );
};

export default FriturenList;
