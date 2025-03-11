import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mic, Camera, File, Plus, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "./FileUploader";
import FrituurAttachmentsList from "./attachments/FrituurAttachmentsList";

interface NotesTabContentProps {
  team: string;
  businessName: string;
}

const NotesTabContent = ({ team, businessName }: NotesTabContentProps) => {
  const [note, setNote] = useState("");
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [refreshAttachments, setRefreshAttachments] = useState(0);

  const handleSaveNote = async () => {
    if (!note.trim()) return;
    
    try {
      setIsSavingNote(true);
      
      const { data, error } = await supabase
        .from('frituur_attachments')
        .insert({
          team,
          business_name: businessName,
          note,
          attachment_type: 'note',
        })
        .select()
        .single();
        
      if (error) {
        console.error("Error saving note:", error);
        toast.error("Failed to save note");
        return;
      }
      
      toast.success("Note saved successfully");
      setNote("");
      setShowNoteEditor(false);
      setRefreshAttachments(prev => prev + 1);
    } catch (error) {
      console.error("Error in handleSaveNote:", error);
      toast.error("An error occurred while saving the note");
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleFileUploadComplete = () => {
    setRefreshAttachments(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      {!showNoteEditor && (
        <Button
          onClick={() => setShowNoteEditor(true)}
          className="mb-4"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Note
        </Button>
      )}
      
      {showNoteEditor && (
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Add Note</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowNoteEditor(false);
                setNote("");
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your note here..."
            className="min-h-[120px] mb-3"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveNote}
              disabled={!note.trim() || isSavingNote}
            >
              {isSavingNote ? (
                <>
                  <span className="animate-spin mr-2">◌</span>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Note
                </>
              )}
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-6">
        <FileUploader
          team={team}
          businessName={businessName}
          fileType="photo"
          onUploadComplete={handleFileUploadComplete}
        >
          <Button variant="outline">
            <Camera className="h-4 w-4 mr-2" />
            Add Photo
          </Button>
        </FileUploader>
        
        <FileUploader
          team={team}
          businessName={businessName}
          fileType="voice"
          onUploadComplete={handleFileUploadComplete}
        >
          <Button variant="outline">
            <Mic className="h-4 w-4 mr-2" />
            Voice Memo
          </Button>
        </FileUploader>
        
        <FileUploader
          team={team}
          businessName={businessName}
          fileType="document"
          onUploadComplete={handleFileUploadComplete}
        >
          <Button variant="outline">
            <File className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </FileUploader>
      </div>
      
      <FrituurAttachmentsList 
        key={refreshAttachments}
        team={team} 
        businessName={businessName} 
      />
    </div>
  );
};

export default NotesTabContent;
