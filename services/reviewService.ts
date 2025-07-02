import { supabase } from '../clients/supabase';

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  helpfulCount?: number;
}

export interface Testimonial {
  id: string;
  rating: number;
  user: string;
  date: string;
  comment: string;
}

export async function getReviews(itemId: string): Promise<Review[]> {
  // Implement review fetch logic
  return [];
}

export async function submitReview(review: Review): Promise<Review> {
  // Implement review submission logic
  return review;
}

export async function markReviewHelpful(id: string): Promise<void> {
  // Implement helpful vote logic
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
} 