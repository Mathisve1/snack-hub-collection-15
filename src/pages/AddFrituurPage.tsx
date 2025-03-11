
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AddFrituurForm from "@/features/frituren/AddFrituurForm";

const AddFrituurPage = () => {
  const { team = "" } = useParams<{ team: string }>();
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(`/frituren/${team}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Add New Frituur</h1>
          <Button variant="ghost" onClick={goBack} className="flex items-center gap-1">
            <ArrowLeft size={16} />
            Back to list
          </Button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AddFrituurForm team={team} />
      </main>
    </div>
  );
};

export default AddFrituurPage;
