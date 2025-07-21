import store from '../../data/observableStore.js';
import { apiFetchHtml } from '../../api/fetchApi.js';

export async function createFilters(FiltersContainer) {
  const html = await apiFetchHtml('./components/Filters/Filters.html');

  FiltersContainer.innerHTML = html;

  const categoryContainer = document.querySelector('#category');

  async function renderSelect(transactions) {
    categoryContainer.innerHTML = '';

    const uniqueCategories = [
      ...new Set(transactions.map((transaction) => transaction.category)),
    ];

    const defaultOption = `<option value="category" selected disabled hidden>Category</option>`;
    const otherOption = uniqueCategories
      .map(
        (category) => `
      <option class="product-form--select" value="${category}">${category}</option>`
      )
      .join('');

    const markup = defaultOption + otherOption;
    categoryContainer.innerHTML = markup;
  }

  store.subscribe(renderSelect);
}
