// Central place for colours, spacing, font sizes and course options,
// so the whole app looks consistent and is easy to change in one spot.

export const COLORS = {
  primary: '#2F3E46',
  primaryLight: '#E8EDF0',
  background: '#F5F7F8',
  card: '#FFFFFF',
  border: '#C9D1D5',
  text: '#1F2A30',
  textMuted: '#5F6C73',
  placeholder: '#8A969C',
  white: '#FFFFFF',
  error: '#B3261E',
  errorBackground: '#FDECEA',
  success: '#2E6B3A',
  successBackground: '#E6F4EA',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const FONT_SIZE = {
  small: 14,
  body: 16,
  heading: 18,
  title: 22,
} as const;

// Minimum height for every input and button so they are easy to tap.
export const CONTROL_HEIGHT = 52;

// The three courses the chef can choose from (matches the Part 1 design).
export const COURSES = ['Starter', 'Main Course', 'Dessert'] as const;

// Badge colours for each course so the chef can scan the list quickly.
export const COURSE_COLORS: Record<(typeof COURSES)[number], { background: string; text: string }> = {
  Starter: { background: '#E3F1E6', text: '#2E6B3A' },
  'Main Course': { background: '#E4ECF5', text: '#274C77' },
  Dessert: { background: '#F8E8EE', text: '#8A3355' },
};
