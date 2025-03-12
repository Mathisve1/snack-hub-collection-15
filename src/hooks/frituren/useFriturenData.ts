
import { useState, useEffect } from "react";
import { Team, Frituur, TeamSelection } from "@/types";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useFriturenFetch } from "./useFriturenFetch";
import { useFriturenFilters } from "./useFriturenFilters";
import { useFriturenSelections } from "./useFriturenSelections";
import { useFriturenPreferences } from "./useFriturenPreferences";

export const useFriturenData = (team: string) => {
  const navigate = useNavigate();
  const [isValidTeam, setIsValidTeam] = useState(false);
  
  // Validate team and redirect if invalid
  useEffect(() => {
    const validTeams: Team[] = ["OV-3", "OV-13", "OV-14", "OV-38"];
    if (!validTeams.includes(team as Team)) {
      navigate("/");
      return;
    }
    
    setIsValidTeam(true);
  }, [team, navigate]);

  // Data fetching hook
  const {
    frituren,
    loading,
    selections,
    setSelections,
    usingSampleData
  } = useFriturenFetch(isValidTeam);

  // Filtering hook
  const {
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
    // Pagination
    currentPage,
    setCurrentPage,
    totalPages
  } = useFriturenFilters(frituren);

  // Selections hook
  const {
    isSelected,
    getSelectedBy,
    handleSelect,
    getTeamSelectedCount
  } = useFriturenSelections(team, selections, setSelections, usingSampleData);

  // User preferences hook
  const {
    savedFrituren,
    likedFrituren,
    handleSaveFrituur,
    handleLikeFrituur,
    isFrituurSaved,
    isFrituurLiked
  } = useFriturenPreferences(team);

  return {
    isValidTeam,
    loading,
    frituren,
    filteredFrituren,
    paginatedFrituren,
    searchTerm,
    setSearchTerm,
    selections,
    selectedRating,
    setSelectedRating,
    selectedProvince,
    setSelectedProvince,
    provinces,
    filterOpen,
    toggleFilter,
    resetFilters,
    isSelected,
    getSelectedBy,
    handleSelect,
    getTeamSelectedCount,
    handleSaveFrituur,
    handleLikeFrituur,
    isFrituurSaved,
    isFrituurLiked,
    usingSampleData,
    // Pagination
    currentPage,
    setCurrentPage,
    totalPages
  };
};
