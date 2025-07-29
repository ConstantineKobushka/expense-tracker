import store from '../../observable/observableStore.js';
import { apiFetchHtml } from '../../api/fetchApi.js';

export async function createFilters(FiltersContainer) {
  const html = await apiFetchHtml('./components/Filters/Filters.html');

  FiltersContainer.innerHTML = html;

  const filterElements = {
    type: document.querySelector('#filter-type'),
    category: document.querySelector('#filter-category'),
    amount: document.querySelector('#filter-amound'),
    description: document.querySelector('#filter-search'),
    date: document.querySelector('#filter-date'),
  };

  filterElements.type.addEventListener('change', showFilterTypeHandler);
  filterElements.category.addEventListener('change', showFilterCategoryHandler);
  filterElements.amount.addEventListener('input', showFilterAmountHandler);
  filterElements.description.addEventListener(
    'input',
    showFilterDescriptionHandler
  );
  filterElements.date.addEventListener('input', showFilterDateHandler);

  function resetFilters(except) {
    Object.entries(filterElements).forEach(([key, el]) => {
      if (key === except) return;
      el.value = key === 'type' ? 'type' : key === 'category' ? 'category' : '';
    });
  }

  function filterHandler(predicate, activeKey) {
    const allTransactions = store.get();
    const filteredTransactions = allTransactions.filter(predicate);

    store.filter(filteredTransactions);

    resetFilters(activeKey);
  }

  function showFilterTypeHandler() {
    filterHandler(
      (item) =>
        filterElements.type.value === 'all' ||
        item.type === filterElements.type.value,
      'type'
    );
  }

  function showFilterDateHandler() {
    filterHandler((item) => item.date === filterElements.date.value, 'date');
  }

  function showFilterCategoryHandler() {
    filterHandler(
      (item) => item.category === filterElements.category.value,
      'category'
    );
  }

  function showFilterAmountHandler() {
    const value = filterElements.amount.value.trim();
    if (!value) return store.filter(null);

    filterHandler((item) => item.amount.toString().includes(value), 'amount');
  }

  function showFilterDescriptionHandler() {
    const value = filterElements.description.value.trim().toLowerCase();
    if (!value) return store.filter(null);

    filterHandler(
      (item) => item.description.toLowerCase().includes(value),
      'description'
    );
  }

  function renderSelect(transactions) {
    const categorySelect = filterElements.category;
    const currentValue = categorySelect.value;

    const uniqueCategories = [
      ...new Set(transactions.map((transaction) => transaction.category)),
    ];

    const options = [
      `<option value="category" selected disabled hidden>Category</option>`,
      ...uniqueCategories.map(
        (category) => `<option value="${category}">${category}</option>`
      ),
    ];

    categorySelect.innerHTML = options.join('');

    categorySelect.value = uniqueCategories.includes(currentValue)
      ? currentValue
      : 'category';
  }

  store.subscribe(renderSelect);
}
