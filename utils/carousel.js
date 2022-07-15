// carousel funtions

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides((slideIndex += n));
}
setInterval(() => {
    plusSlides(1);
}, 8000);

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName('slide');
    let dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].className += ' active';
}
const one = document.getElementById('searchBoxDesk');
const two = document.getElementById('searchBox');

function animate(item) {
    const genreArr = ['drama', 'action', 'sci-fi', 'anime', 'history'];
    let i = 0;
    setInterval(function () {
        item.setAttribute('placeholder', `Search: "${genreArr[i++]}"`);

        if (i == genreArr.length) i = 0;
    }, 3000);
}
animate(one);
animate(two);

// end of func
