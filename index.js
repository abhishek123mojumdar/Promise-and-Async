// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h4>Promises and Async</h4>`;
document.getElementById('btn').addEventListener('click', myFunction);
var stars = document.querySelectorAll('.stars a');
stars.forEach((star, clickedIndex) => {
  star.addEventListener('click', () => {
    stars.forEach((otherStar, otherIndex) => {
      if (otherIndex <= clickedIndex) {
        otherStar.classList.add('active');
      } else {
        otherStar.classList.remove('active');
      }
    });
    console.log('star of index ' + clickedIndex + ' was clicked');
  });
});

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

const loggerFunc = () => {
  console.count('Throttled Function');
};

const throttle = (fn, limit) => {
  let flag = true;
  return function (e) {
    let context = this;
    let args = arguments;
    if (flag) {
      console.log(e.target.value);
      fn.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
};

const betterLoggerFunction = throttle(loggerFunc, 2000);

document
  .getElementById('throttled')
  .addEventListener('input', betterLoggerFunction);

// ---------------------------- debouncing ---------------------------//

const loggerFuncDeb = (counter, val) => {
  console.count('debounced Function,' + counter + '  ' + val);
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
