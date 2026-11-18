import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, COURSES, FONT_SIZE, SPACING } from '../constants/theme';
import { Course } from '../types';

export type CourseFilterValue = Course | 'All';

interface CourseFilterProps {
  selected: CourseFilterValue;
  onSelect: (value: CourseFilterValue) => void;
}

const OPTIONS: CourseFilterValue[] = ['All', ...COURSES];

// Row of tappable chips that lets the chef show only one course at a time.
export default function CourseFilter({ selected, onSelect }: CourseFilterProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
      {OPTIONS.map((option) => {
        const isSelected = option === selected;
        return (
          <TouchableOpacity
            key={option}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(option)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={`Show ${option === 'All' ? 'all courses' : option}`}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexGrow: 0,
    marginBottom: SPACING.md,
  },
  chip: {
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.card,
    marginRight: SPACING.sm,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    fontSize: FONT_SIZE.small,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  chipTextSelected: {
    color: COLORS.white,
  },
});
