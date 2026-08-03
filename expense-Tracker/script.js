const form = document.querySelector("form");
const description = document.querySelector("#description");
const amount = document.querySelector("#amount");
const category = document.querySelector("#category");
let transactionsData = JSON.parse(localStorage.getItem("transactions")) || [];

let transactions = null;
let clickDelete = false;
let color = "";
let balance = 0;
let income = 0;
let expenses = 0;

addTransaction(transactionsData);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let newTransaction = [{
    id: Date.now(),
    description: description.value,
    amount: parseFloat(amount.value),
    category: category.value,
  }]
  transactionsData.push(...newTransaction);
  // console.log(transactionsData);

  localStorage.setItem("transactions", JSON.stringify(transactionsData));
  addTransaction(newTransaction);

  form.reset();
});

function addTransaction(transactionsData) {
  document.querySelector(".transaction-list").innerHTML += "";
  for (let i = 0; i < transactionsData.length; i++) {
    if (transactionsData[i].category == "exp100") {
      // alert(transactionsData[i].category)
      expenses = expenses + parseFloat(transactionsData[i].amount);
      color = "rgb(192, 2, 2)";
    } else if (transactionsData[i].category == "inc100") {
      // alert(transactionsData[i].category)
      color = "#2e8b57";
      income = income + parseFloat(transactionsData[i].amount);
    }
    balance = income - expenses;

    document.querySelector(".transaction-list").innerHTML += `
            <li id="${transactionsData[i].category}" class="transaction " style="border-right: 4px solid ${color};">
            <span  class="category ${color}">${transactionsData[i].description}</span>
            <span class="value">$${transactionsData[i].amount}<small id= ${transactionsData[i].id} class="del-icon" title="Delete" onclick="deleteTransaction(event)">X</small></span>
          </li>
  `;
  }
   updateSummary(income, expenses, balance);


 
}

function updateSummary() {
  document.querySelector("#main-balance").innerHTML = "$" + balance;
  document.querySelector("#income-value").innerHTML = "$" + income;
  document.querySelector("#expenses-value").innerHTML = "$" + expenses;
}
function deleteTransaction(event) {
  if (!clickDelete) {
    clickDelete = !clickDelete;

    let clickID = event.target.id;

    let deleteItem = transactionsData.find((index) => index.id == clickID);
    transactionsData = transactionsData.filter((index) => {
      return index.id !== deleteItem.id;
    });

    if (deleteItem.category == "exp100") {
      expenses = expenses - deleteItem.amount;
      balance = balance + deleteItem.amount;
    } else if (deleteItem.category == "inc100") {
      income = income - deleteItem.amount;
      balance = balance - deleteItem.amount;
    }
    updateSummary();
    localStorage.setItem("transactions", JSON.stringify(transactionsData));
    event.target.parentElement.parentElement.remove();
    // addTransaction()
    clickDelete = !clickDelete;
  }
}
function log(value) {
  console.log(value);
}
