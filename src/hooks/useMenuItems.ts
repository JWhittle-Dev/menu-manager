import { useCallback, useRef, useState } from 'react';
import { MenuItem, MenuItemInput } from '../types';

// Holds the menu and the add / update / delete logic, so App.tsx only deals with screens.
export function useMenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const nextId = useRef(1);

  // ADD: newest item goes to the top so the chef sees it straight away.
  const addItem = useCallback((data: MenuItemInput) => {
    const id = String(nextId.current++);
    setMenuItems((current) => [{ id, ...data }, ...current]);
  }, []);

  // UPDATE: replace the fields on the matching item, keeping its id and its place in the list.
  const updateItem = useCallback((id: string, data: MenuItemInput) => {
    setMenuItems((current) => current.map((item) => (item.id === id ? { ...item, ...data } : item)));
  }, []);

  // DELETE: removes the item; the list re-renders straight away.
  const deleteItem = useCallback((id: string) => {
    setMenuItems((current) => current.filter((item) => item.id !== id));
  }, []);

  return { menuItems, addItem, updateItem, deleteItem };
}
