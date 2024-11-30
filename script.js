// JavaScript for full functionality
document.addEventListener("DOMContentLoaded", () => {
    let currentBalance = 10000; // Initial balance
    const balanceDisplay = document.getElementById("balance");
    const fundOptions = document.getElementById("fundOptions");
  
    // Buttons
    const withdrawBtn = document.getElementById("withdrawBtn");
    const addFundBtn = document.getElementById("addFundBtn");
    const upiBtn = document.getElementById("upiBtn");
    const accountBtn = document.getElementById("accountBtn");
    const barcodeBtn = document.getElementById("barcodeBtn");
  
    // Orders and Investment
    const stockForm = document.getElementById("stockForm");
    const stockNameInput = document.getElementById("stockName");
    const stockAmountInput = document.getElementById("stockAmount");
    const ordersList = document.getElementById("ordersList");
  
    // Update balance display
    const updateBalanceDisplay = () => {
      balanceDisplay.textContent = `₹${currentBalance}`;
    };
  
    // Withdraw functionality
    withdrawBtn.addEventListener("click", () => {
      const amount = parseInt(prompt("Enter amount to withdraw:"));
      if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount!");
        return;
      }
      if (amount > currentBalance) {
        alert("Insufficient balance!");
        return;
      }
      currentBalance -= amount;
      alert(`₹${amount} withdrawn successfully.`);
      updateBalanceDisplay();
    });
  
    // Toggle fund options
    addFundBtn.addEventListener("click", () => {
      fundOptions.classList.toggle("hidden");
    });
  
    // Add funds
    const addFunds = (method) => {
      const amount = parseInt(prompt(`Enter amount to add via ${method}:`));
      if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount!");
        return;
      }
      currentBalance += amount;
      alert(`₹${amount} added via ${method} successfully.`);
      updateBalanceDisplay();
    };
  
    upiBtn.addEventListener("click", () => addFunds("UPI"));
    accountBtn.addEventListener("click", () => addFunds("Account"));
    barcodeBtn.addEventListener("click", () => addFunds("Barcode"));
  
    // Invest in stock
    stockForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const stockName = stockNameInput.value.trim();
      const stockAmount = parseInt(stockAmountInput.value);
  
      if (!stockName || isNaN(stockAmount) || stockAmount <= 0) {
        alert("Invalid stock name or amount!");
        return;
      }
  
      if (stockAmount > currentBalance) {
        alert("Insufficient balance for investment!");
        return;
      }
  
      // Deduct amount and update balance
      currentBalance -= stockAmount;
      updateBalanceDisplay();
  
      // Add order to the table
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${stockName}</td>
        <td>₹${stockAmount}</td>
        <td>${new Date().toLocaleDateString()}</td>
      `;
      ordersList.appendChild(newRow);
  
      // Clear form fields
      stockNameInput.value = "";
      stockAmountInput.value = "";
  
      alert(`₹${stockAmount} invested in ${stockName} successfully.`);
    });
  });
  