export interface Doctor {
  uid: string;
  name: string;
  specialization: string;
  location: string;
  consultationType: 'Online' | 'Physical' | 'Both';
  experience: string;
  rating: number;
  available: boolean;
  profilePicUrl?: string;
  bio: string;
  availableSlots: string[];
  createdAt: any;
}

export interface Patient {
  uid: string;
  name: string;
  email: string;
  phone: string;
  createdAt: any;
}

export interface Appointment {
  appointmentId: string;
  doctorId: string;
  patientId: string;
  doctorName: string;
  patientName: string;
  specialization: string;
  timeSlot: string;
  date: string;
  type: 'Online' | 'Physical';
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: any;
}

export interface Message {
  sender: 'patient' | 'doctor' | 'ai-agent';
  text: string;
  timestamp: any;
  isAI: boolean;
}

export interface Chat {
  chatId: string;
  doctorId: string;
  patientId: string;
  messages: Message[];
}
