import { useState, useEffect } from "react";
import { Team, Frituur, TeamSelection } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const sampleFrituren: Frituur[] = [
  {
    "Business Name": "Frituur De Bosrand",
    "Rating": 4.5,
    "Provincie": "Antwerpen",
    "Gemeente": "Kapellen",
    "Straat": "Kalmthoutsesteenweg 193",
    "Postcode": 2950,
    "Website": "https://www.frituur-de-bosrand.be"
  },
  {
    "Business Name": "Frituur Het Pleintje",
    "Rating": 4.2,
    "Provincie": "Oost-Vlaanderen",
    "Gemeente": "Gent",
    "Straat": "Vrijdagmarkt 10",
    "Postcode": 9000,
    "Website": "https://www.hetpleintje.be"
  },
  {
    "Business Name": "Frituur 't Hoekske",
    "Rating": 4.8,
    "Provincie": "West-Vlaanderen",
    "Gemeente": "Brugge",
    "Straat": "Markt 25",
    "Postcode": 8000,
    "Website": "https://www.frituurhoekske.be"
  },
  {
    "Business Name": "Bintje & Zoute",
    "Rating": 4.3,
    "Provincie": "Limburg",
    "Gemeente": "Hasselt",
    "Straat": "Grote Markt 12",
    "Postcode": 3500,
    "Website": "https://www.bintjeenzoute.be"
  },
  {
    "Business Name": "Frituur De Pallieter",
    "Rating": 4.0,
    "Provincie": "Vlaams-Brabant",
    "Gemeente": "Leuven",
    "Straat": "Oude Markt 45",
    "Postcode": 3000,
    "Website": "https://www.frituurdepallieter.be"
  }
];

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
  const [usingSampleData, setUsingSampleData] = useState(false);

  useEffect(() => {
    const validTeams: Team[] = ["OV-3", "OV-14", "OV-38", "OV-40"];
    if (!validTeams.includes(team as Team)) {
      navigate("/");
      return;
    }
    
    setIsValidTeam(true);
  }, [team, navigate]);

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

  useEffect(() => {
    const fetchFrituren = async () => {
      try {
        setLoading(true);
        
        const { data: friturenData, error: friturenError } = await supabase
          .from('frituren')
          .select('*');
          
        if (friturenError) throw friturenError;
        
        const { data: selectionsData, error: selectionsError } = await supabase
          .from('team_selections')
          .select('*');
          
        if (selectionsError) throw selectionsError;
        
        console.log(`Loaded ${friturenData?.length || 0} frituren from database`);
        
        if (!friturenData || friturenData.length === 0) {
          console.log('No data returned from Supabase, using sample data');
          setUsingSampleData(true);
          setFrituren(sampleFrituren);
          setFilteredFrituren(sampleFrituren);
          
          const uniqueProvinces = Array.from(
            new Set(
              sampleFrituren
                .map(f => f.Provincie)
                .filter(Boolean) as string[]
            )
          ).sort();
          setProvinces(uniqueProvinces);
          
          toast.info('Using sample data as the database is empty');
        } else {
          const mappedFrituren = friturenData as Frituur[];
          setFrituren(mappedFrituren);
          setFilteredFrituren(mappedFrituren);
          setSelections(selectionsData as TeamSelection[]);
          
          const uniqueProvinces = Array.from(
            new Set(
              mappedFrituren
                .map(f => f.Provincie)
                .filter(Boolean) as string[]
            )
          ).sort();
          setProvinces(uniqueProvinces);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data. Falling back to sample data.');
        
        setUsingSampleData(true);
        setFrituren(sampleFrituren);
        setFilteredFrituren(sampleFrituren);
        
        const uniqueProvinces = Array.from(
          new Set(
            sampleFrituren
              .map(f => f.Provincie)
              .filter(Boolean) as string[]
          )
        ).sort();
        setProvinces(uniqueProvinces);
      } finally {
        setLoading(false);
      }
    };
    
    if (isValidTeam) {
      fetchFrituren();
    }
  }, [isValidTeam]);

  useEffect(() => {
    let filtered = [...frituren];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        f => 
          f["Business Name"]?.toLowerCase().includes(term) ||
          f.Gemeente?.toLowerCase().includes(term) ||
          f.Straat?.toLowerCase().includes(term)
      );
    }
    
    if (selectedRating !== null) {
      filtered = filtered.filter(f => f.Rating && f.Rating >= selectedRating);
    }
    
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
    
    if (usingSampleData) {
      toast.info('This is sample data. Selection won\'t be saved to the database.');
      return;
    }
    
    if (isSelected(businessName) && getSelectedBy(businessName) !== team) {
      toast.error(`This frituur is already selected by team ${getSelectedBy(businessName)}`);
      return;
    }
    
    const isSelectedByCurrentTeam = selections.some(
      s => s.business_name === businessName && s.team === team
    );
    
    try {
      if (isSelectedByCurrentTeam) {
        const { error } = await supabase
          .from('team_selections')
          .delete()
          .eq('business_name', businessName)
          .eq('team', team);
          
        if (error) throw error;
        
        setSelections(prev => prev.filter(
          s => !(s.business_name === businessName && s.team === team)
        ));
        
        toast.success(`Removed ${businessName} from your selections`);
      } else {
        const { data, error } = await supabase
          .from('team_selections')
          .insert({
            team,
            business_name: businessName
          })
          .select()
          .single();
          
        if (error) throw error;
        
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
      newSavedList = savedFrituren.filter(name => name !== businessName);
      toast.success(`Removed ${businessName} from saved list`);
    } else {
      newSavedList = [...savedFrituren, businessName];
      toast.success(`Saved ${businessName} to your list`);
    }
    
    setSavedFrituren(newSavedList);
    localStorage.setItem(`${team}-saved-frituren`, JSON.stringify(newSavedList));
  };

  const handleLikeFrituur = (businessName: string) => {
    let newLikedList: string[];
    
    if (likedFrituren.includes(businessName)) {
      newLikedList = likedFrituren.filter(name => name !== businessName);
      toast.success(`Removed ${businessName} from liked list`);
    } else {
      newLikedList = [...likedFrituren, businessName];
      toast.success(`Added ${businessName} to your liked list`);
    }
    
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
    isFrituurLiked,
    usingSampleData
  };
};
