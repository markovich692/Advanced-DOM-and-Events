'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// const section2 = document.querySelector('#section--2');
// const section3 = document.querySelector('#section--3');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Scrolling Functionality
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');

//PAGE NAVIGATION

// document.querySelectorAll('.nav__link').forEach(function (el, i) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed component

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

//Adds event listener to tabsContainer
tabsContainer.addEventListener('click', function (e) {
  let clicked = e.target;

  clicked.classList.contains('operations__tab')
    ? (clicked = e.target)
    : (clicked = clicked.parentElement);

  clicked.classList.add('operations__tab--active');

  tabs.forEach(function (el, i) {
    if (el.dataset.tab !== clicked.dataset.tab) {
      el.classList.remove('operations__tab--active');
    }
  });
});

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

//Going Downwards
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);

//Going upwards
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.setProperty(
//   'background',
//   'var(--gradient-secondary)'
// );

//Going sideways
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// h1.onmouseenter = function (e) {
//   alert('Hello, world!');
// };

// const alertH1 = function (e) {
//   alert('Wish you a happy new year');

//   h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// console.log(btnScrollTo);

//Create a message DOM element Object
// const message = document.createElement('div');

//Add a classlist of cookie-message
// message.classList.add('cookie-message');

// message.innerHTML = `We use cookies for improved functionalities
// and analytics <button class='btn btn--close-cookie'>Got it!</button>`;

//TEST
// console.log(message.cloneNode(true));

//Inserts the message element in the DOM
// header.append(message);

// Adds an event listener to the button close cookie
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//Delete the element on click
// message.remove();
// message.parentElement.removeChild(message);
// });

//Set the element backgound-color and width
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// message.style.setProperty('width', '120%');

// console.log(message.style.width);

// console.log(getComputedStyle(message).height);

//Parse the computed height and add 40 px to it
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

// console.log(message.style.height);

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// console.log(document.querySelector('.nav__logo').getAttribute('design'));

//EVENT PROPAGATION
// const featuresLink = document.querySelector('.nav__link');
// const navLinks = document.querySelector('.nav__links');
// const nav = document.querySelector('nav');

// const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randInt(0, 255)},${randInt(0, 255)},${randInt(0, 255)})`;

// featuresLink.addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log('LINK');
//   //Stop propagation
//   // e.stopPropagation();
//   console.log(e.target, e.currentTarget);
// });

// navLinks.addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log('NAV LINKS');
//   console.log(e.target, e.currentTarget);
// });

// nav.addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log('NAV');
//   console.log(e.target, e.currentTarget);
// });
