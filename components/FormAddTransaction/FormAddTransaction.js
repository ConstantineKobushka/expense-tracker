import store from '../../observable/observableStore.js';
import { apiFetchHtml } from '../../api/fetchApi.js';

export async function createFormAddTransaction(formAddContainer) {
  try {
    const html = await apiFetchHtml(
      './components/FormAddTransaction/FormAddTransaction.html'
    );
    formAddContainer.innerHTML = html;
  } catch (error) {
    alert(error.message);
  }

  const transactionForm = document.querySelector('.transaction-form');
  const addBtn = document.querySelector('.transaction-form--btn');

  if (addBtn) {
    addBtn.addEventListener('click', addTransactionHandler);
  }

  function addTransactionHandler(e) {
    e.preventDefault();

    const newTransaction = {
      type: transactionForm.elements.type.value,
      amound: Number(transactionForm.elements.amound.value),
      category: transactionForm.elements.category.value.trim(),
      date: transactionForm.elements.date.value,
      description: transactionForm.elements.description.value.trim(),
    };

    transactionForm.reset();

    store.add(newTransaction);
    store.filter(null);
  }
}
