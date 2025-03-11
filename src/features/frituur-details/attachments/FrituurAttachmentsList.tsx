
import { useAttachments } from "./useAttachments";
import AttachmentItem from "./AttachmentItem";
import AttachmentsLoadingState from "./AttachmentsLoadingState";
import EmptyAttachmentsState from "./EmptyAttachmentsState";

interface FrituurAttachmentsListProps {
  team: string;
  businessName: string;
}

const FrituurAttachmentsList = ({ team, businessName }: FrituurAttachmentsListProps) => {
  const { attachments, loading, deleteAttachment } = useAttachments(team, businessName);

  if (loading) {
    return <AttachmentsLoadingState />;
  }

  if (attachments.length === 0) {
    return <EmptyAttachmentsState />;
  }

  return (
    <div className="space-y-4">
      {attachments.map((attachment) => (
        <AttachmentItem 
          key={attachment.id} 
          attachment={attachment} 
          onDelete={deleteAttachment}
        />
      ))}
    </div>
  );
};

export default FrituurAttachmentsList;
