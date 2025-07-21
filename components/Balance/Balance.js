import store from '../../data/observableStore.js';
import { apiFetchHtml } from '../../api/fetchApi.js';
import { formatCurrencyLocation } from '../../utils/formatCurrency.js';

export async function createBalance(balanceContainer) {
  const html = await apiFetchHtml('./components/Balance/Balance.html');
  balanceContainer.innerHTML = html;
  const balanceInner = document.querySelector('.balance-inner');

  function renderBalance(transactions) {
    const incomes = transactions
      .filter((item) => item.type === 'income')
      .reduce((acc, item) => {
        acc += item.amount;
        return Math.round(acc * 100) / 100;
      }, 0);

    const expenses = transactions
      .filter((item) => item.type === 'expense')
      .reduce((acc, item) => {
        acc += item.amount;
        return Math.round(acc * 100) / 100;
      }, 0);

    const sumBalance = incomes - expenses;

    const markup = `
    <span class="balance-text">Amound: ${formatCurrencyLocation(
      sumBalance
    )}</span>
    <span class="balance-text">Incomes: ${formatCurrencyLocation(
      incomes
    )}</span>
    <span class="balance-text">Expenses: ${formatCurrencyLocation(
      expenses
    )}</span>`;

    balanceInner.innerHTML = markup;
  }

  store.subscribe(renderBalance);
}
