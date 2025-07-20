import store from './data/observableStore.js';

import { createFormAddTransaction } from './components/FormAddTransaction/FormAddTransaction.js';
import { createBalance } from './components/Balance/Balance.js';
import { createFilters } from './components/Filters/Filters.js';
import { createTransactionsList } from './components/TransactionsList/TransactionsList.js';

const formAddTransactionEl = document.getElementById('form-add-transaction');
const balanceEl = document.getElementById('balance');
const filtersEl = document.getElementById('filters');
const transactionsListEl = document.getElementById('sample-component');

if (formAddTransactionEl && transactionsListEl && balanceEl && filtersEl) {
  createFormAddTransaction(
    formAddTransactionEl,
    transactionsListEl,
    balanceEl,
    filtersEl
  );
  createBalance(balanceEl);
  createFilters(filtersEl);
  createTransactionsList(transactionsListEl);

  const transactions = JSON.parse(localStorage.getItem('transactions')) ?? [];

  store.set(transactions);

  store.subscribe((transactions) => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  });
}
