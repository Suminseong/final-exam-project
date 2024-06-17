window.addEventListener('load', function () {
    document.getElementById('loading-screen').style.display = 'none';
});

window.addEventListener('scroll', function () {
    let scrollTop = window.scrollY;
    // 텍스트 요소의 초기 위치 (픽셀 단위)
    const textBlackInitialTop = 250;
    const textWhiteInitialTop = 500;

    // 스크롤 속도 비율
    const textScrollFactor = 0.2;

    // 새로운 위치 계산
    const newTextBlackTop = textBlackInitialTop - (scrollTop * textScrollFactor);
    const newTextWhiteTop = textWhiteInitialTop - (scrollTop * textScrollFactor);

    // 텍스트 요소의 위치 업데이트
    document.getElementById('section-1-text-black').style.top = newTextBlackTop + 'px';
    document.getElementById('section-1-text-white').style.top = newTextWhiteTop + 'px';
    document.getElementById('section-1-text-blend').style.top = newTextWhiteTop + 'px';
    document.getElementById('section-1-text-white').classList.add('show-white-text');

    const titleImg = document.getElementById('section-1-img');
    const textWhite = document.getElementById('section-1-text-white');

    const imgRect = titleImg.getBoundingClientRect();
    const textWhiteRect = textWhite.getBoundingClientRect();

    // 이미지와 텍스트가 겹치는 부분을 계산하여 clip-path 업데이트
    if (textWhiteRect.bottom > imgRect.top && textWhiteRect.top < imgRect.bottom) {
        const overlapTop = Math.max(textWhiteRect.top, imgRect.top);
        const overlapBottom = Math.min(textWhiteRect.bottom, imgRect.bottom);

        const overlapHeight = overlapBottom - overlapTop;
        const textHeight = textWhiteRect.height;

        const clipTop = (overlapTop - textWhiteRect.top) / textHeight * 100;
        const clipBottom = (overlapBottom - textWhiteRect.top) / textHeight * 100;

        textWhite.style.clipPath = `polygon(0 ${clipTop}%, 0 ${clipBottom}%, 100% ${clipBottom}%, 100% ${clipTop}%)`;
    } else {
        textWhite.style.clipPath = 'polygon(0 0, 0 100%, 100% 100%, 100% 0)';
    }

    //스크롤 전환 기능부
    document.addEventListener('DOMContentLoaded', function() {
        const bottomMarker = document.getElementById('bottom-marker');
        const rowContent = document.querySelector('.row-content-cover');
        let isHorizontalScroll = false;
    
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top < window.innerHeight && rect.bottom >= 0
            );
        }
    
        function checkVisibility() {
            if (isInViewport(bottomMarker) && !isHorizontalScroll) {
                console.log('Bottom marker is in view!');
                isHorizontalScroll = true;
                document.body.style.overflowY = 'hidden'; // 수직 스크롤 비활성화
                document.body.style.overflowX = 'auto'; // 수평 스크롤 활성화
                rowContent.style.position = 'fixed';
                rowContent.style.top = bottomMarker.getBoundingClientRect().top + 'px';
                rowContent.style.left = '0px';
                rowContent.style.height = '100%';
                rowContent.style.whiteSpace = 'nowrap'; // 수평 스크롤 가능하도록 설정
            } else if (!isInViewport(bottomMarker) && isHorizontalScroll) {
                console.log('Bottom marker is out of view!');
                isHorizontalScroll = false;
                document.body.style.overflowY = 'auto'; // 수직 스크롤 활성화
                document.body.style.overflowX = 'hidden'; // 수평 스크롤 비활성화
                rowContent.style.position = 'static';
            }
        }
    
        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('resize', checkVisibility);
    
        // 초기 로드 시 요소가 이미 보이는지 체크
        checkVisibility();
    });

    // 스크롤 비율에 의해 이미지 크기 업데이트
    // 이미지 div width, height 제어
    const imgScaleFactor = 0.5;

    const imageScaleX = 1200;
    const imageScaleY = 1400;

    let newImageScaleX = imageScaleX + (imgScaleFactor * scrollTop);
    let newImageScaleY = imageScaleY + (imgScaleFactor * scrollTop);

    if (scrollTop > 800) {
        newImageScaleX = 1600;
        newImageScaleY = 1800;
    }

    titleImg.style.width = newImageScaleX + 'px';
    titleImg.style.height = newImageScaleY + 'px';

    // 스크롤 진행 바 업데이트
    const docuHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollableHeight = docuHeight - viewportHeight;
    const scrollProgress = scrollTop / scrollableHeight;
    const progressBarWidth = scrollProgress * 200;
    document.getElementById('scroll-progress-current').style.width = progressBarWidth + 'px';
    
});