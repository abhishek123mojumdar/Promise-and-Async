// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h4>Promises and Async</h4>`;
document.getElementById('btn').addEventListener('click', myFunction);

function myFunction() {
  var html = ``;
  fetch('https://api.covid19api.com/summary')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let countries = data.Countries;
      countries.forEach((country, index) => {
        if (index < 5) {
          html =
            html +
            `<div class="card" id="${country.Country}">
        <div class="card-content">
        <h5 style="text-align:center">${country.Country}<h5>
        <hr>
        <p> Total confirmed : ${country.TotalConfirmed}</p>
        <p> Total deaths : ${country.TotalDeaths}</p>
        </div>
        </div>`;
        }
      });
      console.log(html);
      document.getElementById('cardEle').innerHTML = html;
    })
    .catch((err) => {
      console.log('error encountered ', err);
    });
}
// ------------------------Throttling -------------------------//

var input = document.getElementById('throttled');
var throttleOnInput = throttle(callApi);
input.addEventListener('input', throttleOnInput);

function throttle(callApi) {
  let throttleFlag = true;
  return function (e) {
    if (throttleFlag) {
      callApi(e.target.value);
    }
    throttleFlag = false;
    setTimeout(() => {
      throttleFlag = true;
    }, 2000);
  };
}

function callApi(inputString) {
  console.log('***** ' + inputString);
}

// ---------------------------- debouncing ---------------------------//

const loggerFuncDeb = (counter, val) => {
  console.log('debounced Function,' + counter + '  ' + val);
};

const debounce = (fn, limit) => {
  let timer;
  let counter = 0;
  return function (e) {
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      counter++;
      fn.call(context, counter, e.target.value);
    }, limit);
  };
};

const betterLoggerDebouoncedFunction = debounce(loggerFuncDeb, 200);

document
  .getElementById('debounced')
  .addEventListener('keypress', betterLoggerDebouoncedFunction);
