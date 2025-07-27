import store from '../../data/observableStore.js';
import { escapeHTML } from '../../utils/escapeHTML.js';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { apiFetchHtml } from '../../api/fetchApi.js';

export async function createTransactionsList(transactionContainer) {
  const html = await apiFetchHtml(
    './components/TransactionsList/TransactionsList.html'
  );

  transactionContainer.innerHTML = html;

  const tableEl = transactionContainer.querySelector('table');

  function renderTransactions(allTransactions, filteredTransaction) {
    const transactions =
      filteredTransaction.length === 0 ? allTransactions : filteredTransaction;

    tableEl.innerHTML = `
    <thead>
      <tr>
        <th>Type</th>
        <th>Amound</th>
        <th>Category</th>
        <th>Date</th>
        <th>Description</th>
        <th>Edite</th>
        <th>Delete</th>
      </tr>
    </thead>`;

    const markup = transactions
      .map(
        (item) => `
        <tr data-id="${escapeHTML(item.id)}">
          <td>${item.type === 'income' ? 'Дохід' : 'Витрата'}</td>
          <td>${formatCurrency(item.amount)}</td>
          <td>${escapeHTML(item.category)}</td>
          <td>${escapeHTML(item.date)}</td>
          <td>${escapeHTML(item.description)}</td>
          <td>
          <button class="transaction-list--btn edite" data-value="edite">
          <img class="transaction-list--img" src="./images/edite.svg" alt="Edite" />
          </button></td>
          <td>
          <button class="transaction-list--btn delete" data-value="delete">
          <img class="transaction-list--img" src="./images/delete.svg" alt="Delete" />
          </button></td>
        </tr>`
      )
      .join('');

    tableEl.insertAdjacentHTML('beforeend', markup);
  }

  const formOverlay = document.querySelector(
    '.transaction-edite-form--overlay'
  );
  const formModal = document.querySelector('.transaction-edite-form--modal');
  const formCloseBtn = document.querySelector(
    '.transaction-edite-form--close-btn'
  );
  const editeForm = document.querySelector('.transaction-edite-form');

  tableEl.addEventListener('click', changeTransactionHandler);
  formCloseBtn.addEventListener('click', closeModalHandler);
  formOverlay.addEventListener('click', closeModalHandler);
  formModal.addEventListener('click', stopPropagation);
  editeForm.addEventListener('submit', updateTransactionHandler);

  let id = '';

  function changeTransactionHandler(e) {
    if (e.target.tagName !== 'BUTTON') return;

    if (e.target.dataset.value === 'edite') {
      openModalHandler();

      id = e.target.closest('tr').dataset.id;

      const transactionData = store.get().filter((item) => item.id === id);

      const { amount, category, date, description, type } = transactionData[0];

      editeForm.elements.type.value = type;
      editeForm.elements.amount.value = amount;
      editeForm.elements.category.value = category;
      editeForm.elements.date.value = date;
      editeForm.elements.description.value = description;
    }

    if (e.target.dataset.value === 'delete') {
      const id = e.target.closest('tr').dataset.id;
      store.remove(id);
      store.filter([]);
    }
  }

  function updateTransactionHandler(e) {
    e.preventDefault();

    const transactionData = {
      id,
      type: editeForm.elements.type.value,
      amount: Number(editeForm.elements.amount.value),
      category: editeForm.elements.category.value.trim(),
      date: editeForm.elements.date.value,
      description: editeForm.elements.description.value.trim(),
    };

    store.update(transactionData);
    store.filter([]);

    editeForm.reset();

    closeModalHandler();
  }

  function noScrol() {
    document.body.classList.toggle('no-scroll');
  }

  function stopPropagation(e) {
    e.stopPropagation();
  }

  function openModalHandler() {
    formOverlay.classList.add('is-open');
    formModal.classList.add('is-open');
    noScrol();
  }

  function closeModalHandler() {
    formOverlay.classList.remove('is-open');
    formModal.classList.remove('is-open');
    noScrol();
  }

  store.subscribe(renderTransactions);
}
