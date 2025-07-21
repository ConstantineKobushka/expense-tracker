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
    this.set([...this.transactions, newTransaction]);
  },

  // add(newTransaction) {
  //   console.log(newTransaction);
  //   const transactions = {
  //     ...newTransaction,
  //     id: generateId(),
  //   };
  //   console.log(transactions);
  //   this.set(this.transactions.push(transactions));
  // },

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
