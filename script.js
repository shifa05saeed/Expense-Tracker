document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalExpense = document.getElementById('total-expense');
  
    
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
   
    function renderExpenses() {
      expenseList.innerHTML = '';
      let total = 0;
      expenses.forEach((expense, index) => {
        total += expense.amount;
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${expense.date}</td>
          <td>${expense.category}</td>
          <td>$${expense.amount.toFixed(2)}</td>
          <td>${expense.notes}</td>
          <td><button class="expense-delete" onclick="deleteExpense(${index})">Delete</button></td>
        `;
        expenseList.appendChild(row);
      });
      
      totalExpense.textContent = `Total Expenditure: $${total.toFixed(2)}`;
      
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  
    
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(expenseForm);
      const newExpense = {
        date: formData.get('date'),
        category: formData.get('category'),
        amount: parseFloat(formData.get('amount')),
        notes: formData.get('notes')
      };
      expenses.push(newExpense);
      renderExpenses();
      expenseForm.reset();
    });
  
    // Delete expense
    window.deleteExpense = (index) => {
      expenses.splice(index, 1);
      renderExpenses();
    };
  
    // Initial rendering
    renderExpenses();
  });
  