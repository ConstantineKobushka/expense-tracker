import store from '../../data/observableStore.js';
import { apiFetchHtml } from '../../api/fetchApi.js';

export async function createFilters(FiltersContainer) {
  const html = await apiFetchHtml('./components/Filters/Filters.html');

  FiltersContainer.innerHTML = html;

  const categoryContainer = document.querySelector('#filter-category');

  // const filterType = document.querySelector('#filter-type');
  // const filterCategory = document.querySelector('#filter-category');
  // const filterAmound = document.querySelector('#filter-amound');
  // const filterDescription = document.querySelector('#filter-search');
  // const filterDate = document.querySelector('#filter-date');

  // filterType.addEventListener('change', showFilterTypeHandler);
  // filterCategory.addEventListener('change', showFilterCategoryHandler);
  // filterAmound.addEventListener('input', showFilterAmoundHandler);
  // filterDescription.addEventListener('input', showFilterDescriptionHandler);
  // filterDate.addEventListener('input', showFilterDateHandler);

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
    console.log(filteredTransactions);

    if (filteredTransactions.length > 0) {
      store.filter(filteredTransactions);
    } else {
      store.filter([]); // можно тут показывать "ничего не найдено"
    }

    resetFilters(activeKey);
  }

  // let filtered = [];

  function showFilterTypeHandler(e) {
    filterHandler(
      (item) => filterType.value === 'all' || item.type === filterType.value
    );

    if (filtered.length > 0) {
      store.filter(filtered);
    }

    filterDate.value = '';
    filterCategory.value = 'category';
    filterAmound.value = '';
    filterDescription.value = '';
  }

  function showFilterDateHandler(e) {
    filtered = store.get().filter((item) => item.date === filterDate.value);

    if (filtered.length > 0) {
      store.filter(filtered);
    }

    console.log(filtered);

    filterType.value = 'type';
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
    filterDate.value = '';
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
    filterDate.value = '';
    filterCategory.value = 'category';
    filterDescription.value = '';
  }

  function showFilterDescriptionHandler(e) {
    filtered = store
      .get()
      .filter((item) =>
        item.description
          .toLowerCase()
          .includes(filterDescription.value.trim().toLowerCase())
      );

    if (filterAmound.value === '') {
      store.filter([]);
    }

    if (filtered.length > 0) {
      store.filter(filtered);
    }

    filterType.value = 'type';
    filterDate.value = '';
    filterCategory.value = 'category';
    filterAmound.value = '';
  }

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

  store.subscribe(renderSelect);
}
