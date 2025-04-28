import { useState, useEffect } from 'react';
import { Patient } from '../types';

interface PatientFormProps {
  initialData?: Omit<Patient, 'id'>;
  onSubmit: (data: Omit<Patient, 'id'>) => void;
  submitLabel?: string;
}

export function PatientForm({
  initialData = { name: '', age: 0, condition: '' },
  onSubmit,
  submitLabel = 'Save',
}: PatientFormProps) {
  const [formData, setFormData] = useState<Omit<Patient, 'id'>>(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData?.name, initialData?.age, initialData?.condition]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="condition"
        value={formData.condition}
        onChange={handleChange}
        placeholder="Condition"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
}
