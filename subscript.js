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
    console.log(scrollY)
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
const navSection = document.getElementById('left-nav');

navButton.addEventListener('click', function () {
    navSection.classList.remove('hidden');  
    navSection.classList.add('viewded');
    navButton.style.transform = 'rotate(90deg)'; 
})

navCloseButton.addEventListener('click', function () {
    navSection.classList.add('hidden');
    navSection.classList.remove('viewded');
    navButton.style.transform = 'rotate(0deg)'; 
})

const navBtn1 = document.querySelector('.scroll-to-1');
const navBtn2 = document.querySelector('.scroll-to-2');
const navBtn3 = document.querySelector('.scroll-to-3');


navBtn1.addEventListener('click', () => {
    window.scrollTo({
        top: 0
    })
    navSection.classList.add('hidden');  
    navSection.classList.remove('viewded');
    navButton.style.transform = 'rotate(0deg)'; 
})
navBtn2.addEventListener('click', () => {
    window.scrollTo({
        top: 1100
    })
    navSection.classList.add('hidden');  
    navSection.classList.remove('viewded');
    navButton.style.transform = 'rotate(0deg)'; 
})
navBtn3.addEventListener('click', () => {
    window.scrollTo({
        top: 2200
    })
    navSection.classList.add('hidden');  
    navSection.classList.remove('viewded');
    navButton.style.transform = 'rotate(0deg)'; 
})
