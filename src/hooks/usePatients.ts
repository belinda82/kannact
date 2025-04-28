import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Patient } from '../types';

export const usePatients = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn: () => fetch('/api/patients').then(res => res.json()),
  });

  const addPatient = useMutation({
    mutationFn: (patient: Omit<Patient, 'id'>) =>
      fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });

  const deletePatient = useMutation({
    mutationFn: (patient: Patient) =>
      fetch(`/api/patients/${patient.id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });

  const updatePatient = useMutation({
    mutationFn: (patient: Patient) =>
      fetch(`/api/patients/${patient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient),
      }),
    onSuccess: async (response: Response) => {
      const updatedPatient: Patient = await response.json();
      queryClient.setQueryData(['patient', updatedPatient.id], updatedPatient);
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });

  return { data, isLoading, addPatient, deletePatient, updatePatient };
};
