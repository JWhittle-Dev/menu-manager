import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, CONTROL_HEIGHT, FONT_SIZE } from '../constants/theme';

type Variant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  compact?: boolean; // slightly shorter button used inside cards
}

// One button used everywhere (Save, Cancel, Edit, Delete) so they all look and behave the same.
export default function Button({
  label,
  onPress,
  variant = 'primary',
  accessibilityLabel,
  style,
  compact = false,
}: ButtonProps) {
  const v = VARIANTS[variant];
  return (
    <TouchableOpacity
      style={[
        styles.button,
        compact && styles.compact,
        { backgroundColor: v.background, borderColor: v.border },
        style,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
    >
      <Text style={[styles.label, { color: v.text }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const VARIANTS: Record<Variant, { background: string; border: string; text: string }> = {
  primary: { background: COLORS.primary, border: COLORS.primary, text: COLORS.white },
  secondary: { background: COLORS.card, border: COLORS.primary, text: COLORS.primary },
  danger: { background: COLORS.errorBackground, border: COLORS.error, text: COLORS.error },
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minHeight: CONTROL_HEIGHT,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compact: {
    minHeight: 48,
  },
  label: {
    fontSize: FONT_SIZE.body,
    fontWeight: 'bold',
  },
});
