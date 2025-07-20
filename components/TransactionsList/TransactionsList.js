import { fakeTransactionService } from '../../services/fakeTransactionService.js';
import { escapeHTML } from '../../utils/escapeHTML.js';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { apiFetchHtml } from '../../api/fetchApi.js';

export async function createTransactionsList(transactionContainer) {
  // const response = await fetch(
  //   './src/components/TransactionsList/TransactionsList.html'
  // );
  // const html = await response.text();

  const html = await apiFetchHtml(
    './components/TransactionsList/TransactionsList.html'
  );

  transactionContainer.innerHTML = html;

  const transactions = await fakeTransactionService.getAll();
  const tableEl = transactionContainer.querySelector('table');

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
          <td><button class="transaction-list--btn"><img class="transaction-list--img" src="./images/edite.svg" alt="Edite" /></button></td>
          <td><button class="transaction-list--btn"><img class="transaction-list--img" src="./images/delete.svg" alt="Delete" /></button></td>
        </tr>`
    )
    .join('');

  tableEl.insertAdjacentHTML('beforeend', markup);
}
