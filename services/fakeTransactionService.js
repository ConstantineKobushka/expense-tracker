// transactionService.js

const FAKE_NETWORK_DELAY = 300; // мс

// Початкові тестові дані
let transactions = [
  {
    id: 'a1b2c3d4',
    type: 'income',
    amount: 1200.5,
    category: 'Salary',
    date: '2025-07-01',
    description: 'Зарплата за червень',
  },
  {
    id: 'e5f6g7h8',
    type: 'expense',
    amount: 350.0,
    category: 'Groceries',
    date: '2025-07-03',
    description: 'Супермаркет',
  },
];

function generateId() {
  return Math.random().toString(36).substring(2, 10); // унікальний рядковий ідентифікатор, який складається з латинських букв і цифр
}

// Фейковий delay
function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// Основний сервіс
export const fakeTransactionService = {
  async getAll() {
    await delay(FAKE_NETWORK_DELAY);
    return [...transactions]; // повертаємо копію
  },

  async add(data) {
    await delay(FAKE_NETWORK_DELAY);
    const newTransaction = {
      ...data,
      id: generateId(),
    };
    transactions.push(newTransaction);
    return newTransaction;
  },

  async update(id, updates) {
    await delay(FAKE_NETWORK_DELAY);
    const index = transactions.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Transaction not found');
    transactions[index] = { ...transactions[index], ...updates };
    return transactions[index];
  },

  async remove(id) {
    await delay(FAKE_NETWORK_DELAY);
    transactions = transactions.filter((t) => t.id !== id);
    return { success: true };
  },
};
