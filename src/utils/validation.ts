import { COURSES } from '../constants/theme';
import { FormErrors, FormValues, MenuItem, ValidationResult } from '../types';

export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 50;
export const MAX_DESCRIPTION_LENGTH = 200;
export const MAX_PRICE = 10000;

/**
 * Keeps only digits and a single decimal point (max 2 decimals) so the
 * chef cannot type letters or symbols into the price field.
 */
export function sanitizePriceInput(text: string): string {
  let cleaned = text.replace(/[^0-9.]/g, '');
  const firstDot = cleaned.indexOf('.');
  if (firstDot !== -1) {
    const whole = cleaned.slice(0, firstDot);
    const decimals = cleaned.slice(firstDot + 1).replace(/\./g, '').slice(0, 2);
    cleaned = `${whole}.${decimals}`;
  }
  return cleaned;
}

const normaliseName = (name: string): string => name.trim().replace(/\s+/g, ' ').toLowerCase();

/**
 * Checks every field and returns a friendly message for each problem found.
 * `existingItems` lets us stop the chef adding the same dish twice in one course;
 * `editingId` is the item being edited, so it is not compared with itself.
 */
export function validateMenuItem(
  { dishName, description, course, price }: FormValues,
  existingItems: MenuItem[] = [],
  editingId?: string,
): ValidationResult {
  const errors: FormErrors = {};

  const name = dishName.trim();
  if (name.length === 0) {
    errors.dishName = 'Please enter the dish name.';
  } else if (name.length < MIN_NAME_LENGTH) {
    errors.dishName = `The dish name must be at least ${MIN_NAME_LENGTH} characters.`;
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.dishName = `The dish name must be ${MAX_NAME_LENGTH} characters or fewer.`;
  }

  const desc = description.trim();
  if (desc.length === 0) {
    errors.description = 'Please enter a short description.';
  } else if (desc.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `The description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;
  }

  if (course === '' || !COURSES.includes(course)) {
    errors.course = 'Please select a course.';
  }

  const priceText = price.trim();
  const priceNumber = Number(priceText);
  if (priceText.length === 0) {
    errors.price = 'Please enter the price.';
  } else if (Number.isNaN(priceNumber) || priceNumber <= 0) {
    errors.price = 'Please enter a valid price greater than 0.';
  } else if (priceNumber > MAX_PRICE) {
    errors.price = `The price must be R${MAX_PRICE} or less.`;
  }

  // Same dish name in the same course is almost certainly a mistake.
  if (!errors.dishName && !errors.course) {
    const isDuplicate = existingItems.some(
      (item) =>
        item.id !== editingId &&
        item.course === course &&
        normaliseName(item.dishName) === normaliseName(name),
    );
    if (isDuplicate) {
      errors.dishName = `"${name}" is already on the menu under ${course}.`;
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
