import { fakeTransactionService } from '../../services/fakeTransactionService.js';
import { formatCurrencyLocation } from '../../utils/formatCurrency.js';

export async function createBalance(balanceContainer) {
  const transactions = await fakeTransactionService.getAll();

  const incomes = transactions
    .filter((item) => item.type === 'income')
    .reduce((acc, item) => {
      acc += item.amount;
      return Math.round(acc * 100) / 100;
    }, 0);

  const expenses = transactions
    .filter((item) => item.type === 'expense')
    .reduce((acc, item) => {
      return (acc += item.amount);
    }, 0);

  const sumBalance = incomes - expenses;

  balanceContainer.innerHTML = `
  <div class="container">
    <h3 class="title">Balance</h3>
    <span class="balance-text">Amound: ${formatCurrencyLocation(
      sumBalance
    )}</span>
    <span class="balance-text">Incomes: ${formatCurrencyLocation(
      incomes
    )}</span>
    <span class="balance-text">Expenses: ${formatCurrencyLocation(
      expenses
    )}</span>
  </div>`;
}
