async function fetchText() {
  /*fetch currency exchange data*/
  let response = await fetch(
    "https://api.currencyapi.com/v3/latest?apikey=UdkrueOHBjiJCVxKNOo6F25KOfyWGymxRKJZDYZt"
  );
  let datax = await response.json();
  const data = datax.data;
  const arrayOfData = Object.entries(data);

  let names_values = arrayOfData.map((el) => {
    let name_value_obj = el[1];
    console.log("NEW STRUTRE", Object.values(name_value_obj));
    return Object.values(name_value_obj); // update data structure
  });
  console.log("return", names_values);
  return names_values;
}

let currencyForm1 = document.getElementById("firstInputCurrency");
let dropDownOne = document.getElementById("currencyFrom");
let dropDownTwo = document.getElementById("currencyTo");
let inputValue1 = document.getElementById("value1");

fetchText().then((names_values) => {
  // get names and values after they have fully loaded
  const dropDownHolderFrom = document.getElementById("currencyFrom");
  const dropDownHolderTo = document.getElementById("currencyTo");
  names_values.forEach((el) => {
    // loop round names & values
    const dropDownOptions = document.createElement("option");
    const dropDownOptions2 = document.createElement("option");
    dropDownHolderFrom.append(dropDownOptions);
    dropDownOptions.append(el[0]); // assign names to drop down
    dropDownOptions.setAttribute("value", el[1]); // assign exchange rates to corresponding dropdown name
    if (el[0] == "GBP") {
      //set GBP as the initial drop down value
      inputValue1.defaultValue = Number(el[1]).toFixed(2);
      dropDownOptions.setAttribute("selected", "selected");
    }

    dropDownHolderTo.append(dropDownOptions2);
    dropDownOptions2.append(el[0]);
    dropDownOptions2.setAttribute("value", el[1]);
    if (el[0] == "USD") {
      //set USD as the initial drop down value
      dropDownOptions2.setAttribute("selected", "selected");
    }
  });
  convert(); //call convert function to show initial value
});

const convertIntoCurrencyPairs = (currencyOne, currencyTwo) => {
  // calculates exchange rates
  let firstCurrencyAndUSD = currencyOne / 1;
  let USDandSecondCurrency = 1 / currencyTwo;
  let exchangeRate = firstCurrencyAndUSD * USDandSecondCurrency;
  return exchangeRate;
};

const getValueOfExchange = (value, exchangeRates) => {
  // calculates the amount
  let amount = value / exchangeRates;
  return amount;
};

const convert = () => {
  const ptag = document.getElementById("amount");
  if (inputValue1.value < 0) {
    // ensures no negative numbers can be added
    return (ptag.innerHTML = "0.00");
  }
  let exchangeRates = convertIntoCurrencyPairs(
    dropDownOne.value,
    dropDownTwo.value
  );
  let amount = getValueOfExchange(inputValue1.value, exchangeRates); // passes the user input and value of exchange rates to function
  ptag.innerHTML = amount.toFixed(2); // fixed to 2 decimal places
};

currencyForm1.addEventListener("keyup", convert); // input event listener
dropDownOne.addEventListener("change", convert); // first drop down event listener
dropDownTwo.addEventListener("change", convert); // second drop down event listener

/*
GDP/JPY

GDP/USD = 1.2343
USD/JPY = 110.215

1.2343 x 110.215 = 143.12 <- currency exchange pair 
*/
