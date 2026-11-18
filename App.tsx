import React, { useCallback, useState } from 'react';
import { StatusBar } from 'react-native';
import MenuListScreen from './src/screens/MenuListScreen';
import MenuItemFormScreen from './src/screens/MenuItemFormScreen';
import { useMenuItems } from './src/hooks/useMenuItems';
import { useNotice } from './src/hooks/useNotice';
import { MenuItem, MenuItemInput } from './src/types';

type ScreenName = 'list' | 'form';

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('list');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null); // null = adding a new item
  const { menuItems, addItem, updateItem, deleteItem } = useMenuItems();
  const { notice, showNotice } = useNotice();

  const closeForm = useCallback(() => {
    setEditingItem(null);
    setScreen('list');
  }, []);

  const openAddForm = () => {
    setEditingItem(null);
    setScreen('form');
  };

  const openEditForm = (item: MenuItem) => {
    setEditingItem(item);
    setScreen('form');
  };

  // Called by the form for both adding a new item and saving edits to an existing one.
  const handleSaveItem = (data: MenuItemInput) => {
    if (editingItem) {
      updateItem(editingItem.id, data);
      showNotice(`"${data.dishName}" was updated.`);
    } else {
      addItem(data);
      showNotice(`"${data.dishName}" was added to the menu.`);
    }
    closeForm();
  };

  const handleDeleteItem = (item: MenuItem) => {
    deleteItem(item.id);
    showNotice(`"${item.dishName}" was deleted from the menu.`);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      {screen === 'list' ? (
        <MenuListScreen
          menuItems={menuItems}
          notice={notice}
          onAddPress={openAddForm}
          onEditPress={openEditForm}
          onDeleteItem={handleDeleteItem}
        />
      ) : (
        <MenuItemFormScreen
          item={editingItem}
          existingItems={menuItems}
          onSave={handleSaveItem}
          onCancel={closeForm}
        />
      )}
    </>
  );
}
