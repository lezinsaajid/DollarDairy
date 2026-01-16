import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

const { width } = Dimensions.get('window');

export default function ViewCharts({ visible, onClose, expenseData }) {
  const [selectedChart, setSelectedChart] = useState('category');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const chartTypes = [
    { id: 'category', label: 'By Category', icon: 'pie-chart-outline' },
    { id: 'trend', label: 'Spending Trend', icon: 'trending-up-outline' },
    { id: 'comparison', label: 'Period Compare', icon: 'bar-chart-outline' },
    { id: 'daily', label: 'Daily Breakdown', icon: 'calendar-outline' },
  ];

  const periods = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
  ];

  // Mock data - replace with actual data from props
  const categoryData = [
    { category: 'Food & Dining', amount: 1550, color: '#FF6B6B', percentage: 35 },
    { category: 'Transportation', amount: 1200, color: '#4ECDC4', percentage: 27 },
    { category: 'Shopping', amount: 800, color: '#95E1D3', percentage: 18 },
    { category: 'Entertainment', amount: 500, color: '#F38181', percentage: 11 },
    { category: 'Others', amount: 400, color: '#C8C8C8', percentage: 9 },
  ];

  const totalExpense = categoryData.reduce((sum, item) => sum + item.amount, 0);

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
              <Ionicons name="stats-chart-outline" size={24} color={COLORS.primary} />
              <Text style={styles.title}>Expense Charts</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* Period Selector */}
            <View style={styles.periodSelector}>
              {periods.map((period) => (
                <TouchableOpacity
                  key={period.id}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period.id && styles.periodButtonSelected,
                  ]}
                  onPress={() => setSelectedPeriod(period.id)}
                >
                  <Text
                    style={[
                      styles.periodButtonText,
                      selectedPeriod === period.id && styles.periodButtonTextSelected,
                    ]}
                  >
                    {period.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Total Spending Card */}
            <View style={styles.totalCard}>
              <Text style={styles.totalLabel}>Total Spending</Text>
              <Text style={styles.totalAmount}>₹{totalExpense.toLocaleString()}</Text>
              <Text style={styles.totalPeriod}>This {selectedPeriod}</Text>
            </View>

            {/* Chart Type Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartTabs}>
              {chartTypes.map((chart) => (
                <TouchableOpacity
                  key={chart.id}
                  style={[
                    styles.chartTab,
                    selectedChart === chart.id && styles.chartTabSelected,
                  ]}
                  onPress={() => setSelectedChart(chart.id)}
                >
                  <Ionicons
                    name={chart.icon}
                    size={20}
                    color={selectedChart === chart.id ? COLORS.primary : COLORS.textSecondary}
                  />
                  <Text
                    style={[
                      styles.chartTabText,
                      selectedChart === chart.id && styles.chartTabTextSelected,
                    ]}
                  >
                    {chart.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Chart Content - Category Breakdown */}
            {selectedChart === 'category' && (
              <View style={styles.chartContainer}>
                {/* Pie Chart Visual Representation */}
                <View style={styles.pieChartContainer}>
                  <View style={styles.pieChart}>
                    {categoryData.map((item, index) => {
                      const previousPercentages = categoryData
                        .slice(0, index)
                        .reduce((sum, i) => sum + i.percentage, 0);
                      const rotation = (previousPercentages * 360) / 100;
                      
                      return (
                        <View
                          key={item.category}
                          style={[
                            styles.pieSlice,
                            {
                              backgroundColor: item.color,
                              width: `${item.percentage}%`,
                            },
                          ]}
                        />
                      );
                    })}
                  </View>
                  <View style={styles.pieCenter}>
                    <Text style={styles.pieCenterAmount}>₹{totalExpense}</Text>
                    <Text style={styles.pieCenterLabel}>Total</Text>
                  </View>
                </View>

                {/* Category List */}
                <View style={styles.categoryList}>
                  {categoryData.map((item) => (
                    <View key={item.category} style={styles.categoryItem}>
                      <View style={styles.categoryLeft}>
                        <View style={[styles.categoryDot, { backgroundColor: item.color }]} />
                        <Text style={styles.categoryName}>{item.category}</Text>
                      </View>
                      <View style={styles.categoryRight}>
                        <Text style={styles.categoryAmount}>₹{item.amount}</Text>
                        <Text style={styles.categoryPercentage}>{item.percentage}%</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Spending Trend */}
            {selectedChart === 'trend' && (
              <View style={styles.chartContainer}>
                <Text style={styles.comingSoonText}>📈 Spending Trend Chart</Text>
                <Text style={styles.comingSoonSubtext}>
                  Track your spending patterns over time
                </Text>
              </View>
            )}

            {/* Period Comparison */}
            {selectedChart === 'comparison' && (
              <View style={styles.chartContainer}>
                <Text style={styles.comingSoonText}>📊 Period Comparison</Text>
                <Text style={styles.comingSoonSubtext}>
                  Compare expenses across different periods
                </Text>
              </View>
            )}

            {/* Daily Breakdown */}
            {selectedChart === 'daily' && (
              <View style={styles.chartContainer}>
                <Text style={styles.comingSoonText}>📅 Daily Breakdown</Text>
                <Text style={styles.comingSoonSubtext}>
                  See your day-by-day spending pattern
                </Text>
              </View>
            )}

            {/* Insights Card */}
            <View style={styles.insightsCard}>
              <View style={styles.insightsHeader}>
                <Ionicons name="bulb-outline" size={20} color={COLORS.primary} />
                <Text style={styles.insightsTitle}>Insights</Text>
              </View>
              <Text style={styles.insightText}>
                • Food & Dining is your highest expense at 35%
              </Text>
              <Text style={styles.insightText}>
                • You spent 15% more this {selectedPeriod} compared to last
              </Text>
              <Text style={styles.insightText}>
                • Average daily spending: ₹{Math.round(totalExpense / 30)}
              </Text>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.exportChartButton}>
              <Ionicons name="download-outline" size={20} color={COLORS.primary} />
              <Text style={styles.exportChartButtonText}>Export Chart</Text>
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
    maxHeight: '90%',
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
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  periodButton: {
    flex: 1,
    padding: 12,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  periodButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  periodButtonTextSelected: {
    color: '#fff',
  },
  totalCard: {
    backgroundColor: COLORS.primary,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  totalPeriod: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  chartTabs: {
    marginBottom: 20,
  },
  chartTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    marginRight: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chartTabSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  chartTabText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  chartTabTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  chartContainer: {
    backgroundColor: COLORS.background,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  pieChartContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  pieChart: {
    width: 160,
    height: 160,
    borderRadius: 80,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
  },
  pieSlice: {
    height: '100%',
  },
  pieCenter: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.surface,
    top: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieCenterAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  pieCenterLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  categoryList: {
    gap: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryName: {
    fontSize: 14,
    color: COLORS.text,
  },
  categoryRight: {
    alignItems: 'flex-end',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  categoryPercentage: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  comingSoonText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  comingSoonSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  insightsCard: {
    backgroundColor: COLORS.primaryLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  insightText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: 4,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  exportChartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  exportChartButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
