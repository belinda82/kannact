export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
}

export interface Note {
  id: string;
  patientId: string;
  text: string;
  date: string;
}
