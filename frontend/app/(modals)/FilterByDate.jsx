import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

export default function FilterByDate({ visible, onClose, onApplyFilter }) {
  const [selectedRange, setSelectedRange] = useState('all');
  const [customStart, setCustomStart] = useState(null);
  const [customEnd, setCustomEnd] = useState(null);

  const dateRanges = [
    { id: 'today', label: 'Today', icon: 'today-outline' },
    { id: 'week', label: 'This Week', icon: 'calendar-outline' },
    { id: 'month', label: 'This Month', icon: 'calendar-outline' },
    { id: 'year', label: 'This Year', icon: 'calendar-outline' },
    { id: 'custom', label: 'Custom Range', icon: 'calendar-number-outline' },
    { id: 'all', label: 'All Time', icon: 'infinite-outline' },
  ];

  const handleApply = () => {
    onApplyFilter({ range: selectedRange, customStart, customEnd });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
              <Text style={styles.title}>Filter by Date</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* Date Range Options */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Date Range</Text>
              {dateRanges.map((range) => (
                <TouchableOpacity
                  key={range.id}
                  style={[
                    styles.rangeOption,
                    selectedRange === range.id && styles.rangeOptionSelected,
                  ]}
                  onPress={() => setSelectedRange(range.id)}
                >
                  <View style={styles.rangeLeft}>
                    <Ionicons
                      name={range.icon}
                      size={20}
                      color={
                        selectedRange === range.id
                          ? COLORS.primary
                          : COLORS.textSecondary
                      }
                    />
                    <Text
                      style={[
                        styles.rangeLabel,
                        selectedRange === range.id && styles.rangeLabelSelected,
                      ]}
                    >
                      {range.label}
                    </Text>
                  </View>
                  {selectedRange === range.id && (
                    <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Custom Date Picker (shown when custom is selected) */}
            {selectedRange === 'custom' && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Custom Date Range</Text>
                <TouchableOpacity style={styles.dateInput}>
                  <Text style={styles.dateInputLabel}>Start Date</Text>
                  <Text style={styles.dateInputValue}>
                    {customStart ? customStart : 'Select Date'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateInput}>
                  <Text style={styles.dateInputLabel}>End Date</Text>
                  <Text style={styles.dateInputValue}>
                    {customEnd ? customEnd : 'Select Date'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => setSelectedRange('all')}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  rangeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rangeOptionSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  rangeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rangeLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  rangeLabelSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  dateInput: {
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  dateInputLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  dateInputValue: {
    fontSize: 16,
    color: COLORS.text,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  resetButton: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  applyButton: {
    flex: 2,
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
