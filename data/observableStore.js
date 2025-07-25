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
    this.listeners.forEach((cb) => cb(this.get()));
  },
};

export default store;
