window.addEventListener('load', function () {
    document.getElementById('loading-screen').style.display = 'none';
});

let totalScroll = 0;

//점차 증가하는 변수를 생성하는 함수 구문.
function animateWidth(element, targetWidth) {
    let startWidth = 60;
    const duration = 500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const newWidth = startWidth + progress * (targetWidth - startWidth);
        element.style.width = `${newWidth}px`;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.style.width = `${targetWidth}px`;
        }
    }
    requestAnimationFrame(update);
}

const arrow1 = document.querySelector('#section-row-part-1-button-arrow-1 #arrow');
const arrow2 = document.querySelector('#section-row-part-1-button-arrow-2 #arrow');

//어사이드 메뉴버튼 구현
const navButton = document.getElementById('menu');

navButton.addEventListener('click', function () {
    const navSection = document.getElementById('left-nav');
    navSection.classList.remove('hidden');
    navSection.classList.add('viewded');
})

//갤러리 작동. window 뷰포트 화면 이내에 들어왔을 때 클릭이벤트를 받아 실행 할 것
const galleryContainer = document.getElementById('section-2-row-part-imgs');
const galleryScrollBall = document.querySelectorAll('.row-part-current-bar');
const galleryClickListner = document.getElementById('section-2-row-click-listner');
let galleryWidth = galleryContainer.offsetWidth;
let gallerySectionWidth = galleryWidth / 5;

let halfValue = galleryClickListner.offsetWidth / 2;
let nowGallery = 0;

galleryClickListner.addEventListener('click', function (e) {
    if (e.offsetX > halfValue) {
        if (nowGallery === 3) {
            nowGallery = 3;
        } else {
            nowGallery++;
        }
        galleryContainer.style.transform = `translateX(-${gallerySectionWidth * nowGallery}px)`;
        console.log(`up`);
    } else {
        if (nowGallery === 0) {
            nowGallery = 0;
        } else {
            nowGallery--;
        }
        galleryContainer.style.transform = `translateX(-${gallerySectionWidth * nowGallery}px)`;
        console.log(`down`);
    }
});

//Activity 글자 hover시 이미지 보여지기
const hoverAreas = [
    { textId: 'section-3-text-1', imgId: 'section-3-img-1' },
    { textId: 'section-3-text-2', imgId: 'section-3-img-2' },
    { textId: 'section-3-text-3', imgId: 'section-3-img-3' },
    { textId: 'section-3-text-4', imgId: 'section-3-img-4' }
];

hoverAreas.forEach(area => {
    const hoverArea = document.getElementById(area.textId);
    const img = document.getElementById(area.imgId);

    hoverArea.addEventListener('mouseover', function () {
        img.classList.add('display-block');
        img.classList.remove('display-none');
    });

    hoverArea.addEventListener('mouseout', function () {
        img.classList.add('display-none');
        img.classList.remove('display-block');
    });
});

//스로틀링과 섹션단위 횡스크롤 기본정보
const horizonalContents = document.querySelector('.row-content');
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
let isAnimating = false;

window.addEventListener('scroll', function () {
    if (isAnimating) return;

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

    //바닥인식
    let horizonScroll = 0;

    // 969에서 155 1329에서 150이 나오게 하는 식을 세워보니 −0.0139h+168.9583
    vhCorrectionVal = (-0.0139 * viewportHeight) + 169.0583 - 36;

    if (scrollTop > 6020 && scrollTop < 8120) {
        horizonScroll = (scrollTop - 6420) * 1;
        console.log(scrollTop)
        // horizonalContents.style.transform = `translateX(-${horizonScroll}px)`; //횡스크롤 단순 이동부
        horizonalContents.style.position = 'fixed';
        horizonalContents.classList.add('row-scroll-on');
        horizonalContents.classList.remove('row-scroll-off');
        console.log(progressBarWidth);
        console.log(vhCorrectionVal)
        //new - 횡스크롤 이동 페이지 단위 전환
        if (scrollTop > 6020 && scrollTop < 6886) {
            animateHorizontalScroll('show-part1', ['show-part2', 'show-part3']);
            horizonalContents.style.transform = `translateX(-${0}vw)`
            window.scrollTo(0, scrollTop);//스로틀링 후 스크롤 정렬
            setTimeout(() => {
                animateWidth(arrow1, 240);
                animateWidth(arrow2, 120);
            }, 1000);
        }
        else if (scrollTop > 6886 && scrollTop < 7452) {
            animateHorizontalScroll('show-part2', ['show-part1', 'show-part3']);
            horizonalContents.style.transform = `translateX(-${100}vw)`
            window.scrollTo(0, scrollTop);//스로틀링 후 스크롤 정렬
        }
        else if (scrollTop > 7452 && scrollTop < 8120) {
            animateHorizontalScroll('show-part3', ['show-part1', 'show-part2']);
            horizonalContents.style.transform = `translateX(-${200}vw)`
            window.scrollTo(0, scrollTop);//스로틀링 후 스크롤 정렬
        }

        if (progressBarWidth < vhCorrectionVal) { //횡스크롤에서 빠져나가기
            horizonalContents.style.position = '';
            horizonalContents.style.transform = `translateX(-${0}px)`;
        }
    }
    else if (scrollTop > 8120) { //횡스크롤 이후
        horizonalContents.style.transform = `translate(-${200}vw, -${100}vw)`;
    }
    else if (scrollTop < 6020) { //횡스크롤 이전
        horizonalContents.style.transform = `translate(-${0}vw, ${100}vw)`;
    }

});

function animateHorizontalScroll(addClass, removeClasses) {
    isAnimating = true;
    horizonalContents.classList.add(addClass);
    removeClasses.forEach(cls => horizonalContents.classList.remove(cls));

    setTimeout(() => {
        isAnimating = false;
    }, 1000);
}