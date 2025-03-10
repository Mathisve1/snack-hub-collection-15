
import { useState, useEffect } from "react";
import { Frituur } from "@/types";

export const useFriturenFilters = (frituren: Frituur[]) => {
  const [filteredFrituren, setFilteredFrituren] = useState<Frituur[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  // Initialize provinces list from frituren data
  useEffect(() => {
    if (frituren.length > 0) {
      const uniqueProvinces = Array.from(
        new Set(
          frituren
            .map(f => f.Provincie)
            .filter(Boolean) as string[]
        )
      ).sort();
      setProvinces(uniqueProvinces);
      setFilteredFrituren(frituren);
    }
  }, [frituren]);

  // Apply filters whenever filter criteria change
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

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedRating(null);
    setSelectedProvince(null);
  };

  return {
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
    resetFilters
  };
};
