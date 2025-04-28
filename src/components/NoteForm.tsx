import { useState } from 'react';

interface NoteFormProps {
  onSubmit: (text: string) => void;
}

export function NoteForm({ onSubmit }: NoteFormProps) {
  const [noteText, setNoteText] = useState('');

  const handleSubmit = () => {
    if (noteText.trim()) {
      onSubmit(noteText.trim());
      setNoteText('');
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800">Add Note</h4>
      <textarea
        rows={4}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write a coaching note..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        Add Note
      </button>
    </div>
  );
}
