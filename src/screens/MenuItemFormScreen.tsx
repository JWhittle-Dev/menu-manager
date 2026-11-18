import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Banner from '../components/Banner';
import Button from '../components/Button';
import FormField from '../components/FormField';
import Header from '../components/Header';
import { COLORS, CONTROL_HEIGHT, COURSES, FONT_SIZE, SPACING } from '../constants/theme';
import { FormErrors, FormValues, MenuItem, MenuItemInput } from '../types';
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_NAME_LENGTH,
  sanitizePriceInput,
  validateMenuItem,
} from '../utils/validation';

interface MenuItemFormScreenProps {
  item: MenuItem | null; // null = adding a new item
  existingItems: MenuItem[]; // used to catch duplicate dishes
  onSave: (data: MenuItemInput) => void;
  onCancel: () => void;
}

const EMPTY_VALUES: FormValues = { dishName: '', description: '', course: '', price: '' };

const valuesFromItem = (item: MenuItem | null): FormValues =>
  item
    ? {
        dishName: item.dishName,
        description: item.description,
        course: item.course,
        price: item.price.toFixed(2),
      }
    : EMPTY_VALUES;

// Form screen used for BOTH adding and editing a menu item.
// - No `item` passed in  -> blank form, "Add Menu Item".
// - `item` passed in     -> form pre-filled with that item, "Edit Menu Item".
export default function MenuItemFormScreen({
  item,
  existingItems,
  onSave,
  onCancel,
}: MenuItemFormScreenProps) {
  const isEditing = item !== null;
  const initialValues = useRef<FormValues>(valuesFromItem(item)).current;
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const descriptionRef = useRef<TextInput>(null);

  const hasErrors = Object.values(errors).some(Boolean);
  const isDirty = (Object.keys(values) as (keyof FormValues)[]).some(
    (key) => values[key] !== initialValues[key],
  );

  // Updates one field and removes its error message as soon as the chef edits it.
  const setField = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Checks a single field when the chef leaves it, so mistakes show up straight away.
  const validateField = (field: keyof FormValues) => {
    if (values[field].trim().length === 0) {
      return; // empty fields are reported when Save is pressed
    }
    const result = validateMenuItem(values, existingItems, item?.id);
    setErrors((prev) => ({ ...prev, [field]: result.errors[field] }));
  };

  // Warns before throwing away typed-in changes (Cancel, header arrow and phone back button).
  const handleCancel = () => {
    if (!isDirty) {
      onCancel();
      return;
    }
    Alert.alert('Discard changes?', 'Your changes have not been saved.', [
      { text: 'Keep editing', style: 'cancel' },
      { text: 'Discard', style: 'destructive', onPress: onCancel },
    ]);
  };

  // Android back button goes through the same discard check.
  const cancelRef = useRef(handleCancel);
  cancelRef.current = handleCancel;
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      cancelRef.current();
      return true;
    });
    return () => subscription.remove();
  }, []);

  const handleSave = () => {
    const result = validateMenuItem(values, existingItems, item?.id);
    setErrors(result.errors);
    if (!result.isValid || values.course === '') {
      return; // stay on the form so the chef can fix the highlighted fields
    }
    onSave({
      dishName: values.dishName.trim(),
      description: values.description.trim(),
      course: values.course,
      price: parseFloat(values.price),
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header title={isEditing ? 'Edit Menu Item' : 'Add Menu Item'} onBack={handleCancel} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {hasErrors ? (
          <View style={styles.summary}>
            <Banner
              type="error"
              text="Some details are missing or incorrect. Please check the fields marked below."
            />
          </View>
        ) : null}

        <FormField label="Dish Name" error={errors.dishName}>
          <TextInput
            style={[styles.input, errors.dishName && styles.inputError]}
            value={values.dishName}
            onChangeText={(text) => setField('dishName', text)}
            onBlur={() => validateField('dishName')}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            returnKeyType="next"
            placeholder="e.g. Bobotie"
            placeholderTextColor={COLORS.placeholder}
            maxLength={MAX_NAME_LENGTH}
            accessibilityLabel="Dish name"
          />
        </FormField>

        <FormField
          label="Description"
          error={errors.description}
          hint={`${values.description.length}/${MAX_DESCRIPTION_LENGTH}`}
        >
          <TextInput
            ref={descriptionRef}
            style={[styles.input, styles.multiline, errors.description && styles.inputError]}
            value={values.description}
            onChangeText={(text) => setField('description', text)}
            onBlur={() => validateField('description')}
            placeholder="Short description of the dish..."
            placeholderTextColor={COLORS.placeholder}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={MAX_DESCRIPTION_LENGTH}
            accessibilityLabel="Description"
          />
        </FormField>

        <FormField label="Course" error={errors.course}>
          <View style={[styles.pickerBox, errors.course && styles.inputError]}>
            <Picker
              selectedValue={values.course}
              onValueChange={(value) => setField('course', value)}
              dropdownIconColor={COLORS.primary}
              style={styles.picker}
              accessibilityLabel="Course"
            >
              <Picker.Item label="Select course..." value="" color={COLORS.placeholder} />
              {COURSES.map((name) => (
                <Picker.Item key={name} label={name} value={name} color={COLORS.text} />
              ))}
            </Picker>
          </View>
        </FormField>

        <FormField label="Price" error={errors.price}>
          <View style={[styles.priceRow, errors.price && styles.inputError]}>
            <Text style={styles.currency}>R</Text>
            <TextInput
              style={styles.priceInput}
              value={values.price}
              onChangeText={(text) => setField('price', sanitizePriceInput(text))}
              onBlur={() => validateField('price')}
              placeholder="e.g. 120.00"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="decimal-pad"
              maxLength={8}
              accessibilityLabel="Price in rand"
            />
          </View>
        </FormField>

        <View style={styles.buttonRow}>
          <Button
            label="Cancel"
            variant="secondary"
            onPress={handleCancel}
            style={styles.cancelButton}
          />
          <Button
            label={isEditing ? 'Save Changes' : 'Save'}
            accessibilityLabel={isEditing ? 'Save changes' : 'Save menu item'}
            onPress={handleSave}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  summary: {
    marginBottom: SPACING.md,
  },
  input: {
    minHeight: CONTROL_HEIGHT,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZE.body,
    color: COLORS.text,
  },
  multiline: {
    minHeight: 110,
    paddingTop: SPACING.sm + 4,
  },
  inputError: {
    borderColor: COLORS.error,
    borderWidth: 2,
  },
  pickerBox: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: CONTROL_HEIGHT,
  },
  picker: {
    color: COLORS.text,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    minHeight: CONTROL_HEIGHT,
    paddingHorizontal: SPACING.md,
  },
  currency: {
    fontSize: FONT_SIZE.body,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    marginRight: SPACING.sm,
  },
  priceInput: {
    flex: 1,
    fontSize: FONT_SIZE.body,
    color: COLORS.text,
    minHeight: CONTROL_HEIGHT,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: SPACING.md,
  },
  cancelButton: {
    marginRight: SPACING.sm,
  },
  saveButton: {
    marginLeft: SPACING.sm,
  },
});
