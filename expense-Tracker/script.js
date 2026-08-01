const form = document.querySelector("form");
const description = document.querySelector("#description");
const amount = document.querySelector("#amount");
const category = document.querySelector("#category");
let transactions = null;
let clickDelete = false;

let color = "";
let balance = 0;
let income = 0;
let expenses = 0;
refreshSummary(balance, income, expenses);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (category.value == "exp100") {
    expenses = expenses + parseFloat(amount.value);
    balance = balance - parseFloat(amount.value);
    color = "rgb(192, 2, 2)";
  } else if (category.value == "inc100") {
    color = "#2e8b57";
    income = income + parseFloat(amount.value);
    balance = balance + parseFloat(amount.value);
  }

  document.querySelector(".transaction-list").innerHTML += `
            <li id="${category.value}" class="transaction " style="border-right: 4px solid ${color};">
            <span  class="category ${color}">${description.value}</span>
            <span class="value">$${amount.value}<small class="del-icon" title="Delete" onclick="deleteTransaction(event)">X</small></span>
          </li>
  `;
  refreshSummary(balance, income, expenses);

  form.reset();
});

function refreshSummary(balance, income, expenditure) {
  document.querySelector("#main-balance").innerHTML = "$" + balance;
  document.querySelector("#income-value").innerHTML = "$" + income;
  document.querySelector("#expenses-value").innerHTML = "$" + expenditure;
}

function deleteTransaction(event) {
  // event.stopPropagation();
  if (!clickDelete) {
    //this condition prevent multiple
    clickDelete = !clickDelete;

    let amount = Number(event.target.closest("span").textContent.slice(1, -1));
    let category = event.target.parentElement.parentElement.id;
    if (category == "exp100") {
      expenses -= amount;
      balance += amount;
    } else {
      income -= amount;
      balance -= amount;
    }

    event.target.parentElement.parentElement.remove();

    refreshSummary(balance, income, expenses);

    clickDelete = !clickDelete;
  }
}
function log(value) {
  console.log(value);
}
