import { fakeTransactionService } from '../../services/fakeTransactionService.js';
import { apiFetchHtml } from '../../api/fetchApi.js';

export async function createFilters(FiltersContainer) {
  const html = await apiFetchHtml('./components/Filters/Filters.html');

  FiltersContainer.innerHTML = html;

  const categoryContainer = document.getElementById('category');

  async function renderSelect() {
    const transactions = await fakeTransactionService.getAll();

    const uniqueCategories = [
      ...new Set(transactions.map((transaction) => transaction.category)),
    ];

    const markup = uniqueCategories
      .map(
        (category) => `
        <option class="product-form--select" value="${category}">${category}</option>`
      )
      .join('');

    categoryContainer.insertAdjacentHTML('beforeend', markup);
  }

  renderSelect();
}
