
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface AccessCodeModalProps {
  team: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AccessCodeModal = ({ team, isOpen, onClose, onSuccess }: AccessCodeModalProps) => {
  const [accessCode, setAccessCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accessCode || accessCode.length !== 6) {
      setError("Please enter a valid 6-digit access code");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { data, error } = await fetch("/api/verify-access-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ team, accessCode }),
      }).then(res => res.json());

      if (error) {
        throw new Error(error);
      }

      if (data?.valid) {
        // Store the successful verification in session storage
        sessionStorage.setItem(`team_access_${team}`, "verified");
        toast.success("Access granted!");
        onSuccess();
      } else {
        setAttempts(prev => prev + 1);
        setError("Invalid access code. Please try again.");
        
        if (attempts >= 2) {
          toast.error("Too many failed attempts. Please try again later.");
          onClose();
        }
      }
    } catch (err) {
      console.error("Error verifying access code:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Team Access Verification</DialogTitle>
          <DialogDescription>
            Please enter the 6-digit access code for Team {team} to continue.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex flex-col space-y-2">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="Enter 6-digit access code"
              value={accessCode}
              onChange={e => setAccessCode(e.target.value.slice(0, 6))}
              className="text-center text-lg tracking-wider"
              autoFocus
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Verify"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccessCodeModal;
