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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

console.log(btnScrollTo);

btnScrollTo.addEventListener('click', function (e) {
  console.log('button clicked');

  //Gets section1 coordinates
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords.top);
  // console.log(e.target.getBoundingClientRect());

  // console.log(window.scrollX, window.scrollY);

  //Scroll to the section1 passing an option object

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');

// h1.onmouseenter = function (e) {
//   alert('Hello, world!');
// };

const alertH1 = function (e) {
  alert('Wish you a happy new year');

  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

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

//Event propagation
const featuresLink = document.querySelector('.nav__link');
const navItem = document.querySelector('.nav__item');
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('nav');

const randInt = (min, max) => Math.floor((max - min + 1) * Math.random());
