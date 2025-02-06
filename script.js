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
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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

//TABS
//Adds event listener to tabsContainer
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return;

  tabs.forEach(function (el, i) {
    //Remove the operations__tab--active on each of the elements
    el.classList.remove('operations__tab--active');
    //Removes the active class on all of the content elements
    tabsContent[i].classList.remove('operations__content--active');
  });

  clicked.classList.add('operations__tab--active');

  //CONTENT
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//MENU FADE ANIMATION
const handleHover = function (event, opacity) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(function (el) {
      if (el !== link) {
        el.style.opacity = opacity;
        logo.style.opacity = opacity;
      }
    });
  }
};

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

//Sticky navigation
// const s1Coords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   console.log(e);
//   if (window.scrollY >= s1Coords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  // console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

navObserver.observe(header);

//REVEAL SECTIONS

const sections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');

    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

sections.forEach(function (cur) {
  cur.classList.add('section--hidden');
  sectionObserver.observe(cur);
});

//Lazy Image Implementation
const imgTarget = document.querySelectorAll('img[data-src]');

const revealImages = function (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    //Displays image once the replacement image is fully loaded and well displayed

    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
  });
};

const imagesObserver = new IntersectionObserver(revealImages, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(function (el) {
  imagesObserver.observe(el);
});

//SLIDER
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');

// slider.style.transform = `scale(0.3)`;
// slider.style.overflow = `visible`;
let curSlide = 0;
const maxSlides = slides.length;

//DOTS INSERTION
const dotsCreation = function () {
  slides.forEach(function (_, i) {
    // const dotEl = document.createElement('button');
    // dotEl.classList.add('dots__dot');
    // dotEl.setAttribute('data-slide', i);

    // dotContainer.append(dotEl.cloneNode(true));

    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

dotsCreation();

//ACTIVATE THE DOTS

const activateDots = function (slide) {
  slides.forEach(function (s) {
    s.classList.remove('dots__dot--active');
  });

  slide.add.classlist('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach(function (s, index) {
    s.style.transform = `translateX(${100 * (index - slide)}%)`;
  });
};

const slideRight = function () {
  if (curSlide === maxSlides - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
};

const slideLeft = function () {
  if (curSlide === 0) {
    curSlide = maxSlides - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
};

goToSlide(0);

//Button right functionality
btnRight.addEventListener('click', slideRight);
btnLeft.addEventListener('click', slideLeft);

//Slider Part 2

document.addEventListener('keydown', function (e) {
  // console.log(e.key);

  if (e.key === 'ArrowRight') slideRight();

  if (e.key === 'ArrowLeft') slideLeft();
});

//Dots functionality

dotContainer.addEventListener('click', function (e) {
  //GUARD CLAUSE
  if (!e.target.classList.contains('dots__dot')) return;

  curSlide = e.target.dataset.slide;

  // console.log(e.target);

  goToSlide(curSlide);
});

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
