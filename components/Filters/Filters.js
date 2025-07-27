import store from '../../data/observableStore.js';
import { apiFetchHtml } from '../../api/fetchApi.js';

export async function createFilters(FiltersContainer) {
  const html = await apiFetchHtml('./components/Filters/Filters.html');

  FiltersContainer.innerHTML = html;

  const categoryContainer = document.querySelector('#filter-category');

  async function renderSelect(transactions) {
    const currentValue = categoryContainer.value;

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

    if (
      uniqueCategories.includes(currentValue) ||
      currentValue === 'category'
    ) {
      categoryContainer.value = currentValue;
    } else {
      categoryContainer.value = 'category';
    }
  }

  const filterType = document.querySelector('#filter-type');
  const filterCategory = document.querySelector('#filter-category');
  const filterAmound = document.querySelector('#filter-amound');
  const filterDescription = document.querySelector('#filter-search');

  filterType.addEventListener('change', showFilterTypeHandler);
  filterCategory.addEventListener('change', showFilterCategoryHandler);
  filterAmound.addEventListener('input', showFilterAmoundHandler);
  filterDescription.addEventListener('input', showFilterSearchHandler);

  let filtered = [];

  function showFilterTypeHandler(e) {
    filtered = store.get().filter((item) => {
      if (filterType.value === 'all') {
        return true;
      } else {
        return item.type === filterType.value;
      }
    });

    if (filtered.length > 0) {
      store.filter(filtered);
    }

    filterCategory.value = 'category';
    filterAmound.value = '';
    filterDescription.value = '';
  }

  function showFilterCategoryHandler(e) {
    filtered = store
      .get()
      .filter((item) => item.category === filterCategory.value);

    if (filtered.length > 0) {
      store.filter(filtered);
    }

    filterType.value = 'type';
    filterAmound.value = '';
    filterDescription.value = '';
  }

  function showFilterAmoundHandler(e) {
    filtered = store
      .get()
      .filter((item) => item.amount.toString() === filterAmound.value.trim());

    if (filterAmound.value === '') {
      store.filter([]);
    }

    if (filtered.length > 0) {
      store.filter(filtered);
    }

    filterType.value = 'type';
    filterCategory.value = 'category';
    filterDescription.value = '';
  }

  function showFilterSearchHandler(e) {
    filtered = store
      .get()
      .filter((item) =>
        item.description
          .toLowerCase()
          .includes(filterDescription.value.trim().toLowerCase())
      );

    if (filtered.length > 0) {
      store.filter(filtered);
    }

    filterType.value = 'type';
    filterCategory.value = 'category';
    filterAmound.value = '';
  }

  store.subscribe(renderSelect);
}
