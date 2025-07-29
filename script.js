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

let expenses = JSON.parse(localStorage.getItem('expenses')) || []; // Array store expenses
let filteredExpenses = []; // Array to store filtered expenses

// Function saveExpenses to localStorage
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// addExpense function : add a new expense
function addExpense(description, amount) {
  const date = new Date().toLocaleString('vi-VN');
  expenses.push({ description, amount, date });
  filteredExpenses = expenses; // Update the filtered expenses
  saveExpenses();
  //renderExpenses();
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

// Function to delete an expense
function deleteExpense(index) {
  const expenseToDelete = filteredExpenses[index]; // Get the expense to delete
  const originlIndex = expenses.indexOf(expenseToDelete); // Find the original index in the expenses array
  expenses.splice(originlIndex, 1); // Remove the expense from the array
  filteredExpenses = expenses; // Update the filtered expenses
  saveExpenses();
  renderExpenses();
}

// Function to clear all expenses
clearAllBtn.addEventListener('click', function () {
  if (confirm('Are you sure you want to clear all expenses?')) {
    expenses = []; // Reset the expenses array
    saveExpenses();
    renderExpenses();
  }
});

// Function to filter expenses by date
filterBtn.addEventListener('click', () => {
  const selectedDate = filterDateInput.value; // Get the selected date
  if (selectedDate) {
    const fomattedDate = new Date(selectedDate).toLocaleDateString('vi-VN'); // Format the date
    filteredExpenses = expenses.filter((expense) => {
      expense.date.startsWith(fomattedDate); // Filter expenses that match the selected date
    });
    renderExpenses(); // Render the filtered expenses
  } else {
    alert('Please select a date to filter expenses.');
  }
});

// Function to reset the filter
resetFilterBtn.addEventListener('click', () => {
  filteredExpenses = expenses; // Reset the filtered expenses to the original expenses
  renderExpenses(); // Render the original expenses
  filterDateInput.value = ''; // Clear the date input
});

// function display
function renderExpenses() {
  expenseList.innerHTML = ''; // Clear the current list
  let total = 0; // Initialize total to 0

  filteredExpenses.forEach((expense, index) => {
    // Loop through each expense
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.description}</td>
      <td>${expense.amount.toLocaleString()} VND</td>
      <td><button class ="delete-btn">Delete</button></td>
    `;
    expenseList.appendChild(row); // Append the row to the table body
    // Add event listener to the delete button
    const deleteBtn = row.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      deleteExpense(index);
    });
    total += expense.amount;
  });

  totalElement.textContent = `Total: ${total.toLocaleString()} VND`; // Update the total display
}
renderExpenses();
