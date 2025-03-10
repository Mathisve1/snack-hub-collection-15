
import { useState, useEffect } from "react";
import { Frituur, TeamSelection } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Sample data as fallback
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

export const useFriturenFetch = (isValidTeam: boolean) => {
  const [frituren, setFrituren] = useState<Frituur[]>([]);
  const [selections, setSelections] = useState<TeamSelection[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingSampleData, setUsingSampleData] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchFrituren = async () => {
      try {
        setLoading(true);
        
        // Add a small delay to ensure the database has time to process
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get total count first
        const { count: totalCount, error: countError } = await supabase
          .from('frituren')
          .select('*', { count: 'exact', head: true });
          
        if (countError) {
          console.error('Error fetching count:', countError);
          throw countError;
        }
        
        console.log(`Total count of frituren: ${totalCount}`);
        
        if (!totalCount) {
          throw new Error('Could not determine total count of records');
        }
        
        // Fetch all records by paginating through them
        let allFrituren: Frituur[] = [];
        const pageSize = 1000; // Supabase maximum
        const totalPages = Math.ceil(totalCount / pageSize);
        
        toast.info(`Fetching ${totalCount} frituren in ${totalPages} batches...`);
        
        for (let page = 0; page < totalPages; page++) {
          const from = page * pageSize;
          const to = from + pageSize - 1;
          
          console.log(`Fetching batch ${page + 1}/${totalPages} (range ${from}-${to})`);
          
          const { data: friturenBatch, error: batchError } = await supabase
            .from('frituren')
            .select('*')
            .range(from, to);
            
          if (batchError) {
            console.error(`Error fetching batch ${page + 1}:`, batchError);
            throw batchError;
          }
          
          if (friturenBatch && friturenBatch.length > 0) {
            allFrituren = [...allFrituren, ...friturenBatch];
            console.log(`Added ${friturenBatch.length} records from batch ${page + 1}. Total so far: ${allFrituren.length}`);
          }
          
          // Show progress to user
          if (totalPages > 1) {
            toast.info(`Loading data: ${Math.round((page + 1) / totalPages * 100)}% complete (${allFrituren.length}/${totalCount})`);
          }
        }
          
        // Fetch team selections
        const { data: selectionsData, error: selectionsError } = await supabase
          .from('team_selections')
          .select('*');
          
        if (selectionsError) {
          console.error('Error fetching selections:', selectionsError);
          throw selectionsError;
        }
        
        console.log(`Loaded ${allFrituren.length} frituren from database from a total of ${totalCount}`);
        
        if (allFrituren.length === 0) {
          if (retryCount < 3) {
            console.log(`No data returned from Supabase, retry attempt ${retryCount + 1}`);
            setRetryCount(prev => prev + 1);
            setLoading(false);
            return; // Will trigger the effect again due to retryCount change
          }
          
          console.log('No data returned from Supabase after retries, using sample data');
          setUsingSampleData(true);
          setFrituren(sampleFrituren);
          
          toast.info('Using sample data as the database returned no results.');
        } else {
          setUsingSampleData(false);
          setFrituren(allFrituren);
          setSelections(selectionsData as TeamSelection[]);
          
          if (allFrituren.length < totalCount) {
            toast.warning(`Loaded ${allFrituren.length} of ${totalCount} frituren. Some data may be missing.`);
          } else {
            toast.success(`Successfully loaded all ${allFrituren.length} frituren.`);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data. Falling back to sample data.');
        
        setUsingSampleData(true);
        setFrituren(sampleFrituren);
      } finally {
        setLoading(false);
      }
    };
    
    if (isValidTeam) {
      fetchFrituren();
    }
  }, [isValidTeam, retryCount]);

  return {
    frituren,
    loading,
    selections,
    setSelections,
    usingSampleData
  };
};
