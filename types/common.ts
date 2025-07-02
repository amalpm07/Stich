export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

export interface Address {
  id: string;
  label: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  items: string[];
  status: string;
  total: number;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  serviceType: string;
  status: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image?: string;
  rating?: number;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  image?: string;
} 