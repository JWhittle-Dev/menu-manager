import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../constants/theme';

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string; // small text beside the label, e.g. a character counter
  children: ReactNode;
}

// A label, the input passed in as `children`, and an error message underneath.
export default function FormField({ label, error, hint, children }: FormFieldProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label}
          <Text style={styles.required}> *</Text>
        </Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
      {children}
      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.md,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: FONT_SIZE.body,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  required: {
    color: COLORS.error,
  },
  hint: {
    fontSize: FONT_SIZE.small,
    color: COLORS.textMuted,
  },
  error: {
    fontSize: FONT_SIZE.small,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});
