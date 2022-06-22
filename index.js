// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Promises and Async</h1>`;
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
        <h4 style="text-align:center">${country.Country}<h4>
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
