import { generateId } from '../utils/generateId.js';

const store = {
  transactions: [],
  filteredTransaction: [],
  listeners: [],

  subscribe(callback) {
    this.listeners.push(callback);
    callback(this.transactions, this.filteredTransaction);
  },

  filter(transactions) {
    this.filteredTransaction = transactions;
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
              type: transactionData.type,
              amount: transactionData.amount,
              category: transactionData.category,
              date: transactionData.date,
              description: transactionData.description,
            }
          : item
      )
    );
  },

  notify() {
    this.listeners.forEach((cb) => cb(this.get(), this.filteredTransaction));
  },
};

export default store;
