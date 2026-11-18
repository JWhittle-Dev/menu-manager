import { COURSES } from '../constants/theme';

// One of the three courses the chef can choose from.
export type Course = (typeof COURSES)[number];

// A menu item as stored in the app.
export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: Course;
  price: number;
}

// The data the form hands back when it is saved (the app adds the id).
export type MenuItemInput = Omit<MenuItem, 'id'>;

// What the form fields hold while the chef is typing (everything is text until validated).
export interface FormValues {
  dishName: string;
  description: string;
  course: Course | '';
  price: string;
}

export type FormErrors = Partial<Record<keyof FormValues, string>>;

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

// A short message shown at the top of the list screen.
export interface Notice {
  id: number;
  text: string;
  type: 'success' | 'error';
}

export interface MenuStats {
  totalItems: number;
  averagePrice: number;
  courseCounts: Record<Course, number>;
}
