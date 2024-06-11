window.addEventListener('load', function () {
    document.getElementById('loading-screen').style.display = 'none';
  });


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

    document.getElementById('section-1-text-white').classList.add('show-white-text');

    const img = document.getElementById('section-1-img');
    const textWhite = document.getElementById('section-1-text-white');

    const imgRect = img.getBoundingClientRect();
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

    // 스크롤 진행 바 업데이트
    const docuHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollableHeight = docuHeight - viewportHeight;
    const scrollProgress = scrollTop / scrollableHeight;
    const progressBarWidth = scrollProgress * 180;
    document.getElementById('scroll-progress-current').style.width = progressBarWidth + 'px';
});

// const horizontalScroll = document.getElementById('horizontal-scroll');
//     const bottomMarker = document.getElementById('bottom-marker');
//     let horizontalMode = false;

//     function enableHorizontalScroll() {
//       horizontalMode = true;
//       document.body.style.overflowY = 'hidden';
//       document.body.style.overflowX = 'auto';
//     }

//     function disableHorizontalScroll() {
//       horizontalMode = false;
//       document.body.style.overflowY = 'scroll';
//       document.body.style.overflowX = 'hidden';
//     }

//     function handleScroll() {
//       if (!horizontalMode) return;
//       const scrollLeft = window.pageXOffset;
//       const scrollWidth = document.documentElement.scrollWidth - window.innerWidth;

//       if (scrollLeft >= scrollWidth) {
//         // 수평 스크롤이 끝에 도달하면 다시 수직 스크롤로 전환
//         disableHorizontalScroll();
//       }
//     }

//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           enableHorizontalScroll();
//         } else {
//           disableHorizontalScroll();
//         }
//       });
//     });

//     observer.observe(bottomMarker);
//     window.addEventListener('scroll', handleScroll);

/*<div id="bottom-marker" style="height: 1px;"></div>를 html에 삽입하고, 
이 친구를 스크롤 방향전환 시점의 바닥에 배치하면 스크롤 방향 전환이 가능하더라!*/ 