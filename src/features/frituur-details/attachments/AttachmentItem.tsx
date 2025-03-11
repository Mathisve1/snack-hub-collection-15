
import { Button } from "@/components/ui/button";
import { Trash2, Download, File, Image, Mic, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { FrituurAttachment } from "./types";

interface AttachmentItemProps {
  attachment: FrituurAttachment;
  onDelete: (id: string) => Promise<void>;
}

const AttachmentItem = ({ attachment, onDelete }: AttachmentItemProps) => {
  const getAttachmentIcon = (type: string | null) => {
    switch (type) {
      case 'photo':
        return <Image className="h-5 w-5 text-blue-500" />;
      case 'voice':
        return <Mic className="h-5 w-5 text-orange-500" />;
      case 'document':
        return <File className="h-5 w-5 text-green-500" />;
      case 'note':
        return <FileText className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between">
        <div className="flex items-start gap-3">
          {getAttachmentIcon(attachment.attachment_type)}
          
          <div className="flex-1">
            {attachment.note && (
              <p className="text-gray-700 whitespace-pre-wrap">{attachment.note}</p>
            )}
            
            {attachment.attachment_url && (
              <div className="mt-2">
                {attachment.attachment_type === 'photo' ? (
                  <img 
                    src={attachment.attachment_url} 
                    alt={attachment.attachment_name || "Photo"} 
                    className="rounded-md max-h-64 object-contain"
                  />
                ) : (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-medium truncate">
                      {attachment.attachment_name || "Attachment"}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      asChild
                    >
                      <a 
                        href={attachment.attachment_url} 
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-2">
              {formatDistanceToNow(new Date(attachment.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(attachment.id)}
          title="Delete"
        >
          <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default AttachmentItem;
