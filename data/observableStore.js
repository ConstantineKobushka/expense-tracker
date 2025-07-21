import { generateId } from '../utils/generateId.js';

const store = {
  transactions: [],
  listeners: [],

  subscribe(callback) {
    this.listeners.push(callback);
    callback(this.transactions);
  },

  get() {
    return [...this.transactions];
  },

  set(transactions) {
    this.transactions = transactions;
    this.notify();
  },

  add(newTransaction) {
    console.log(newTransaction);
    const data = {
      ...newTransaction,
      id: generateId(),
    };
    console.log(data);
    this.set([...this.transactions, data]);
  },

  remove(id) {
    this.set(this.transactions.filter((t) => t.id !== id));
  },

  update(updatedTransaction) {
    this.set(
      this.transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      )
    );
  },

  notify() {
    this.listeners.forEach((cb) => cb(this.get()));
  },
};

export default store;
