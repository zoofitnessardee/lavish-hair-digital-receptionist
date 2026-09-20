let inactivityTimer;
const screens = [...document.querySelectorAll('.screen')];

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  resetInactivityTimer();
}

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  if (document.getElementById('welcome')?.classList.contains('active')) return;
  inactivityTimer = setTimeout(() => showScreen('welcome'), 90000);
}

document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-go]');
  if (trigger) {
    showScreen(trigger.dataset.go);
    return;
  }
  resetInactivityTimer();
});

document.addEventListener('touchstart', resetInactivityTimer, { passive: true });
resetInactivityTimer();
