window.addEventListener('scroll', function(){
    const docuHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    const scrollTop = window.scrollY;

    const scrollableHeight = docuHeight - viewportHeight;
    const scrollProgress = scrollTop / scrollableHeight;

    const progressBarWidth = scrollProgress * 180;

    document.getElementById('scroll-progress-current').style.width = progressBarWidth+ 'px';
})