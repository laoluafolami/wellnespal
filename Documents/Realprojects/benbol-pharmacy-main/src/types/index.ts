export interface Appointment {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
  status?: string;
  created_at?: string;
}

export interface PrescriptionRefill {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  prescription_number: string;
  medication_name: string;
  prescribing_doctor: string;
  additional_notes: string;
  status?: string;
  created_at?: string;
}

export interface ContactSubmission {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status?: string;
  created_at?: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  full_name: string;
  subscribed?: boolean;
  created_at?: string;
}

export interface ChatMessage {
  id?: string;
  session_id: string;
  message: string;
  sender: 'user' | 'bot';
  created_at?: string;
}
