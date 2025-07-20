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
