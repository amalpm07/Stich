export interface Appointment {
  id: string;
  date: string;
  time: string;
  serviceType: string;
  status: string;
}

export async function createAppointment(data: Partial<Appointment>): Promise<Appointment> {
  // Implement appointment creation logic
  return { id: 'mock', date: '', time: '', serviceType: '', status: 'pending', ...data };
}

export async function getAppointment(id: string): Promise<Appointment> {
  // Implement fetch logic
  return { id, date: '', time: '', serviceType: '', status: 'pending' };
}

export async function updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment> {
  // Implement update logic
  return { id, date: '', time: '', serviceType: '', status: 'pending', ...data };
}

export async function deleteAppointment(id: string): Promise<void> {
  // Implement delete logic
}

export async function uploadPhoto(appointmentId: string, photoUri: string): Promise<string> {
  // Implement photo upload logic
  return 'photo-url';
} 