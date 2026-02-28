/**
 * Service to generate financial insights from transaction data
 */
class InsightService {
    /**
     * Generate spending insights
     * @param {Array} transactions 
     * @returns {Array} List of insights
     */
    generateInsights(transactions) {
        if (!transactions || transactions.length === 0) {
            return [{
                type: 'info',
                title: 'Welcome to Insights',
                description: 'Start logging transactions to see spending patterns and saving tips.'
            }];
        }

        const insights = [];
        const expenses = transactions.filter(t => t.type === 'expense');
        const income = transactions.filter(t => t.type === 'income');

        const totalExpenses = expenses.reduce((sum, t) => sum + parseFloat(t.amount), 0);
        const totalIncome = income.reduce((sum, t) => sum + parseFloat(t.amount), 0);

        // 1. Savings Rate Insight
        if (totalIncome > 0) {
            const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;
            if (savingsRate > 20) {
                insights.push({
                    type: 'success',
                    title: 'Great Savings!',
                    description: `Your savings rate is ${savingsRate.toFixed(1)}%. Keep it up!`
                });
            } else if (savingsRate > 0) {
                insights.push({
                    type: 'warning',
                    title: 'Room for Improvement',
                    description: `Your savings rate is ${savingsRate.toFixed(1)}%. Try to reach 20% by cutting small expenses.`
                });
            } else {
                insights.push({
                    type: 'error',
                    title: 'Overspending Warning',
                    description: 'Your expenses exceed your income. Check your recurring bills.'
                });
            }
        }

        // 2. Category Concentration Insight
        const categorySpending = expenses.reduce((acc, t) => {
            acc[t.categoryId] = (acc[t.categoryId] || 0) + parseFloat(t.amount);
            return acc;
        }, {});

        const topCategory = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];
        if (topCategory && totalExpenses > 0) {
            const percentage = (topCategory[1] / totalExpenses) * 100;
            if (percentage > 40) {
                insights.push({
                    type: 'info',
                    title: 'Focused Spending',
                    description: `You spend ${percentage.toFixed(0)}% of your budget on a single category. Can you reduce it?`
                });
            }
        }

        // 3. Frequency Insight (if data exists)
        if (expenses.length > 10) {
            insights.push({
                type: 'info',
                title: 'Transaction Frequency',
                description: `You log an average of ${(expenses.length / 30).toFixed(1)} expenses per day.`
            });
        }

        return insights;
    }
}

module.exports = new InsightService();
