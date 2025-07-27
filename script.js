// Get the DOM elements
const form = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const totalElement = document.getElementById('total');
const clearAllBtn = document.getElementById('clear-all');
const filterDateInput = document.getElementById('filter-date');
const filterBtn = document.getElementById('filter-btn');
const resetFilterBtn = document.getElementById('reset-filter');

let expenses = []; // Array store expenses

// Function saveExpenses to localStorage
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// addExpense function : add a new expense
function addExpense(description, amount) {
  const date = new Date().toLocaleString('vi-VN');
  expenses.push({ description, amount, date });
  saveExpenses();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput, value.trim()); // Parse the amount as a float
  if (description && !isNaN(amount) && amount > 0) {
    addExpense(description, amount);
    descriptionInput.value = '';
    amountInput.value('');
  }
});
