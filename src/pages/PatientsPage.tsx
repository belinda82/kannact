import { usePatients } from '../hooks/usePatients';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { PatientForm } from '../components/PatientForm';
import { Modal } from '../components/Modal';

export const PatientsPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, addPatient, deletePatient } = usePatients();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPatients = data?.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.condition.toLowerCase().includes(query) ||
      p.age.toString().includes(query)
    );
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Patients</h1>

      <div className="mb-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, age, or condition"
        />
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-4">
          {filteredPatients?.map(p => (
            <li 
              key={p.id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm flex flex-col gap-2"
            >
              <p className="text-lg font-semibold">
                {p.name} ({p.age}) — <span className="text-gray-600">{p.condition}</span>
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => navigate(`/patients/${parseInt(p.id)}`)}
                >
                  View Details
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => deletePatient.mutate(p)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center mt-10">
        <button
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Patient
        </button>
      </div>

      <Modal title="Add New Patient" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PatientForm
          onSubmit={(newPatient) => {
            addPatient.mutate(newPatient);
            setIsModalOpen(false);
          }}
          submitLabel="Add Patient"
        />
      </Modal>
    </div>
  );
};
