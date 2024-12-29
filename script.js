let currentPage = 3;
const pages = document.querySelectorAll(".page");
const lastPage = pages.length;

function toggleClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    } else {
        element.classList.add(className);
    }
}

function updateVisibility() {
    pages.forEach((page, index) => {
        if (index + 1 === 1 || index + 1 === 2 || index + 1 === lastPage) {
            page.classList.add('visible');
        } else if (Math.abs(index + 1 - currentPage) <= 3) {
            page.classList.add('visible');
        } else {
            page.classList.remove('visible');
        }
    });
}

// 페이지 넘김
function flipPage(element, pageNumber) {
    if (pageNumber === 2 || pageNumber === lastPage - 2 || pageNumber === lastPage - 1) {
        return;
    }

    if (pageNumber === currentPage) {
        currentPage += 2;
        toggleClass(element, "left-side");
        if (element.nextElementSibling) {
            toggleClass(element.nextElementSibling, "left-side");
        }
    } else if (pageNumber === currentPage - 1) {
        currentPage -= 2;
        toggleClass(element, "left-side");
        if (element.previousElementSibling) {
            toggleClass(element.previousElementSibling, "left-side");
        }
    }

    updateVisibility();
}

// 특정 페이지 이동
function goToPage(pageNum) {
    currentPage = pageNum;

    pages.forEach((page, index) => {
        if (index + 1 < pageNum) {
            page.classList.add('left-side');
        } else {
            page.classList.remove('left-side');
        }
    });

    updateVisibility();
}

const pageNumbers = document.querySelectorAll('.page-number');

pageNumbers.forEach((div, index) => {
    div.textContent = index + 1;
});

// 스크롤 오류 방지
const pageContentImages = document.querySelectorAll('.page-content-image');

pageContentImages.forEach(container => {
    container.addEventListener('wheel', function(event) {
        if (event.deltaY > 0) {
            this.scrollTop += 30;
        } else {
            this.scrollTop -= 30;
        }

        event.preventDefault();
    });
});

// DOM 로드 시 초기 Visibility 설정
document.addEventListener("DOMContentLoaded", () => {
    updateVisibility();
});
