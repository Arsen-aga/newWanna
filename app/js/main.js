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