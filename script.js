const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(" form button");

const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    updateExchangeRate();
});
for (let select of dropdown) {
    for (currCode in (countryList)) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);

    }

    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector("img").src = newSrc;
};

btn.addEventListener("click", (event) => {
    event.preventDefault();
    updateExchangeRate();

});

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let Rate = data[toCurrency.value.toLowerCase()];
    let finalAmt = amount * Rate;
    msg.innerText = `${amtValue} ${fromCurrency.value} = ${finalAmt} ${toCurrency.value}`;
};