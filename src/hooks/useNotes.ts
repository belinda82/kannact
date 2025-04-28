import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Note } from '../types';

export const useNotes = (patientId: string | undefined) => {
  const queryClient = useQueryClient();

  const { data: notes, isLoading } = useQuery<Note[]>({
    queryKey: ['notes', patientId],
    queryFn: () =>
      fetch(`/api/patients/${patientId}/notes`).then((res) => res.json()),
    enabled: !!patientId,
  });

  const addNote = useMutation({
    mutationFn: (text: string) =>
      fetch(`/api/patients/${patientId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, date: new Date().toISOString() }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', patientId] });
    },
  });

  const deleteNote = useMutation({
    mutationFn: (noteId: string) =>
      fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', patientId] });
    },
  });

  return {
    notes,
    isLoading,
    addNote,
    deleteNote,
  };
};
