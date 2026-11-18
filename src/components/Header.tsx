import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../constants/theme';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

// Dark title bar used on every screen. Shows a back arrow when `onBack` is given.
export default function Header({ title, onBack }: HeaderProps) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity
          style={styles.sideSlot}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back to menu list"
        >
          <Text style={styles.backArrow}>{'‹'}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.sideSlot} />
      )}
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      <View style={styles.sideSlot} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingTop: (StatusBar.currentHeight || 0) + SPACING.sm,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  sideSlot: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    color: COLORS.white,
    fontSize: 36,
    lineHeight: 40,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.white,
    fontSize: FONT_SIZE.title,
    fontWeight: 'bold',
  },
});
