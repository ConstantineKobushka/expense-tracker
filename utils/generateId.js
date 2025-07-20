export function generateId() {
  return Math.random().toString(36).substring(2, 10); // унікальний рядковий ідентифікатор, який складається з латинських букв і цифр
}
