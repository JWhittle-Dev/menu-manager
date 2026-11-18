import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../constants/theme';

interface BannerProps {
  type: 'success' | 'error';
  text: string;
}

// Coloured message bar used for success confirmations and form error summaries.
export default function Banner({ type, text }: BannerProps) {
  const isSuccess = type === 'success';
  const color = isSuccess ? COLORS.success : COLORS.error;
  return (
    <View
      style={[
        styles.banner,
        { backgroundColor: isSuccess ? COLORS.successBackground : COLORS.errorBackground, borderColor: color },
      ]}
      accessibilityLiveRegion="polite"
    >
      <Text style={[styles.text, { color }]}>{(isSuccess ? '✓  ' : '!  ') + text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderWidth: 1,
    borderRadius: 8,
    padding: SPACING.md,
  },
  text: {
    fontSize: FONT_SIZE.body,
    fontWeight: 'bold',
  },
});
