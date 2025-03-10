
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Frituur } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Clock, Map, Phone, Mail, Globe, Instagram, Facebook, Linkedin, Mic, Camera, File, Plus, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import LoadingState from "@/features/frituren/LoadingState";
import FrituurAttachments from "@/features/frituur-details/FrituurAttachments";
import FileUploader from "@/features/frituur-details/FileUploader";

const FrituurDetails = () => {
  const { team = "", businessName = "" } = useParams<{ team: string; businessName: string }>();
  const navigate = useNavigate();
  const [frituur, setFrituur] = useState<Frituur | null>(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState("");
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [refreshAttachments, setRefreshAttachments] = useState(0);
  
  const decodedBusinessName = decodeURIComponent(businessName);
  
  useEffect(() => {
    const fetchFrituurDetails = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('frituren')
          .select('*')
          .eq('Business Name', decodedBusinessName)
          .single();
          
        if (error) {
          console.error("Error fetching frituur details:", error);
          toast.error("Could not load frituur details");
          throw error;
        }
        
        setFrituur(data as Frituur);
      } catch (error) {
        console.error("Error in fetchFrituurDetails:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (team && decodedBusinessName) {
      fetchFrituurDetails();
    }
  }, [team, decodedBusinessName]);
  
  const handleSaveNote = async () => {
    if (!note.trim()) return;
    
    try {
      setIsSavingNote(true);
      
      const { data, error } = await supabase
        .from('frituur_attachments')
        .insert({
          team,
          business_name: decodedBusinessName,
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

  if (loading) {
    return <LoadingState loading={loading} message="Loading frituur details..." />;
  }
  
  if (!frituur) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Frituur not found</h2>
        <p className="mt-2 text-gray-600">The frituur you're looking for could not be found.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate(`/frituren/${team}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to list
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(`/frituren/${team}`)}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold truncate">{frituur["Business Name"]}</h1>
          </div>
          
          {frituur.Rating && (
            <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md flex items-center">
              <span className="font-medium">{frituur.Rating}</span>
              <span className="ml-1">★</span>
            </div>
          )}
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column: Location and contact info */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-5 space-y-4">
              <h2 className="font-semibold text-lg border-b pb-2">Location & Contact</h2>
              
              {/* Address */}
              {(frituur.Straat || frituur.Gemeente) && (
                <div className="flex items-start">
                  <Map className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    {frituur.Straat && <p>{frituur.Straat}</p>}
                    <p>
                      {frituur.Gemeente}
                      {frituur.Postcode && ` - ${frituur.Postcode}`}
                    </p>
                    <p className="text-sm text-gray-500">{frituur.Provincie}</p>
                  </div>
                </div>
              )}
              
              {/* Phone number */}
              {frituur.Number && (
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a 
                      href={`tel:${frituur.Number}`}
                      className="text-primary hover:underline"
                    >
                      {frituur.Number}
                    </a>
                  </div>
                </div>
              )}
              
              {/* Email */}
              {frituur.Email && (
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href={`mailto:${frituur.Email}`}
                      className="text-primary hover:underline break-all"
                    >
                      {frituur.Email}
                    </a>
                  </div>
                </div>
              )}
              
              {/* Opening hours */}
              {frituur["Open & Close Time"] && (
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Opening Hours</p>
                    <p className="text-gray-600">{frituur["Open & Close Time"]}</p>
                  </div>
                </div>
              )}
              
              {/* Website */}
              {frituur.Website && (
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Website</p>
                    <a 
                      href={frituur.Website.startsWith('http') ? frituur.Website : `https://${frituur.Website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {frituur.Website}
                    </a>
                  </div>
                </div>
              )}
              
              {/* Social Media */}
              <div className="space-y-3">
                {frituur["Instagram link"] && (
                  <div className="flex items-start">
                    <Instagram className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Instagram</p>
                      <a 
                        href={frituur["Instagram link"]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline break-all"
                      >
                        {frituur["Instagram link"]}
                      </a>
                    </div>
                  </div>
                )}
                
                {frituur["Facebook Link"] && (
                  <div className="flex items-start">
                    <Facebook className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Facebook</p>
                      <a 
                        href={frituur["Facebook Link"]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline break-all"
                      >
                        {frituur["Facebook Link"]}
                      </a>
                    </div>
                  </div>
                )}
                
                {frituur["Linkedin Link"] && (
                  <div className="flex items-start">
                    <Linkedin className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <a 
                        href={frituur["Linkedin Link"]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline break-all"
                      >
                        {frituur["Linkedin Link"]}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right column: Notes and attachments */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-5">
              <Tabs defaultValue="attachments" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="attachments">Notes & Attachments</TabsTrigger>
                  <TabsTrigger value="info">Additional Info</TabsTrigger>
                </TabsList>
                
                <TabsContent value="attachments" className="space-y-6">
                  {/* Add note button */}
                  {!showNoteEditor && (
                    <Button
                      onClick={() => setShowNoteEditor(true)}
                      className="mb-4"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  )}
                  
                  {/* Note editor */}
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
                  
                  {/* File upload buttons */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <FileUploader
                      team={team}
                      businessName={decodedBusinessName}
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
                      businessName={decodedBusinessName}
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
                      businessName={decodedBusinessName}
                      fileType="document"
                      onUploadComplete={handleFileUploadComplete}
                    >
                      <Button variant="outline">
                        <File className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    </FileUploader>
                  </div>
                  
                  {/* List of notes and attachments */}
                  <FrituurAttachments 
                    key={refreshAttachments}
                    team={team} 
                    businessName={decodedBusinessName} 
                  />
                </TabsContent>
                
                <TabsContent value="info">
                  <div className="space-y-6">
                    {/* Category */}
                    {frituur.Category && (
                      <div>
                        <h3 className="font-medium text-gray-700 mb-1">Category</h3>
                        <p>{frituur.Category}</p>
                      </div>
                    )}
                    
                    {/* Reviews */}
                    {frituur.Review && (
                      <div>
                        <h3 className="font-medium text-gray-700 mb-1">Reviews</h3>
                        <p className="text-gray-600">{frituur.Review}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FrituurDetails;
