import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { usePatients } from '../hooks/usePatients';
import { useNotes } from '../hooks/useNotes';
import { Note, Patient } from '../types';
import { PatientForm } from '../components/PatientForm';
import { NoteForm } from '../components/NoteForm';

export const PatientDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updatePatient } = usePatients();
  const { addNote, deleteNote } = useNotes(id);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Patient | null>(null);

  const { data: patient, isLoading: loadingPatient } = useQuery<Patient>({
    queryKey: ['patient', id],
    queryFn: () => fetch(`/api/patients/${id}`).then(res => res.json()),
    enabled: !!id,
  });
  const { data: notes, isLoading: loadingNotes } = useQuery<Note[]>({
    queryKey: ['notes', id],
    queryFn: () => fetch(`/api/patients/${id}/notes`).then(res => res.json()),
    enabled: !!id,
  });

  if (loadingPatient || loadingNotes) return <p className="text-center text-gray-500">Loading...</p>;
  if (!patient) return <p className="text-center text-gray-500">Patient not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {!editMode ? (
        <>
          <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
          <p className="text-gray-600">Age: {patient.age}</p>
          <p className="text-gray-600">Condition: {patient.condition}</p>
          <button
            onClick={() => {
              setEditMode(true);
              setFormData(patient);
            }}
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Patient</h3>
          <PatientForm
            initialData={{
              name: formData?.name || '',
              age: formData?.age || 0,
              condition: formData?.condition || '',
            }}
            onSubmit={(updated) => {
              if (formData && id) {
                updatePatient.mutate({ ...updated, id });
                setEditMode(false);
              }
            }}
            submitLabel="Save Changes"
          />
          <button
            onClick={() => setEditMode(false)}
            className="mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </>
      )}

      <hr className="my-6" />

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Coaching Notes</h3>
        {notes && notes.length > 0 ? (
          <ul className="space-y-4">
            {notes.map((note) => (
              <li
                key={note.id}
                className="p-4 bg-gray-100 rounded-md flex flex-col gap-2"
              >
                <p className="text-gray-700">{note.text}</p>
                <small className="text-gray-500">
                  {new Date(note.date).toLocaleDateString()}
                </small>
                <button
                  onClick={() => deleteNote.mutate(note.id)}
                  className="self-start text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notes yet.</p>
        )}
      </div>

      <hr className="my-6" />

      <NoteForm
        onSubmit={(text) => {
          addNote.mutate(text);
        }}
      />

      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate('/patients')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md"
        >
          Back to Patients
        </button>
      </div>
    </div>
  );
};
