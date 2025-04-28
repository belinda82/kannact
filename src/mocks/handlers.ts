import { http, HttpResponse, delay } from 'msw';
import { Patient, Note } from '../types';

let patients: Patient[] = [
  { id: '1', name: 'John Doe', age: 54, condition: 'Diabetes' },
  { id: '2', name: 'Jane Smith', age: 62, condition: 'Hypertension' },
];

let notes: Note[] = [
  { id: '1', patientId: '1', text: 'First coaching note', date: '2024-04-01' },
];

export const handlers = [
  // Get all patients
  http.get('/api/patients', async () => {
    await delay(500)
    return HttpResponse.json(patients, { status: 200 });
  }),

  // Add new patient
  http.post('/api/patients', async({ request }) => {
    const newPatient = await request.json() as Omit<Patient, 'id'>;
    const patient: Patient = { ...newPatient, id: Date.now().toString() };
    patients.push(patient);
    await delay(500)
    return HttpResponse.json(patient, { status: 201});
  }),

  // Edit patient
  http.put('/api/patients/:id', async({ request, params }) => {
    const { id } = params;
    const updatedData = await request.json() as Partial<Patient>;
    patients = patients.map(p => p.id === id ? { ...p, ...updatedData } : p);
    const updatedPatient = patients.find((p) => p.id === id);
    await delay(500)
    return HttpResponse.json(updatedPatient, { status: 200 });
  }),

  // Delete patient
  http.delete('/api/patients/:id', async({ params }) => {
    const { id } = params;
    patients = patients.filter(p => p.id !== id);
    await delay(500)
    return HttpResponse.text('Deleted', { status: 204 });
  }),

  // Get patient by ID
  http.get('/api/patients/:id', async({ params }) => {
    const { id } = params;
    const patient = patients.find(p => p.id === id);
    await delay(500)
    if (!patient) return HttpResponse.text('Not Found', { status: 404 });
    return HttpResponse.json(patient, { status: 200 });
  }),

  // Get notes for a patient
  http.get('/api/patients/:id/notes', async({ params }) => {
    const { id } = params;
    await delay(500)
    const patientNotes = notes.filter(n => n.patientId === id);
    return HttpResponse.json(patientNotes, { status: 200 });
  }),

  // Add a note
  http.post('/api/patients/:id/notes', async({ request, params }) => {
    const { id } = params;
    const patientId = Array.isArray(id) ? id[0] : id || '';
    const newNote = await request.json() as Omit<Note, 'id'>;
    const note: Note = { ...newNote, id: Date.now().toString(), patientId };
    await delay(500)
    notes.push(note);
    return HttpResponse.json(note, { status: 201 });
  }),

  // Delete a note
  http.delete('/api/notes/:id', async({ params }) => {
    const { id } = params;
    notes = notes.filter(n => n.id !== id);
    await delay(500)
    return HttpResponse.text('Note deleted', { status: 204 });
  }),
];
