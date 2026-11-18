import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CourseBadge from './CourseBadge';
import { COLORS, COURSES, FONT_SIZE, SPACING } from '../constants/theme';
import { MenuItem } from '../types';
import { formatPrice } from '../utils/format';
import { calculateMenuStats } from '../utils/stats';

interface MenuStatisticsProps {
  menuItems: MenuItem[];
}

// Summary card at the top of the menu list: total items, average price
// and the number of items in each course.
export default function MenuStatistics({ menuItems }: MenuStatisticsProps) {
  const { totalItems, averagePrice, courseCounts } = calculateMenuStats(menuItems);

  return (
    <View style={styles.card} accessibilityLabel="Menu statistics">
      <Text style={styles.heading} accessibilityRole="header">
        Menu Overview
      </Text>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryBox, styles.summaryBoxGap]}>
          <Text style={styles.summaryValue}>{totalItems}</Text>
          <Text style={styles.summaryLabel}>Total items</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryValue}>{formatPrice(averagePrice)}</Text>
          <Text style={styles.summaryLabel}>Average price</Text>
        </View>
      </View>

      <Text style={styles.subheading}>Items per course</Text>
      {COURSES.map((course) => (
        <View key={course} style={styles.courseRow}>
          <CourseBadge course={course} />
          <Text style={styles.courseCount}>{courseCounts[course]}</Text>
        </View>
      ))}
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
  heading: {
    fontSize: FONT_SIZE.heading,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
  },
  summaryBoxGap: {
    marginRight: SPACING.sm,
  },
  summaryValue: {
    fontSize: FONT_SIZE.title,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  summaryLabel: {
    fontSize: FONT_SIZE.small,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
  subheading: {
    fontSize: FONT_SIZE.body,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  courseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  courseCount: {
    fontSize: FONT_SIZE.heading,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});
