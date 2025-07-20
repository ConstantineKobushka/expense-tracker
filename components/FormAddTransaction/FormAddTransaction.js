import { createTransactionsList } from '../TransactionsList/TransactionsList.js';
import { createBalance } from '../Balance/Balance.js';
import { createFilters } from '../Filters/Filters.js';
import { fakeTransactionService } from '../../services/fakeTransactionService.js';
import { apiFetchHtml } from '../../api/fetchApi.js';

export async function createFormAddTransaction(
  formAddContainer,
  transactionsListContainer,
  balanceContainer,
  filtersContainer
) {
  // const response = await fetch(
  //   './src/components/FormAddTransaction/FormAddTransaction.html'
  // );
  // const html = await response.text();

  const html = await apiFetchHtml(
    './components/FormAddTransaction/FormAddTransaction.html'
  );

  formAddContainer.innerHTML = html;

  const transactionForm = document.querySelector('.transaction-form');
  const addBtn = document.querySelector('.transaction-form--btn');

  if (addBtn) {
    addBtn.addEventListener('click', addTransactionHandler);
  }

  async function addTransactionHandler(e) {
    e.preventDefault();

    const newData = {
      type: transactionForm.elements.type.value,
      amount: Number(transactionForm.elements.amount.value),
      category: transactionForm.elements.category.value.trim(),
      date: transactionForm.elements.date.value,
      description: transactionForm.elements.description.value.trim(),
    };
    transactionForm.reset();

    await fakeTransactionService.add(newData);

    if (transactionsListContainer) {
      await createTransactionsList(transactionsListContainer);
    }

    if (balanceContainer) {
      await createBalance(balanceContainer);
    }

    if (filtersContainer) {
      await createFilters(filtersContainer);
    }
  }
}
