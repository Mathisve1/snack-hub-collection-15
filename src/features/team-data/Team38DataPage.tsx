
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Team38DataDisplay from "./components/Team38DataDisplay";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export const Team38DataPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team 38 Data Overview</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/team-38-results-duplicate">
              <Copy className="h-4 w-4 mr-2" />
              View Duplicate
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/team-38-results-triplicate">
              <Copy className="h-4 w-4 mr-2" />
              View Triplicate
            </Link>
          </Button>
        </div>
      </div>
      
      <Team38DataDisplay />
    </div>
  );
};

export default Team38DataPage;
