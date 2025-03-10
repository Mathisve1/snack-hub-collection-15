
import { useState, useEffect } from "react";
import { Team, Frituur, TeamSelection } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useFriturenData = (team: string) => {
  const navigate = useNavigate();
  const [isValidTeam, setIsValidTeam] = useState(false);
  const [frituren, setFrituren] = useState<Frituur[]>([]);
  const [filteredFrituren, setFilteredFrituren] = useState<Frituur[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selections, setSelections] = useState<TeamSelection[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [savedFrituren, setSavedFrituren] = useState<string[]>([]);
  const [likedFrituren, setLikedFrituren] = useState<string[]>([]);

  // Validate team param
  useEffect(() => {
    const validTeams: Team[] = ["OV-3", "OV-14", "OV-38", "OV-40"];
    if (!validTeams.includes(team as Team)) {
      navigate("/");
      return;
    }
    
    setIsValidTeam(true);
  }, [team, navigate]);

  // Load saved and liked frituren from localStorage
  useEffect(() => {
    if (isValidTeam) {
      const savedItems = localStorage.getItem(`${team}-saved-frituren`);
      if (savedItems) {
        setSavedFrituren(JSON.parse(savedItems));
      }
      
      const likedItems = localStorage.getItem(`${team}-liked-frituren`);
      if (likedItems) {
        setLikedFrituren(JSON.parse(likedItems));
      }
    }
  }, [isValidTeam, team]);

  // Fetch frituren data
  useEffect(() => {
    const fetchFrituren = async () => {
      try {
        setLoading(true);
        
        // Fetch frituren data
        const { data: friturenData, error: friturenError } = await supabase
          .from('frituren')
          .select('*');
          
        if (friturenError) throw friturenError;
        
        // Fetch team selections to know which frituren are already selected
        const { data: selectionsData, error: selectionsError } = await supabase
          .from('team_selections')
          .select('*');
          
        if (selectionsError) throw selectionsError;
        
        // Map the data to our Frituur interface
        const mappedFrituren = friturenData as Frituur[];
        setFrituren(mappedFrituren);
        setFilteredFrituren(mappedFrituren);
        setSelections(selectionsData as TeamSelection[]);
        
        // Extract unique provinces for filtering
        const uniqueProvinces = Array.from(
          new Set(
            mappedFrituren
              .map(f => f.Provincie)
              .filter(Boolean) as string[]
          )
        ).sort();
        setProvinces(uniqueProvinces);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (isValidTeam) {
      fetchFrituren();
    }
  }, [isValidTeam]);

  // Apply filters
  useEffect(() => {
    let filtered = [...frituren];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        f => 
          f["Business Name"]?.toLowerCase().includes(term) ||
          f.Gemeente?.toLowerCase().includes(term) ||
          f.Straat?.toLowerCase().includes(term)
      );
    }
    
    // Apply rating filter
    if (selectedRating !== null) {
      filtered = filtered.filter(f => f.Rating && f.Rating >= selectedRating);
    }
    
    // Apply province filter
    if (selectedProvince) {
      filtered = filtered.filter(f => f.Provincie === selectedProvince);
    }
    
    setFilteredFrituren(filtered);
  }, [frituren, searchTerm, selectedRating, selectedProvince]);

  const isSelected = (businessName: string) => {
    return selections.some(s => s.business_name === businessName);
  };

  const getSelectedBy = (businessName: string) => {
    const selection = selections.find(s => s.business_name === businessName);
    return selection ? selection.team : null;
  };

  const handleSelect = async (frituur: Frituur) => {
    const businessName = frituur["Business Name"];
    
    // Check if this frituur is already selected by another team
    if (isSelected(businessName) && getSelectedBy(businessName) !== team) {
      toast.error(`This frituur is already selected by team ${getSelectedBy(businessName)}`);
      return;
    }
    
    // Check if it's selected by the current team (if so, we'll remove it)
    const isSelectedByCurrentTeam = selections.some(
      s => s.business_name === businessName && s.team === team
    );
    
    try {
      if (isSelectedByCurrentTeam) {
        // Delete the selection
        const { error } = await supabase
          .from('team_selections')
          .delete()
          .eq('business_name', businessName)
          .eq('team', team);
          
        if (error) throw error;
        
        // Update local state by removing the selection
        setSelections(prev => prev.filter(
          s => !(s.business_name === businessName && s.team === team)
        ));
        
        toast.success(`Removed ${businessName} from your selections`);
      } else {
        // Insert new selection
        const { data, error } = await supabase
          .from('team_selections')
          .insert({
            team,
            business_name: businessName
          })
          .select()
          .single();
          
        if (error) throw error;
        
        // Update local state by adding the new selection
        setSelections(prev => [...prev, data as TeamSelection]);
        
        toast.success(`Selected ${businessName} for team ${team}`);
      }
    } catch (error) {
      console.error('Error managing selection:', error);
      toast.error('Failed to update selection. Please try again.');
    }
  };

  const handleSaveFrituur = (businessName: string) => {
    let newSavedList: string[];
    
    if (savedFrituren.includes(businessName)) {
      // Remove from saved list
      newSavedList = savedFrituren.filter(name => name !== businessName);
      toast.success(`Removed ${businessName} from saved list`);
    } else {
      // Add to saved list
      newSavedList = [...savedFrituren, businessName];
      toast.success(`Saved ${businessName} to your list`);
    }
    
    // Update state and localStorage
    setSavedFrituren(newSavedList);
    localStorage.setItem(`${team}-saved-frituren`, JSON.stringify(newSavedList));
  };

  const handleLikeFrituur = (businessName: string) => {
    let newLikedList: string[];
    
    if (likedFrituren.includes(businessName)) {
      // Remove from liked list
      newLikedList = likedFrituren.filter(name => name !== businessName);
      toast.success(`Removed ${businessName} from liked list`);
    } else {
      // Add to liked list
      newLikedList = [...likedFrituren, businessName];
      toast.success(`Added ${businessName} to your liked list`);
    }
    
    // Update state and localStorage
    setLikedFrituren(newLikedList);
    localStorage.setItem(`${team}-liked-frituren`, JSON.stringify(newLikedList));
  };

  const isFrituurSaved = (businessName: string) => {
    return savedFrituren.includes(businessName);
  };

  const isFrituurLiked = (businessName: string) => {
    return likedFrituren.includes(businessName);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedRating(null);
    setSelectedProvince(null);
  };

  const getTeamSelectedCount = () => {
    return selections.filter(s => s.team === team).length;
  };

  return {
    isValidTeam,
    loading,
    frituren,
    filteredFrituren,
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
    isFrituurLiked
  };
};
