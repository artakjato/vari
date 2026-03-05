import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useEffect, useMemo, useState } from "react";
import { deletePin, updatePin } from "../../lib/api";
import type { LearningStep, Pin } from "../../lib/types";

interface PinCardProps {
  pin: Pin;
  name: string;
  roleLearningPath: LearningStep[];
  onDelete: (id: string) => void;
  onUpdate: (pin: Pin) => void;
}

export function PinCard({ pin, name, roleLearningPath, onDelete, onUpdate }: PinCardProps) {
  const [notes, setNotes] = useState(pin.notes || "");
  const [editing, setEditing] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>(pin.completedSteps ?? []);
  const [savingProgress, setSavingProgress] = useState(false);
  const pinTypeLabel = pin.targetType.replace(/-/g, " ");
  const isRolePin = pin.targetType === "role" && roleLearningPath.length > 0;

  useEffect(() => {
    setNotes(pin.notes || "");
  }, [pin._id, pin.notes]);

  useEffect(() => {
    setCompletedSteps(pin.completedSteps ?? []);
  }, [pin._id, pin.completedSteps]);

  const completionStats = useMemo(() => {
    if (!isRolePin) {
      return { completedCount: 0, totalSteps: 0, completionPercent: 0 };
    }

    const completedStepOrders = new Set(completedSteps);
    const totalSteps = roleLearningPath.length;
    const completedCount = roleLearningPath.filter((step) => completedStepOrders.has(step.order)).length;
    const completionPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

    return { completedCount, totalSteps, completionPercent };
  }, [completedSteps, isRolePin, roleLearningPath]);

  const saveNotes = async () => {
    const { data: updatedPin } = await updatePin(pin._id, { notes });
    onUpdate(updatedPin);
    setEditing(false);
  };

  const toggleStepCompletion = async (stepOrder: number) => {
    const previousSteps = completedSteps;
    const nextSteps = previousSteps.includes(stepOrder)
      ? previousSteps.filter((item) => item !== stepOrder)
      : [...previousSteps, stepOrder].sort((a, b) => a - b);

    setCompletedSteps(nextSteps);
    setSavingProgress(true);

    try {
      const { data: updatedPin } = await updatePin(pin._id, { completedSteps: nextSteps });
      setCompletedSteps(updatedPin.completedSteps ?? nextSteps);
      onUpdate(updatedPin);
    } catch {
      setCompletedSteps(previousSteps);
    } finally {
      setSavingProgress(false);
    }
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

        {isRolePin && (
          <div className="space-y-2.5 rounded-xl border border-[#ecd4bb] bg-[#fffaf3] p-2.5 sm:p-3">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-[12px] font-semibold text-[#3f2e1f] sm:text-[13px]">Learning progress</h4>
              <span className="text-[10px] text-[#8a715a] sm:text-[11px]">
                {completionStats.completedCount}/{completionStats.totalSteps} steps
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#f1dfcb]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#37b57f_0%,#2f9d6e_100%)] transition-all duration-200"
                style={{ width: `${completionStats.completionPercent}%` }}
              />
            </div>

            <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#7f6853] sm:text-[11px]">
              {completionStats.completionPercent}% complete
            </p>

            <div className="space-y-1.5">
              {roleLearningPath.map((step) => {
                const isCompleted = completedSteps.includes(step.order);

                return (
                  <button
                    key={`${pin._id}-step-${step.order}`}
                    type="button"
                    onClick={() => void toggleStepCompletion(step.order)}
                    disabled={savingProgress}
                    className={`flex w-full items-center gap-2 rounded-lg border px-2 py-1.5 text-left text-[11px] transition-colors sm:text-xs ${
                      isCompleted
                        ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                        : "border-[#e8ceb1] bg-white text-[#6f5a48] hover:border-[#d8b996]"
                    }`}
                    aria-pressed={isCompleted}
                  >
                    <span className="inline-flex min-w-[20px] justify-center rounded-full bg-white/85 px-1 text-[10px] font-semibold text-[#5f4b3b]">
                      {step.order}
                    </span>
                    <span className="truncate">{step.title}</span>
                  </button>
                );
              })}
            </div>

            {savingProgress && <p className="text-[10px] text-[#8a715a]">Saving progress...</p>}
          </div>
        )}

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
