export const CURRENCIES = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

export const formatCurrency = (amount, currencyCode = 'USD') => {
    const currency = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
    return `${currency.symbol}${parseFloat(amount).toFixed(2)}`;
};
