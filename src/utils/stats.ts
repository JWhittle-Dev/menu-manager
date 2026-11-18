import { COURSES } from '../constants/theme';
import { Course, MenuItem, MenuStats } from '../types';

// Works out the overview numbers shown to the chef from the current list of menu items.
export function calculateMenuStats(menuItems: MenuItem[]): MenuStats {
  const totalItems = menuItems.length;
  const totalPrice = menuItems.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = totalItems > 0 ? totalPrice / totalItems : 0;

  // Start every course at 0 so a course with no dishes is still listed.
  const courseCounts = Object.fromEntries(COURSES.map((course) => [course, 0])) as Record<Course, number>;
  menuItems.forEach((item) => {
    courseCounts[item.course] += 1;
  });

  return { totalItems, averagePrice, courseCounts };
}
