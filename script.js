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

let expenses = JSON.parse(localStorage.getItem('expense')) || []; // Array store expenses

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
  const amount = parseFloat(amountInput.value.trim()); // Parse the amount as a float
  if (description && !isNaN(amount) && amount > 0) {
    addExpense(description, amount);
    renderExpenses();
    descriptionInput.value = '';
    amountInput.value = '';
  }
});

// function display
function renderExpenses() {
  expenseList.innerHTML = ''; // Clear the current list
  let total = 0; // Initialize total to 0

  expenses.forEach((expense) => {
    // Loop through each expense
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.description}</td>
      <td>${expense.amount.toLocaleString()} VND</td>
      <td><button class ="delete-btn">Delete</button></td>
    `;
    expenseList.appendChild(row); // Append the row to the table body
    total += expense.amount;
  });

  totalElement.textContent = `Total: ${total.toLocaleString()} VND`; // Update the total display
}
renderExpenses();
