import { Tag } from './tag.interface';

export interface Service {
  id: number;
  title: string;
  description: string;
  short_description: string;
  image_url: string | null;
  tags: Tag[];
  starting_price: number | null;
  duration: string;
  features: string[];
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
