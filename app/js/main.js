//lazyload

let images = document.querySelectorAll('img[data-src]');

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
}

function handleImg(myImg, observer) {
  myImg.forEach(myImgSingle => {
    if (myImgSingle.intersectionRatio > 0) {
      loadImage(myImgSingle.target);
    }
  });
};

function loadImage(image) {
  image.src = image.getAttribute('data-src');
};

const observer = new IntersectionObserver(handleImg, options);

images.forEach(img => {
  observer.observe(img);
})

//fancybox

Fancybox.bind("[data-fancybox]");

// slick

$('.slider').slick({
  lazyLoad: 'ondemand',
  slidesToShow: 4,
  slidesToScroll: 4,
  dots: true,
  responsive: [
    {
      breakpoint: 540,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
});

