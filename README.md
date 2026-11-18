# Menu Manager – Part 3

A React Native (Expo, TypeScript) app that lets the chef **add**, **view**, **edit** and **delete** menu items, see **menu statistics**, and filter the menu by course.

**Version history**

| Version | What was added |
|---|---|
| v1 | Add menu items, view them in a list, validation, confirmation message |
| v2 | **Requirement 1 – Manage Menu Items:** edit, update and delete existing items |
| v3 | **Requirement 3 – Display Menu Statistics:** overview card with total items, average price and items per course |
| v4 | **Requirements 4 & 5 – Enhancements and User Experience:** TypeScript, reusable components, custom hooks, stronger validation, course filter, discard-changes warning, consistent buttons and messages |

## How to run

1. Create a fresh Expo project with the TypeScript template:
   ```
   npx create-expo-app@latest MenuManager --template blank-typescript
   cd MenuManager
   ```
2. Install the dropdown (Picker) component:
   ```
   npx expo install @react-native-picker/picker
   ```
3. Copy `App.tsx` and the whole `src` folder from this project into the new one (replace the default `App.tsx`).
4. Start the app:
   ```
   npx expo start
   ```
   Press `a` for an Android emulator, or scan the QR code with the Expo Go app on an Android phone.

## Project structure

```
App.tsx                         Screen switching and wiring: connects the hooks to the two screens
src/
  screens/
    MenuListScreen.tsx          Title, success banner, statistics, course filter, FlatList, "+" button, delete confirmation
    MenuItemFormScreen.tsx      Shared form for adding AND editing, with live validation and discard warning
  components/                   Small reusable building blocks
    Header.tsx                  Dark title bar (with back arrow on the form)
    Button.tsx                  One button (primary / secondary / danger) used for Save, Cancel, Edit, Delete
    Banner.tsx                  Green success / red error message bar
    CourseBadge.tsx             Coloured course pill used on cards and in the statistics
    CourseFilter.tsx            "All / Starter / Main Course / Dessert" chips
    MenuItemCard.tsx            One item in the list
    MenuStatistics.tsx          "Menu Overview" card
    FormField.tsx               Label + input + character counter + error message
  hooks/
    useMenuItems.ts             Holds the menu and the add / update / delete logic
    useNotice.ts                Shows a message and hides it automatically
  utils/
    validation.ts               Validation rules, price-input cleaning, duplicate check
    stats.ts                    Total items, average price, items per course
    format.ts                   formatPrice (R120.00) and formatItemCount
  constants/theme.ts            Colours, spacing, font sizes, course options
  types/index.ts                Shared TypeScript types (MenuItem, FormValues, Notice, ...)
```

## Requirement 4 – Enhancements since Part 2

| Area | Improvement | Where |
|---|---|---|
| Layout and appearance | Statistics card, course badges, filter chips, consistent cards, spacing and 52 px controls from one theme file | `MenuStatistics.tsx`, `CourseFilter.tsx`, `theme.ts` |
| Reusable components | `Button`, `Banner`, `CourseBadge` replace duplicated styled code in the cards, form and list | `src/components/` |
| Reusable functions | `formatPrice`, `formatItemCount`, `calculateMenuStats`, `sanitizePriceInput`, `validateMenuItem` | `src/utils/` |
| Code organisation | Logic moved out of `App` into `useMenuItems` and `useNotice` hooks; screens, components, hooks, utils, constants and types are separate folders | `src/hooks/`, `src/types/` |
| Meaningful names | Descriptive names such as `handleSaveItem`, `confirmDelete`, `courseCounts`, `validateField`; every file starts with a comment explaining its purpose | whole project |
| Type safety | Strict TypeScript catches wrong props and missing fields before the app runs | all `.ts` / `.tsx` files |
| Validation and feedback | Length limits, price maximum (R10 000), only digits and one decimal point in Price, duplicate dish in the same course is rejected, errors clear as soon as the field is edited, fields are checked when the chef leaves them | `validation.ts`, `MenuItemFormScreen.tsx` |

## Requirement 5 – User experience

| Requirement | How it is met |
|---|---|
| Easy to use | One obvious "+" button; Edit and Delete sit on each card; Next key on the keyboard moves from Dish Name to Description; the keyboard no longer hides the Save button; numeric keypad for Price |
| Clear navigation | Header back arrow, Cancel button and the Android back button all return to the list; a "Discard changes?" prompt appears only if something was typed |
| Meaningful success messages | Green banner: `"Bobotie" was added to the menu.` / `was updated.` / `was deleted from the menu.` |
| Meaningful error messages | Red message under each invalid field (e.g. `Please enter a valid price greater than 0.`), red border, plus a summary banner at the top |
| Input validation | Required fields, length limits, price range, duplicate check (see above) |
| Consistent look and feel | Same header, colours, buttons, badges and spacing on both screens, all coming from `theme.ts` and the shared components |
| Helpful empty states | "No menu items yet" and "Nothing in Dessert" messages tell the chef what to do next |

## Requirement 1 & 3 summary

| Requirement | Where |
|---|---|
| Edit / update an item | **Edit** opens `MenuItemFormScreen` pre-filled; **Save Changes** calls `updateItem` and keeps the item's position |
| Delete an item | **Delete** shows a confirmation dialog; on confirm `deleteItem` removes it |
| Changes shown immediately | All changes go through `useMenuItems` state, so the list and statistics re-render at once |
| Total number of menu items | "Total items" tile in the Menu Overview |
| Average price | "Average price" tile (`calculateMenuStats`) |
| Items per course | "Items per course" rows for Starter, Main Course and Dessert (0 when empty) |

## Manual test checklist

- [ ] Open the app – the empty-state message shows and no statistics card is visible.
- [ ] Tap **+**, then **Save** with nothing filled in – four error messages and a summary banner appear.
- [ ] Type letters in Price – they are ignored. Enter `0` – "valid price greater than 0". Enter `20000` – "R10000 or less".
- [ ] Type one letter in Dish Name and tap away – the "at least 2 characters" error appears immediately; typing again clears it.
- [ ] Fill in everything and tap **Save** – you return to the list, the item appears and the green confirmation shows.
- [ ] Add the same dish name in the same course again – "already on the menu" error. Same name in another course is accepted.
- [ ] Add a Starter (R50), Main Course (R150) and another Main Course (R100) – the Menu Overview shows 3 total items, average R100.00, Starter 1, Main Course 2, Dessert 0.
- [ ] Tap the **Main Course** filter – only two items show and the count reads "Showing 2 of 3 menu items (Main Course)". Tap **Dessert** – "Nothing in Dessert". Tap **All** – everything returns.
- [ ] Tap **Edit**, change the price – list and statistics update at once, in the same position, with an "updated" confirmation.
- [ ] Tap **Edit**, change something, then tap **Cancel** / back arrow / phone back button – "Discard changes?" appears. **Keep editing** stays; **Discard** returns with the item unchanged.
- [ ] Open the form and go back without typing – it closes with no prompt.
- [ ] Tap **Delete** then **Cancel** – the item stays. Tap **Delete** then **Delete** – it disappears, statistics update and a "deleted" message shows.
- [ ] Delete the last remaining item – the empty-state message returns.

## Notes

- Data is stored in memory only, so it resets when the app is closed. Saving data permanently is not required for this part.
