import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Banner from '../components/Banner';
import CourseFilter, { CourseFilterValue } from '../components/CourseFilter';
import Header from '../components/Header';
import MenuItemCard from '../components/MenuItemCard';
import MenuStatistics from '../components/MenuStatistics';
import { COLORS, FONT_SIZE, SPACING } from '../constants/theme';
import { MenuItem, Notice } from '../types';
import { formatItemCount } from '../utils/format';

interface MenuListScreenProps {
  menuItems: MenuItem[];
  notice: Notice | null;
  onAddPress: () => void;
  onEditPress: (item: MenuItem) => void;
  onDeleteItem: (item: MenuItem) => void;
}

// Home screen: shows every menu item and lets the chef add, edit or delete them.
export default function MenuListScreen({
  menuItems,
  notice,
  onAddPress,
  onEditPress,
  onDeleteItem,
}: MenuListScreenProps) {
  const [courseFilter, setCourseFilter] = useState<CourseFilterValue>('All');

  const total = menuItems.length;
  const visibleItems =
    courseFilter === 'All' ? menuItems : menuItems.filter((item) => item.course === courseFilter);

  // Asks the chef to confirm before a dish is removed, so it cannot happen by accident.
  const confirmDelete = (item: MenuItem) => {
    Alert.alert(
      'Delete menu item?',
      `"${item.dishName}" will be removed from the menu. This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDeleteItem(item) },
      ],
    );
  };

  const countLabel =
    courseFilter === 'All'
      ? formatItemCount(total)
      : `Showing ${visibleItems.length} of ${formatItemCount(total)} (${courseFilter})`;

  const renderEmptyState = () =>
    total === 0 ? (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No menu items yet</Text>
        <Text style={styles.emptyText}>Tap the + button below to add your first dish.</Text>
      </View>
    ) : (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Nothing in {courseFilter}</Text>
        <Text style={styles.emptyText}>Choose another course above, or add a new dish.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Header title="Menu Manager" />

      {notice ? (
        <View style={styles.noticeWrapper}>
          <Banner type={notice.type} text={notice.text} />
        </View>
      ) : null}

      <FlatList
        data={visibleItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItemCard item={item} onEdit={onEditPress} onDelete={confirmDelete} />
        )}
        contentContainerStyle={[styles.listContent, visibleItems.length === 0 && styles.listContentEmpty]}
        ListHeaderComponent={
          total > 0 ? (
            <>
              <MenuStatistics menuItems={menuItems} />
              <CourseFilter selected={courseFilter} onSelect={setCourseFilter} />
              <Text style={styles.countText}>{countLabel}</Text>
            </>
          ) : null
        }
        ListEmptyComponent={renderEmptyState()}
      />

      <View style={styles.fabContainer} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.fab}
          onPress={onAddPress}
          accessibilityRole="button"
          accessibilityLabel="Add new menu item"
        >
          <Text style={styles.fabPlus}>+</Text>
        </TouchableOpacity>
        <Text style={styles.fabLabel}>Add New Item</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  noticeWrapper: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: 140, // keeps the last card clear of the add button
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  countText: {
    fontSize: FONT_SIZE.small,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.heading,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: FONT_SIZE.body,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  fabContainer: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.lg,
    alignItems: 'center',
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  fabPlus: {
    color: COLORS.white,
    fontSize: 36,
    lineHeight: 40,
  },
  fabLabel: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.small,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});
