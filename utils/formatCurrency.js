export function formatCurrencyLocation(
  amound,
  currency = 'UAH',
  locale = 'uk-UA'
) {
  return amound.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatCurrency(amound, locale = 'uk-UA') {
  return amound.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
