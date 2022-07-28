// Import stylesheets
import './style.css';

// Write Javascript code!

let list = [
  {
    name: 'Abhishek',
    age: 29,
    kpi: 1,
  },
  {
    name: 'Anukriti',
    age: 27,
    kpi: 2,
  },
];

document.addEventListener('click', (e) => {
  if (e.target.matches('div')) {
    console.log(e.target);
    if (e.target.className === 'userBox') {
      console.log(e.target.innerHTML);
    }
  }
});

let call = document.getElementById('call');
let callUsersBtn = document.getElementById('callUsers');

let callSetTimeoutPromise = function resolveData() {
  callSetTimeout().then((html) => {
    console.log(html);
    document.querySelector('.showResult').innerHTML = html;
  });
};

let callUsers = function resolveDataUsers() {
  callUsersUsingPromise().then((users) => {
    let html = ``;
    console.log(users);
    users.forEach((user) => {
      let backgroundColor =
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')
          .toUpperCase();
      html =
        html +
        `<div class="userBox" style="background-color:${backgroundColor}">${user.name}</div>`;
    });
    document.querySelector('.showResultUsers').innerHTML = html;
  });
};

call.addEventListener('click', callSetTimeoutPromise);
callUsersBtn.addEventListener('click', callUsers);

function callSetTimeout() {
  let html = '';
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      list.forEach((ele) => {
        html =
          html +
          `<li>Name : ${ele.name} &nbsp; ||  &nbsp; Age : ${ele.age}</li>`;
      });
      html = `<ul>${html}</ul>`;
      resolve(html);
    }, 1000);
  });
}

function callUsersUsingPromise() {
  let html = '';
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.responseType = 'json';
    xhr.send();
    // the response is {"message": "Hello, world!"}
    xhr.onload = function () {
      let responseObj = xhr.response;
      resolve(responseObj);
    };
  });
}
