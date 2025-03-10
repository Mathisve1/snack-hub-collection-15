
import { Frituur, TeamSelection } from "@/types";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useFriturenSelections = (
  team: string,
  selections: TeamSelection[],
  setSelections: React.Dispatch<React.SetStateAction<TeamSelection[]>>,
  usingSampleData: boolean
) => {
  const isSelected = (businessName: string) => {
    return selections.some(s => s.business_name === businessName);
  };

  const getSelectedBy = (businessName: string) => {
    const selection = selections.find(s => s.business_name === businessName);
    return selection ? selection.team : null;
  };
  
  const getTeamSelectedCount = () => {
    return selections.filter(s => s.team === team).length;
  };

  const handleSelect = async (frituur: Frituur) => {
    const businessName = frituur["Business Name"];
    
    if (usingSampleData) {
      toast.info('This is sample data. Selection won\'t be saved to the database.');
      
      // For better UX, we can simulate the selection in the UI even with sample data
      const isSelectedByCurrentTeam = selections.some(
        s => s.business_name === businessName && s.team === team
      );
      
      if (isSelectedByCurrentTeam) {
        setSelections(prev => prev.filter(
          s => !(s.business_name === businessName && s.team === team)
        ));
        toast.success(`Removed ${businessName} from your selections (simulated)`);
      } else {
        const newSelection: TeamSelection = {
          id: `sample-${Date.now()}`,
          team,
          business_name: businessName,
          selected_at: new Date().toISOString()
        };
        setSelections(prev => [...prev, newSelection]);
        toast.success(`Selected ${businessName} for team ${team} (simulated)`);
      }
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

  return {
    isSelected,
    getSelectedBy,
    handleSelect,
    getTeamSelectedCount
  };
};
