// Mobile menu
function toggleMobile() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// Global Customization State
const LETTERS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const row = document.getElementById('letterRow');
const preview = document.getElementById('previewLetter');
let selectedLetter = null;
let selectedMat = 'plata';
let selectedTipo = 'Pulsera';

// Generate Letter Chips
if (row) {
  LETTERS.forEach(l => {
    const chip = document.createElement('div');
    chip.className = 'l-chip';
    chip.textContent = l;
    chip.setAttribute('role', 'button');
    chip.setAttribute('aria-label', 'Letra ' + l);
    chip.addEventListener('click', () => {
      document.querySelectorAll('.l-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedLetter = l;
      preview.textContent = l;
      preview.classList.add('selected');
      updatePedirBtn();
    });
    row.appendChild(chip);
  });
}

// Ambient letter cycle when none selected
const cycleLetters = ['A', 'F', 'M', 'S', 'C', 'L', 'R', 'E'];
let cIdx = 0;
setInterval(() => {
  if (!selectedLetter && preview) {
    preview.classList.remove('selected');
    preview.style.opacity = '0';
    setTimeout(() => {
      preview.textContent = cycleLetters[cIdx % cycleLetters.length];
      preview.style.opacity = '0.18';
      cIdx++;
    }, 300);
  }
}, 2800);

if (preview) {
  preview.style.transition = 'opacity .3s ease, font-size .3s ease, color .3s ease';
}

// Material select
function selectMat(el) {
  document.querySelectorAll('.mat-opt').forEach(m => m.classList.remove('active-mat'));
  el.classList.add('active-mat');
  selectedMat = el.dataset.mat;
  updatePedirBtn();
}

// Tipo select
function selectTipo(el) {
  document.querySelectorAll('.tipo-chip').forEach(t => t.classList.remove('active-tipo'));
  el.classList.add('active-tipo');
  selectedTipo = el.textContent;
  updatePedirBtn();
}

// Update WhatsApp link with selection
function updatePedirBtn() {
  const pedirBtn = document.getElementById('pedirBtn');
  if (pedirBtn) {
    const letra = selectedLetter || '?';
    const msg = encodeURIComponent(`Hola! Quiero pedir una ${selectedTipo} con la letra "${letra}" en ${selectedMat}. ¿Me podés dar más info?`);
    pedirBtn.href = `https://wa.me/5491100000000?text=${msg}`;
  }
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 90);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => obs.observe(el));

// Nav shrink on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.style.padding = window.scrollY > 50 ? '1rem 3rem' : '1.4rem 3rem';
  }
});