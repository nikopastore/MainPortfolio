console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}


let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'cv/', title: 'CV' },
  { url: 'https://github.com/nikopastore', title: 'GitHub Profile' },
];

const ARE_WE_HOME = document.documentElement.classList.contains('home');

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;

  if (!ARE_WE_HOME && !url.startsWith('http')) {
    url = '../' + url;
  }

  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;

  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }

  if (a.host !== location.host) {
    a.target = '_blank';
  }

  nav.append(a);
}


document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <label class="color-scheme">
    Theme:
    <select>
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
  `
);

let select = document.querySelector('.color-scheme select');

function setColorScheme(scheme) {
  document.documentElement.style.setProperty('color-scheme', scheme);
  localStorage.colorScheme = scheme;
  select.value = scheme;
}

select.addEventListener('input', function (event) {
  setColorScheme(event.target.value);
});

if ('colorScheme' in localStorage) {
  setColorScheme(localStorage.colorScheme);
}

let form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let data = new FormData(form);

    let mailto = form.action + '?';

    let params = [];

    for (let [name, value] of data) {
      params.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
    }

    mailto += params.join('&');
    console.log('mailto URL:', mailto);

    location.href = mailto;
  });
}