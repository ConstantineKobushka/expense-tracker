import store from '../../data/observableStore.js';
import { apiFetchHtml } from '../../api/fetchApi.js';
import { generateId } from '../../utils/generateId.js';

export async function createFormAddTransaction(formAddContainer) {
  const html = await apiFetchHtml(
    './components/FormAddTransaction/FormAddTransaction.html'
  );

  formAddContainer.innerHTML = html;

  const transactionForm = document.querySelector('.transaction-form');
  const addBtn = document.querySelector('.transaction-form--btn');

  if (addBtn) {
    addBtn.addEventListener('click', addTransactionHandler);
  }

  function addTransactionHandler(e) {
    e.preventDefault();

    const newTransaction = {
      id: generateId(),
      type: transactionForm.elements.type.value,
      amount: Number(transactionForm.elements.amount.value),
      category: transactionForm.elements.category.value.trim(),
      date: transactionForm.elements.date.value,
      description: transactionForm.elements.description.value.trim(),
    };

    transactionForm.reset();

    store.add(newTransaction);
  }
}
