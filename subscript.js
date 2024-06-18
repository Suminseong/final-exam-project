document.getElementById('sub-1-section-1-logo').addEventListener('click', () => {
    location.href='index.html';
})

document.getElementById('footer-content-1-logo').addEventListener('click', () => {
    location.href='index.html';
})

document.getElementById('footer-content-1-SNS-1').addEventListener('click', () => {
    location.href='https://www.facebook.com/waveparkkor/';
})
document.getElementById('footer-content-1-SNS-2').addEventListener('click', () => {
    location.href='https://www.instagram.com/wavepark__?igsh=bXNuZHgxOGhiZGpx&utm_source=qr';
})
document.getElementById('footer-content-1-SNS-3').addEventListener('click', () => {
    location.href='https://https://x.com/siheung/status/1313652734789218304';
})

let isAnimating = false;

window.addEventListener('scroll', function () {
    if (isAnimating) return;

    let scrollTop = window.scrollY;

    const docuHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollableHeight = docuHeight - viewportHeight;
    const scrollProgress = scrollTop / scrollableHeight;
    const progressBarWidth = scrollProgress * 200;
    document.getElementById('scroll-progress-current').style.width = progressBarWidth + 'px';
})

const navButton = document.getElementById('menu');
const navCloseButton = document.getElementById('nav-close-icon')

navButton.addEventListener('click', function () {
    const navSection = document.getElementById('left-nav');
    navSection.classList.remove('hidden');  
    navSection.classList.add('viewded');
})

navCloseButton.addEventListener('click', function () {
    const navSection = document.getElementById('left-nav');
    navSection.classList.add('hidden');
    navSection.classList.remove('viewded');
})
