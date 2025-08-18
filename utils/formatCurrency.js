export function formatCurrencyLocation(
  amount,
  currency = 'UAH',
  locale = 'uk-UA'
) {
  return amount.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatCurrency(amount, locale = 'uk-UA') {
  return amount.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
