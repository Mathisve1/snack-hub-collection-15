
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useFriturenPreferences = (team: string) => {
  const [savedFrituren, setSavedFrituren] = useState<string[]>([]);
  const [likedFrituren, setLikedFrituren] = useState<string[]>([]);

  // Load saved and liked frituren from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem(`${team}-saved-frituren`);
    if (savedItems) {
      setSavedFrituren(JSON.parse(savedItems));
    }
    
    const likedItems = localStorage.getItem(`${team}-liked-frituren`);
    if (likedItems) {
      setLikedFrituren(JSON.parse(likedItems));
    }
  }, [team]);

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

  return {
    savedFrituren,
    likedFrituren,
    handleSaveFrituur,
    handleLikeFrituur,
    isFrituurSaved,
    isFrituurLiked
  };
};
