const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Toggle navigation');
  menuToggle.textContent = isOpen ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Toggle navigation');
  menuToggle.textContent = '☰';
}));
document.querySelectorAll('.faq-list details').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) document.querySelectorAll('.faq-list details').forEach(other => { if (other !== item) other.open = false; });
  });
});
document.getElementById('year').textContent = new Date().getFullYear();


// Reader review slider: one review at a time, with arrows and direct dot navigation.
const reviewTrack = document.getElementById('review-track');
if (reviewTrack) {
  const reviewSlides = Array.from(reviewTrack.querySelectorAll('.review-slide'));
  const reviewDots = Array.from(document.querySelectorAll('.review-dot'));
  let activeReview = 0;
  const showReview = (index) => {
    activeReview = (index + reviewSlides.length) % reviewSlides.length;
    reviewTrack.style.transform = `translateX(-${activeReview * 100}%)`;
    reviewDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeReview);
      if (i === activeReview) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };
  document.getElementById('review-prev').addEventListener('click', () => showReview(activeReview - 1));
  document.getElementById('review-next').addEventListener('click', () => showReview(activeReview + 1));
  reviewDots.forEach((dot, i) => dot.addEventListener('click', () => showReview(i)));
}
