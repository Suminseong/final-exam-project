window.addEventListener('load', function () {
    document.getElementById('loading-screen').style.display = 'none';
});

let totalScroll = 0;

//스로틀링과 섹션단위 횡스크롤 기본정보

let isThrottled = false;
const sectionCount = document.querySelectorAll('.content-section-row-part').length;
let currentSection = 0;

function throttle(func, delay) {
    if (isThrottled) return;
    isThrottled = true;
    setTimeout(() => {
        func();
        isThrottled = false;
    }, delay);
}

function scrollToSection(index) {
    const section = document.querySelector(`#section-row-part-${index + 1}`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

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

    const horizonalContents = document.querySelector('.row-content');

    //바닥인식
    let horizonScroll = 0;

    // 969에서 155 1329에서 150이 나오게 하는 식을 세워보니 −0.0139h+168.9583
    vhCorrectionVal = (-0.0130 * viewportHeight) + 169.0583 - 32 ;

    if (scrollTop > 6420 && scrollTop < 8120) {
        horizonScroll = (scrollTop - 6420) * 3;
        console.log(scrollTop)
        // horizonalContents.style.transform = `translateX(-${horizonScroll}px)`; //횡스크롤 단순 이동부
        horizonalContents.style.position = 'fixed';
        horizonalContents.classList.add('row-scroll-on');
        horizonalContents.classList.remove('row-scroll-off');
        console.log(progressBarWidth);
        console.log(vhCorrectionVal)
        //new - 횡스크롤 이동 페이지 단위 전환
        if (scrollTop > 6420 && scrollTop < 6886){
            horizonalContents.style.transform = `translateX(-${0}vw)`;
            horizonalContents.classList.add('show-part1')
            horizonalContents.classList.remove('show-part2')
            horizonalContents.classList.remove('show-part3')
            if (scrollTop > 6780 && scrollTop < 6886) {
                this.window.addEventListener('wheel', preventScroll, { passive: false });
                setTimeout(() => {
                    window.removeEventListener('wheel', preventScroll, { passive: false });
                }, 750);

                function preventScroll(e) {
                    e.preventDefault();
                }
            }
        }
        else if(scrollTop > 6886 && scrollTop < 7452){
            horizonalContents.style.transform = `translateX(-${100}vw)`;
            horizonalContents.classList.add('show-part2')
            horizonalContents.classList.remove('show-part1')
            horizonalContents.classList.remove('show-part3')
            if (scrollTop > 6886 && scrollTop < 7000) {
                this.window.addEventListener('wheel', preventScroll, { passive: false });
                setTimeout(() => {
                    window.removeEventListener('wheel', preventScroll, { passive: false });
                }, 700);

                function preventScroll(e) {
                    e.preventDefault();
                }
            }
            if (scrollTop > 7150 && scrollTop < 7252) {
                this.window.addEventListener('wheel', preventScroll, { passive: false });
                setTimeout(() => {
                    window.removeEventListener('wheel', preventScroll, { passive: false });
                }, 700);

                function preventScroll(e) {
                    e.preventDefault();
                }
            }
        }
        else if(scrollTop > 7452 && scrollTop < 8120){
            horizonalContents.style.transform = `translateX(-${200}vw)`;
            horizonalContents.classList.add('show-part3')
            horizonalContents.classList.remove('show-part2')
            horizonalContents.classList.remove('show-part1')
            if (scrollTop > 8020 && scrollTop < 8070) {
                this.window.addEventListener('wheel', preventScroll, { passive: false });
                setTimeout(() => {
                    window.removeEventListener('wheel', preventScroll, { passive: false });
                }, 500);

                function preventScroll(e) {
                    e.preventDefault();
                }
            }
        }

        if (progressBarWidth < vhCorrectionVal) { //횡스크롤에서 빠져나가기
            horizonalContents.style.position = '';
            horizonalContents.style.transform = `translateX(-${0}px)`;
        }
    }
    else if (scrollTop > 8120) {
        horizonalContents.style.transform = `translateX(-${200}vw)`;
        horizonalContents.style.position = '';
    }
});
