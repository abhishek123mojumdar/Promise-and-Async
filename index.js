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
  if (e.target.matches('span')) {
    console.log(e.target.innerHTML);
    //alert(e.target.innerHTML);
  }
});

let call = document.getElementById('call');
let callUsersBtn = document.getElementById('callUsers');
let promiseAll = document.getElementById('promiseAll');
let noOfUsers = document.getElementById('noOfUsers');
let noOfPosts = document.getElementById('noOfPosts');
let noOfComments = document.getElementById('noOfComments');

let callSetTimeoutPromise = function resolveData() {
  callSetTimeout().then((html) => {
    document.querySelector('.showResult').innerHTML = html;
  });
};

let callUsers = function resolveDataUsers() {
  callUsersUsingPromise().then((users) => {
    let html = ``;
    users.forEach((user) => {
      let backgroundColor =
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')
          .toUpperCase();
      html =
        html +
        `<div class="userBox" style="background-color:${backgroundColor}"><span>${user.name}</span></div>`;
    });
    document.querySelector('.showResultUsers').innerHTML = html;
  });
};

call.addEventListener('click', callSetTimeoutPromise);
callUsersBtn.addEventListener('click', callUsers);
promiseAll.addEventListener('click', usePromiseAll);

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
    }, 4000);
  });
}

// the below is an implementation of how to use a promise object to call an api

function callUsersUsingPromise() {
  let html = '';
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function () {
      let responseObj = xhr.response;
      resolve(responseObj);
    };
  });
}

// The below is an implementation of promise all , Here in the .all function we pass a list of promises as shown blow , this function returns us a list of all resolved promise , but if any of the promise fails Promise.all fails and goes into the catch condition.  Promise.allSettlled returns us all the promises with proper states even if they are failed

function usePromiseAll() {
  let userPromise = fetch('https://jsonplaceholder.typicode.com/users').then(
    (data) => data.json()
  );
  let postPromise = fetch('https://jsonplaceholder.typicode.com/posts')
    .then((data) => data.json())
    .catch((err) => {
      console.log(err);
    });
  let commentPromise = fetch(
    'https://jsonplaceholder.typicode.com/comments'
  ).then((data) => data.json());

  let customPromise = new Promise((resolve, reject) => {
    //reject('This Promise is rejected');
    resolve('This promise is good to go');
  });
  Promise.all([userPromise, postPromise, commentPromise, customPromise])
    .then((promiseResp) => {
      console.log(promiseResp);
      noOfUsers.innerHTML = `No of Users : ${promiseResp[0].length}`;
      noOfPosts.innerHTML = `No of Posts : ${promiseResp[1].length}`;
      noOfComments.innerHTML = `No of commnets : ${promiseResp[2].length}`;
    })
    .catch((error) => {
      console.log('Error Has occured');
    });

  // Promise.allSettled([userPromise, postPromise, commentPromise, customPromise])
  //   .then((promiseResp) => {
  //     console.log(promiseResp);
  //     noOfUsers.innerHTML = `No of Users : ${promiseResp[0].length}`;
  //     noOfPosts.innerHTML = `No of Posts : ${promiseResp[1].length}`;
  //     noOfComments.innerHTML = `No of commnets : ${promiseResp[2].length}`;
  //   })
  //   .catch((error) => {
  //     console.log('Error Has occured');
  //   });
}

let para = document.getElementById('para');
let load = document.getElementById('load');
let loading = false;

let callLoadPromise = function () {
  callSetTimeOut()
    .then((data) => {
      console.log(data);
      loading = false;
      if (!loading) {
        para.innerHTML = data;
        para.style.color = 'green';
      }
    })
    .catch((e) => {
      para.innerHTML = e;
      para.style.color = 'red';
    });
};

function callSetTimeOut() {
  loading = true;
  if (loading) {
    para.innerHTML = 'Loading......';
    para.style.color = 'red';
  }
  return new Promise((res, reject) => {
    setTimeout(() => {
      res('Data is loaded');
      reject('There is some error ! Data can not be loaded');
    }, 7000);
  });
}

load.addEventListener('click', callLoadPromise);
