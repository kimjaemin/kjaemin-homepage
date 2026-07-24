const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const header = document.getElementById('siteHeader');
const hero = document.querySelector('.hero, .project-hero');

function onScroll(){
  const scrolled = window.scrollY > 12;
  header.classList.toggle('scrolled', scrolled);
  if (hero) {
    const heroRect = hero.getBoundingClientRect();
    header.classList.toggle('on-hero', heroRect.bottom > 80);
  }
}
onScroll();
window.addEventListener('scroll', onScroll, {passive:true});

const menuBtn = document.getElementById('menuBtn');
const siteNav = document.getElementById('siteNav');
menuBtn.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? 'Close' : 'Menu';
});
siteNav.querySelectorAll('.navlink').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = 'Menu';
  });
});

// Language toggle (KO / EN)
const langButtons = document.querySelectorAll('.lang-switch button[data-lang-set]');
function applyLang(lang){
  const l = lang === 'en' ? 'en' : 'ko';
  document.documentElement.setAttribute('data-lang', l);
  document.documentElement.setAttribute('lang', l);
  try { localStorage.setItem('lang', l); } catch(e) {}
  langButtons.forEach(btn => {
    const active = btn.getAttribute('data-lang-set') === l;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}
let savedLang = 'ko';
try { savedLang = localStorage.getItem('lang') || 'ko'; } catch(e) {}
applyLang(savedLang);
langButtons.forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang-set')));
});
