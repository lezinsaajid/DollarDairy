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

export default function ExportData({ visible, onClose, onExport }) {
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [selectedData, setSelectedData] = useState(['transactions']);

  const formats = [
    { id: 'csv', label: 'CSV', icon: 'document-text-outline', description: 'Comma-separated values' },
    { id: 'pdf', label: 'PDF', icon: 'document-outline', description: 'Portable document format' },
    { id: 'excel', label: 'Excel', icon: 'grid-outline', description: 'Microsoft Excel format' },
    { id: 'json', label: 'JSON', icon: 'code-outline', description: 'JavaScript object notation' },
  ];

  const dataTypes = [
    { id: 'transactions', label: 'All Transactions', icon: 'list-outline' },
    { id: 'categories', label: 'Category Summary', icon: 'pie-chart-outline' },
    { id: 'monthly', label: 'Monthly Summary', icon: 'bar-chart-outline' },
    { id: 'reports', label: 'Full Report', icon: 'document-text-outline' },
  ];

  const toggleDataType = (typeId) => {
    setSelectedData((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleExport = () => {
    onExport({ format: selectedFormat, dataTypes: selectedData });
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
              <Ionicons name="download-outline" size={24} color={COLORS.primary} />
              <Text style={styles.title}>Export Data</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* Format Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Format</Text>
              {formats.map((format) => (
                <TouchableOpacity
                  key={format.id}
                  style={[
                    styles.formatOption,
                    selectedFormat === format.id && styles.formatOptionSelected,
                  ]}
                  onPress={() => setSelectedFormat(format.id)}
                >
                  <View style={styles.formatLeft}>
                    <Ionicons
                      name={format.icon}
                      size={24}
                      color={
                        selectedFormat === format.id
                          ? COLORS.primary
                          : COLORS.textSecondary
                      }
                    />
                    <View>
                      <Text
                        style={[
                          styles.formatLabel,
                          selectedFormat === format.id && styles.formatLabelSelected,
                        ]}
                      >
                        {format.label}
                      </Text>
                      <Text style={styles.formatDescription}>
                        {format.description}
                      </Text>
                    </View>
                  </View>
                  {selectedFormat === format.id && (
                    <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Data Type Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Include Data</Text>
              {dataTypes.map((type) => {
                const isSelected = selectedData.includes(type.id);
                return (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.dataTypeOption,
                      isSelected && styles.dataTypeOptionSelected,
                    ]}
                    onPress={() => toggleDataType(type.id)}
                  >
                    <View style={styles.dataTypeLeft}>
                      <View
                        style={[
                          styles.checkbox,
                          isSelected && styles.checkboxSelected,
                        ]}
                      >
                        {isSelected && (
                          <Ionicons name="checkmark" size={16} color="#fff" />
                        )}
                      </View>
                      <Ionicons
                        name={type.icon}
                        size={20}
                        color={isSelected ? COLORS.primary : COLORS.textSecondary}
                      />
                      <Text
                        style={[
                          styles.dataTypeLabel,
                          isSelected && styles.dataTypeLabelSelected,
                        ]}
                      >
                        {type.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
              <Text style={styles.infoText}>
                Your data will be exported and saved to your device&apos;s downloads folder.
              </Text>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.exportButton,
                selectedData.length === 0 && styles.exportButtonDisabled,
              ]}
              onPress={handleExport}
              disabled={selectedData.length === 0}
            >
              <Ionicons name="download-outline" size={20} color="#fff" />
              <Text style={styles.exportButtonText}>Export Data</Text>
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
    maxHeight: '85%',
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
  formatOption: {
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
  formatOptionSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  formatLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  formatLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  formatLabelSelected: {
    color: COLORS.primary,
  },
  formatDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  dataTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dataTypeOptionSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  dataTypeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dataTypeLabel: {
    fontSize: 16,
    color: COLORS.text,
  },
  dataTypeLabelSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  exportButton: {
    flex: 2,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  exportButtonDisabled: {
    opacity: 0.5,
  },
  exportButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
