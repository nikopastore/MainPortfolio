console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}


let navLinks = $$('nav a');

let currentLink = navLinks.find((a) => {
  return a.href === location.href || a.href === location.origin + location.pathname;
});

if (currentLink) {
  currentLink.classList.add('current');
}
