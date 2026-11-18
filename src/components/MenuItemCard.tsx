import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import CourseBadge from './CourseBadge';
import { COLORS, FONT_SIZE, SPACING } from '../constants/theme';
import { MenuItem } from '../types';
import { formatPrice } from '../utils/format';

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}

// One row in the menu list: dish name, price, course badge, description
// and the Edit / Delete actions for that dish.
export default function MenuItemCard({ item, onEdit, onDelete }: MenuItemCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.name}>{item.dishName}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
      <CourseBadge course={item.course} style={styles.badge} />
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.actionRow}>
        <Button
          label="Edit"
          variant="secondary"
          compact
          accessibilityLabel={`Edit ${item.dishName}`}
          onPress={() => onEdit(item)}
          style={styles.editButton}
        />
        <Button
          label="Delete"
          variant="danger"
          compact
          accessibilityLabel={`Delete ${item.dishName}`}
          onPress={() => onDelete(item)}
          style={styles.deleteButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    flex: 1,
    fontSize: FONT_SIZE.heading,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: SPACING.md,
  },
  price: {
    fontSize: FONT_SIZE.heading,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  badge: {
    marginTop: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZE.body,
    lineHeight: 22,
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  editButton: {
    marginRight: SPACING.sm,
  },
  deleteButton: {
    marginLeft: SPACING.sm,
  },
});
