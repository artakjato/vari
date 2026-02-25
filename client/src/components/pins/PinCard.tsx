import { useState } from 'react';
import { updatePin, deletePin } from '../../lib/api';

interface PinCardProps {
  pin: { _id: string; targetType: string; targetId: string; notes: string };
  name: string;      // resolved from targetId
  onDelete: (id: string) => void;
}

export function PinCard({ pin, name, onDelete }: PinCardProps) {
  const [notes, setNotes] = useState(pin.notes || '');
  const [editing, setEditing] = useState(false);

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
    <div style={{ padding: 16, background: 'var(--bg-surface)',
      borderRadius: 12, border: '1px solid var(--border-subtle)', marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontFamily: 'Outfit', margin: 0 }}>{name}</h3>
        <span style={{ fontSize: 11, color: 'var(--text-secondary)',
          background: 'var(--bg-canvas)', padding: '2px 8px', borderRadius: 99 }}>
          {pin.targetType}
        </span>
      </div>
      {editing ? (
        <>
          <textarea value={notes} onChange={e => setNotes(e.target.value)}
            style={{ width: '100%', marginTop: 8, padding: 8, borderRadius: 8,
              border: '1px solid var(--border-subtle)', fontFamily: 'Inter', fontSize: 13 }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button onClick={saveNotes}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: '8px 0 0' }}>
          {notes || <em>No notes yet. Click Edit to add some.</em>}
        </p>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button onClick={() => setEditing(true)}>Edit notes</button>
        <button onClick={handleDelete} style={{ color: 'var(--error)' }}>Remove</button>
      </div>
    </div>
  );
}