// A property can supply its own opening; other properties retain their still hero.
(() => {
  const hero = document.querySelector('.hero');
  const video = document.getElementById('arrival-video');
  const control = document.getElementById('arrival-control');
  const still = document.getElementById('hero-image');
  if (property !== window.PROPERTIES.flamingo) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let fallbackTimer;
  const reveal = () => { clearTimeout(fallbackTimer); hero.classList.remove('arrival-playing'); };
  const fallback = () => { video.pause(); video.hidden = true; reveal(); control.textContent = 'Play opening film'; };
  video.src = 'assets/premier-arrival.mp4';
  video.poster = 'assets/premier-arrival-end.jpg';
  still.src = video.poster;
  still.alt = 'Living room at the end of the cinematic property arrival';
  control.hidden = false;
  const start = () => {
    video.hidden = false;
    video.muted = true;
    fallbackTimer = setTimeout(fallback, 8000);
    video.play().catch(fallback);
  };
  video.addEventListener('playing', () => {
    clearTimeout(fallbackTimer);
    hero.classList.add('arrival-playing');
    control.textContent = 'Pause film';
  });
  video.addEventListener('ended', () => { reveal(); control.textContent = 'Replay film'; });
  video.addEventListener('error', fallback);
  video.addEventListener('waiting', () => { fallbackTimer = setTimeout(fallback, 8000); });
  control.addEventListener('click', () => {
    if (!video.paused && !video.ended) { video.pause(); reveal(); control.textContent = 'Resume film'; }
    else { if (video.ended) video.currentTime = 0; start(); }
  });
  reduced.addEventListener('change', () => { if (reduced.matches) fallback(); });
  if (reduced.matches || navigator.connection?.saveData) fallback();
  else start();
})();
