
import { useParams, useNavigate } from "react-router-dom";
import { useFriturenData } from "@/hooks/frituren";
import FriturenHeader from "@/features/frituren/FriturenHeader";
import IntroSection from "@/features/frituren/IntroSection";
import FriturenFooter from "@/features/frituren/FriturenFooter";
import LoadingState from "@/features/frituren/LoadingState";
import SampleDataAlert from "@/features/frituren/SampleDataAlert";
import FolderManagementSection from "@/features/frituren/FolderManagementSection";
import AllFriturenSection from "@/features/frituren/AllFriturenSection";
import TeamSelectionsSection from "@/features/frituren/TeamSelectionsSection";
import VoiceAnalysisSection from "@/features/voice-analysis/VoiceAnalysisSection";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import AccessCodeModal from "@/components/AccessCodeModal";

const FriturenList = () => {
  const { team = "" } = useParams<{ team: string }>();
  const navigate = useNavigate();
  const [showFolders, setShowFolders] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [showAccessModal, setShowAccessModal] = useState(false);
  
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

  // Verify team access on page load
  useEffect(() => {
    if (!isValidTeam) return;
    
    const checkTeamAccess = () => {
      const isVerified = sessionStorage.getItem(`team_access_${team}`);
      if (isVerified === "verified") {
        setIsVerifying(false);
      } else {
        setShowAccessModal(true);
        setIsVerifying(false);
      }
    };
    
    checkTeamAccess();
  }, [team, isValidTeam]);

  const handleVerificationSuccess = () => {
    setShowAccessModal(false);
  };

  if (!isValidTeam || loading || isVerifying) {
    return <LoadingState loading={loading || isVerifying} />;
  }
  
  // Get team-selected frituren separately from all frituren
  // Important: Use the original frituren array, not the filtered one
  const teamFrituren = frituren.filter(frituur => {
    const selectedByTeam = getSelectedBy(frituur["Business Name"]);
    return selectedByTeam === team;
  });

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <FriturenHeader 
          team={team} 
          selectedCount={getTeamSelectedCount()}
          showFolders={showFolders}
          setShowFolders={setShowFolders}
        />

        <main className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <IntroSection team={team} />
            
            {usingSampleData && <SampleDataAlert />}
            
            {/* Voice Analysis Section - Added above frituren selection */}
            <VoiceAnalysisSection team={team} />
            
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
      
      {/* Access Code Verification Modal */}
      <AccessCodeModal
        team={team}
        isOpen={showAccessModal}
        onClose={() => {
          setShowAccessModal(false);
          navigate("/");
        }}
        onSuccess={handleVerificationSuccess}
      />
    </>
  );
};

export default FriturenList;
