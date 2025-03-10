
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Team, Frituur, TeamSelection } from "@/types";
import { motion } from "framer-motion";
import { ChevronLeft, Filter, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const FriturenList = () => {
  const { team = "" } = useParams<{ team: string }>();
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
  
  // Validate team param
  useEffect(() => {
    const validTeams: Team[] = ["OV-3", "OV-14", "OV-38", "OV-40"];
    if (!validTeams.includes(team as Team)) {
      navigate("/");
      return;
    }
    
    setIsValidTeam(true);
  }, [team, navigate]);

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
        );
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

  const goHome = () => {
    navigate("/");
  };

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

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedRating(null);
    setSelectedProvince(null);
  };

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
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/70 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary cursor-pointer" onClick={goHome}>
                Frituren Selector
              </span>
            </div>
            <button
              onClick={goHome}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft size={20} className="mr-1" />
              Change Team
            </button>
          </div>
        </div>
      </motion.header>

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Team {team}
            </span>
            <h1 className="text-4xl font-bold mb-4">Frituren Selection</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through the list of frituren and select the ones you want for your team.
              Once a frituur is selected by a team, it cannot be selected by another team.
            </p>
          </motion.div>
          
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 items-end">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name, location..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-40">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Rating
                </label>
                <select
                  id="rating"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={selectedRating || ""}
                  onChange={(e) => setSelectedRating(e.target.value ? Number(e.target.value) : null)}
                >
                  <option value="">Any Rating</option>
                  <option value="1">1+ ★</option>
                  <option value="2">2+ ★★</option>
                  <option value="3">3+ ★★★</option>
                  <option value="4">4+ ★★★★</option>
                  <option value="5">5 ★★★★★</option>
                </select>
              </div>
              
              <div className="w-full md:w-48">
                <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                  Province
                </label>
                <select
                  id="province"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={selectedProvince || ""}
                  onChange={(e) => setSelectedProvince(e.target.value || null)}
                >
                  <option value="">All Provinces</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center"
              >
                <X size={16} className="mr-1" />
                Reset
              </button>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mb-4 text-gray-600">
            Showing {filteredFrituren.length} of {frituren.length} frituren
          </div>
          
          {/* Frituren list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFrituren.map((frituur, index) => {
              const businessName = frituur["Business Name"];
              const selectedByTeam = getSelectedBy(businessName);
              const isSelectedByCurrentTeam = selectedByTeam === team;
              const isSelectedByOtherTeam = selectedByTeam && selectedByTeam !== team;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index % 10 * 0.05 }}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
                    isSelectedByCurrentTeam 
                      ? 'border-primary' 
                      : isSelectedByOtherTeam 
                        ? 'border-gray-300 opacity-60' 
                        : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{businessName}</h3>
                      {frituur.Rating && (
                        <span className="flex items-center text-amber-500">
                          {frituur.Rating} <span className="ml-1">★</span>
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {frituur.Gemeente && (
                        <p className="text-gray-600 text-sm">
                          {frituur.Straat && `${frituur.Straat}, `}
                          {frituur.Gemeente}
                          {frituur.Postcode && ` - ${frituur.Postcode}`}
                        </p>
                      )}
                      {frituur.Provincie && (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {frituur.Provincie}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {isSelectedByOtherTeam ? (
                        <span className="text-sm text-gray-500">
                          Selected by {selectedByTeam}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSelect(frituur)}
                          className={`px-4 py-2 rounded-md flex items-center text-sm ${
                            isSelectedByCurrentTeam
                              ? 'bg-primary/10 text-primary hover:bg-primary/20'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {isSelectedByCurrentTeam ? (
                            <>
                              <Check size={16} className="mr-1" />
                              Selected
                            </>
                          ) : (
                            'Select'
                          )}
                        </button>
                      )}
                      
                      {frituur.Website && (
                        <a
                          href={frituur.Website.startsWith('http') ? frituur.Website : `https://${frituur.Website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 text-sm"
                        >
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {filteredFrituren.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Filter size={40} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No frituren found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gray-50 border-t border-gray-200 py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Frituren Selector. All rights reserved.
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default FriturenList;
