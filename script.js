window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;

    // 텍스트 요소의 초기 위치 (픽셀 단위)
    const textBlackInitialTop = 640 * 0.4;
    const textWhiteInitialTop = 640 * 0.7;

    // 스크롤 속도 비율
    const textScrollFactor = 0.2;

    // 새로운 위치 계산
    const newTextBlackTop = textBlackInitialTop - (scrollTop * textScrollFactor);
    const newTextWhiteTop = textWhiteInitialTop - (scrollTop * textScrollFactor);

    // 텍스트 요소의 위치 업데이트
    document.getElementById('section-1-text-black').style.top = newTextBlackTop + 'px';
    document.getElementById('section-1-text-white').style.top = newTextWhiteTop + 'px';
    document.getElementById('section-1-text-blend').style.top = newTextWhiteTop + 'px';

    // 스크롤 진행 바 업데이트
    const docuHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollableHeight = docuHeight - viewportHeight;
    const scrollProgress = scrollTop / scrollableHeight;
    const progressBarWidth = scrollProgress * 180;
    document.getElementById('scroll-progress-current').style.width = progressBarWidth + 'px';
});