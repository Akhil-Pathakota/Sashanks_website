export interface Qualification {
  id: string;
  degree: string;
  field: string;
  institute: string;
  university?: string;
  year: string;
  details?: string;
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  place: string;
  location?: string;
  details?: string;
}

export interface AcademicPresentation {
  id: string;
  type: 'Poster Presentation' | 'Paper Presentation' | 'Dissertation' | 'Award';
  title: string;
  topic: string;
  forum: string;
  year: string;
  details?: string;
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  coAuthors?: string;
  year: string;
  details?: string;
}

export interface InterventionalSkill {
  id: string;
  name: string;
  description: string;
  category: 'Diagnostic' | 'Therapeutic' | 'Advanced';
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  date: string;
  slot: 'morning' | 'evening';
  time: string; // specific time in that slot
  serviceId: string;
  status: 'booked' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}
