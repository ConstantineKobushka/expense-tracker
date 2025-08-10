import { generateId } from '../utils/generateId.js';

const store = {
  transactions: [],
  filteredTransactions: null,
  listeners: [],

  subscribe(callback) {
    this.listeners.push(callback);
    callback(this.transactions, this.filteredTransactions);
  },

  filter(transactions) {
    this.filteredTransactions = transactions;
    this.notify();
  },

  get() {
    return [...this.transactions];
  },

  set(transactions) {
    this.transactions = transactions;
    this.notify();
  },

  add(newTransaction) {
    const data = {
      ...newTransaction,
      id: generateId(),
    };
    this.set([...this.transactions, data]);
  },

  remove(id) {
    this.set(this.transactions.filter((t) => t.id !== id));
  },

  update(transactionData) {
    this.set(
      this.transactions.map((item) =>
        item.id === transactionData.id
          ? {
              ...item,
              ...transactionData,
            }
          : item
      )
    );
  },

  notify() {
    this.listeners.forEach((cb) => cb(this.get(), this.filteredTransactions));
  },
};

export default store;
