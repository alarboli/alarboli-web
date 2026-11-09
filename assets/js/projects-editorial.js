(() => {
  'use strict';
  const links = Array.from(document.querySelectorAll('[data-gallery-item]'));
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;
  const dialog = document.createElement('dialog');
  dialog.className = 'project-lightbox';
  dialog.setAttribute('aria-label', 'Galería de fotografías');
  dialog.innerHTML = '<div class="project-lightbox-bar"><span class="project-lightbox-count" aria-live="polite"></span><button type="button" class="project-lightbox-close" autofocus>Cerrar ×</button></div><img alt=""><p class="project-lightbox-caption" aria-live="polite"></p><div class="project-lightbox-controls"><button type="button" class="project-lightbox-prev">← Anterior</button><button type="button" class="project-lightbox-next">Siguiente →</button></div>';
  document.body.appendChild(dialog);
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('.project-lightbox-caption');
  const count = dialog.querySelector('.project-lightbox-count');
  let current = 0;
  let origin;
  let previousOverflow = '';
  const show = (index) => {
    current = (index + links.length) % links.length;
    image.src = links[current].href;
    image.alt = links[current].querySelector('img').alt;
    caption.textContent = links[current].dataset.caption || '';
    count.textContent = `${current + 1} / ${links.length}`;
  };
  links.forEach((link, index) => link.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    origin = link;
    show(index);
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
  }));
  dialog.querySelector('.project-lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.project-lightbox-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.project-lightbox-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    if (origin) origin.focus();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
})();
