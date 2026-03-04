import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useState } from "react";
import { deletePin, updatePin } from "../../lib/api";

interface PinCardProps {
  pin: { _id: string; targetType: string; targetId: string; notes: string };
  name: string;
  onDelete: (id: string) => void;
}

export function PinCard({ pin, name, onDelete }: PinCardProps) {
  const [notes, setNotes] = useState(pin.notes || "");
  const [editing, setEditing] = useState(false);
  const pinTypeLabel = pin.targetType.replace(/-/g, " ");

  const saveNotes = async () => {
    await updatePin(pin._id, notes);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!confirm(`Remove "${name}" from your pins?`)) return;
    await deletePin(pin._id);
    onDelete(pin._id);
  };

  return (
    <Card className="gap-3.5 border-[#ebd2b7] bg-white/88 py-3.5 shadow-[0_8px_22px_rgba(67,40,17,0.08)] sm:gap-4 sm:py-4">
      <CardContent className="space-y-2.5 px-3.5 sm:space-y-3 sm:px-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[15px] font-semibold text-foreground sm:text-base">{name}</h3>
          <Badge variant="outline" className="rounded-full border-[#e7cfb5] bg-[#fff3e3] px-2 text-[9px] uppercase tracking-[0.14em] text-[#876f57] sm:px-2.5 sm:text-[10px]">
            {pinTypeLabel}
          </Badge>
        </div>

        {editing ? (
          <div className="space-y-2.5">
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              className="w-full rounded-xl border border-[#e4cab0] bg-white px-3 py-2 text-[13px] outline-none transition-colors duration-200 ease-out focus:border-ring sm:text-sm"
            />
            <div className="flex flex-wrap gap-2">
              <Button onClick={saveNotes} size="sm" className="h-8 rounded-full px-3 text-[11px] sm:h-9 sm:text-sm">
                Save
              </Button>
              <Button onClick={() => setEditing(false)} variant="outline" size="sm" className="h-8 rounded-full px-3 text-[11px] sm:h-9 sm:text-sm">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-[13px] text-muted-foreground sm:text-sm">
            {notes || <span className="italic">No notes yet. Add context for your future self.</span>}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setEditing(true)} size="sm" variant="outline" className="h-8 rounded-full px-3 text-[11px] sm:h-9 sm:text-sm">
            Edit notes
          </Button>
          <Button
            onClick={handleDelete}
            size="sm"
            variant="ghost"
            className="h-8 rounded-full px-3 text-[11px] text-destructive hover:text-destructive sm:h-9 sm:text-sm"
          >
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
