const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const category = document.getElementById('category');
const type = document.getElementById('type');
const amount = document.getElementById('amount');
const date = document.getElementById('date');
const search = document.getElementById('search');
const filterRadios = document.querySelectorAll('input[name="filter"]');
const sortSelect = document.getElementById('sort');
const periodSelect = document.getElementById('period');
const exportBtn = document.getElementById('export-btn');
const formBtn = document.querySelector('.btn');
const logoutBtn = document.getElementById('logout-btn');
const userDisplay = document.getElementById('user-display');
// Re-declare list, balance, money_plus, money_minus, form to match the order in the new snippet
// However, since they are already declared above, we'll just keep the original declarations
// and ensure the new code uses these existing variables.

const API_URL = 'http://localhost:5000/api/transactions';
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (!token) {
    window.location.href = 'login.html';
}

if (user) {
    userDisplay.innerText = `Welcome, ${user.name}`;
}

let transactions = [];
let editingId = null;

// Submit Transaction
async function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '' || category.value.trim() === '') {
        alert('Please add a text, category and amount');
        return;
    }

    const amountValue = +amount.value;
    const finalAmount = type.value === 'expense' ? -Math.abs(amountValue) : Math.abs(amountValue);

    const transactionData = {
        text: text.value,
        category: category.value,
        amount: finalAmount,
        date: date.value,
        type: type.value
    };

    try {
        if (editingId) {
            // Update existing
            const res = await fetch(`${API_URL}/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(transactionData)
            });

            if (!res.ok) throw new Error('Failed to update');

            const data = await res.json();
            // Update local state
            transactions = transactions.map(t => t._id === editingId ? data.data : t);

            editingId = null;
            formBtn.innerText = 'Add transaction';
            formBtn.style.backgroundColor = 'var(--accent-color)';
        } else {
            // Create new
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(transactionData)
            });

            if (!res.ok) throw new Error('Failed to add');

            const data = await res.json();
            transactions.push(data.data);
        }

        updateValues();
        applyFilters();

        text.value = '';
        category.value = '';
        amount.value = '';
        date.value = '';
    } catch (err) {
        console.error(err);
        alert('Error saving transaction');
    }
}

// Get Transactions from API
async function getTransactions() {
    try {
        const res = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();

        transactions = data.data;

        updateValues();
        applyFilters();
    } catch (err) {
        console.error(err);
    }
}

// Edit Transaction Setup
function editTransaction(id) { // ID is string now (MongoDB _id)
    const transaction = transactions.find(t => t._id === id);
    if (!transaction) return;

    editingId = id;

    text.value = transaction.text;
    category.value = transaction.category || '';
    amount.value = Math.abs(transaction.amount);
    date.value = transaction.date || '';

    type.value = transaction.amount < 0 ? 'expense' : 'income';

    formBtn.innerText = 'Update Transaction';
    formBtn.style.backgroundColor = '#f39c12';
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    const absAmount = Math.abs(transaction.amount).toFixed(2);
    const dateStr = transaction.date ? ` <span class="date-small">(${transaction.date})</span>` : '';
    const categoryStr = transaction.category ? ` <span class="category-small">[${transaction.category}]</span>` : '';

    // Use _id for MongoDB ID
    item.innerHTML = `
    ${transaction.text} ${categoryStr} ${dateStr} 
    <span>${sign}LKR ${absAmount}</span> 
    <button class="edit-btn" onclick="editTransaction('${transaction._id}')"><i class="fas fa-edit"></i></button>
    <button class="delete-btn" onclick="removeTransaction('${transaction._id}')">x</button>
  `;

    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    ).toFixed(2);

    balance.innerText = `LKR ${total}`;
    money_plus.innerText = `+LKR ${income}`;
    money_minus.innerText = `-LKR ${expense}`;
}

// Remove transaction
async function removeTransaction(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) throw new Error('Failed to delete');

        transactions = transactions.filter(transaction => transaction._id !== id);

        if (editingId === id) {
            editingId = null;
            formBtn.innerText = 'Add transaction';
            formBtn.style.backgroundColor = 'var(--accent-color)';
            text.value = '';
            category.value = '';
            amount.value = '';
            date.value = '';
        }

        updateValues();
        applyFilters();
    } catch (err) {
        console.error(err);
        alert('Error deleting transaction');
    }
}

// Filter and Search Logic
function applyFilters() {
    const searchTerm = search.value.toLowerCase();
    const filterValue = document.querySelector('input[name="filter"]:checked').value;
    const sortValue = sortSelect.value;
    const periodValue = periodSelect.value;

    list.innerHTML = '';

    // 1. Filter
    let filtered = transactions.filter(transaction => {
        const matchesSearch = transaction.text.toLowerCase().includes(searchTerm) ||
            (transaction.category && transaction.category.toLowerCase().includes(searchTerm));

        let matchesFilter = true;
        if (filterValue === 'income') {
            matchesFilter = transaction.amount > 0;
        } else if (filterValue === 'expense') {
            matchesFilter = transaction.amount < 0;
        }

        let matchesPeriod = true;
        if (periodValue !== 'all' && transaction.date) {
            const tDate = new Date(transaction.date);
            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();

            if (periodValue === 'this-month') {
                matchesPeriod = tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
            } else if (periodValue === 'last-month') {
                const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                matchesPeriod = tDate.getMonth() === lastMonthDate.getMonth() && tDate.getFullYear() === lastMonthDate.getFullYear();
            }
        } else if (periodValue !== 'all' && !transaction.date) {
            matchesPeriod = false;
        }

        return matchesSearch && matchesFilter && matchesPeriod;
    });

    // 2. Sort
    filtered.sort((a, b) => {
        if (sortValue === 'newest') {
            return new Date(b.date || 0) - new Date(a.date || 0); // Newest first
        } else if (sortValue === 'oldest') {
            return new Date(a.date || 0) - new Date(b.date || 0);
        } else if (sortValue === 'highest') {
            return Math.abs(b.amount) - Math.abs(a.amount);
        } else if (sortValue === 'lowest') {
            return Math.abs(a.amount) - Math.abs(b.amount);
        }
        return 0;
    });

    filtered.forEach(addTransactionDOM);
}

// Export CSV
function exportCSV() {
    if (transactions.length === 0) {
        alert("No transactions to export.");
        return;
    }

    const headers = ['ID', 'Text', 'Category', 'Amount', 'Date', 'Type'];
    const rows = transactions.map(t => [
        t._id,
        `"${t.text}"`,
        `"${t.category || ''}"`,
        t.amount,
        t.date || '',
        t.amount > 0 ? 'Income' : 'Expense'
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Init
getTransactions();

form.addEventListener('submit', addTransaction);
search.addEventListener('input', applyFilters);
filterRadios.forEach(radio => radio.addEventListener('change', applyFilters));
sortSelect.addEventListener('change', applyFilters);
periodSelect.addEventListener('change', applyFilters);
exportBtn.addEventListener('click', exportCSV);
logoutBtn.addEventListener('click', logout);
