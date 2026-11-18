import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COURSE_COLORS, FONT_SIZE, SPACING } from '../constants/theme';
import { Course } from '../types';

interface CourseBadgeProps {
  course: Course;
  style?: StyleProp<ViewStyle>;
}

// Small coloured pill showing a course name. Used on item cards and in the statistics.
export default function CourseBadge({ course, style }: CourseBadgeProps) {
  const colors = COURSE_COLORS[course];
  return (
    <View style={[styles.badge, { backgroundColor: colors.background }, style]}>
      <Text style={[styles.text, { color: colors.text }]}>{course}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 14,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm + 2,
  },
  text: {
    fontSize: FONT_SIZE.small,
    fontWeight: 'bold',
  },
});
