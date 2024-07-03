const imagesArray = [
    "../img/carousel images/image1.webp",
    "../img/carousel images/image2.webp",
    "../img/carousel images/image3.webp",
    "../img/carousel images/image4.webp",
    "../img/carousel images/image5.webp"
  ];

  
      
    const carouselImages = document.querySelector('.mycarousel-images');
    const carouselDots = document.getElementById('carouselDots');

            imagesArray.forEach((Image, index) =>{
                const img = document.createElement('img');
                img.src = Image;
                img.className = 'mycarousel-item';
                img.alt = 'Carousel Image';
                carouselImages.appendChild(img);

                const dotElement = document.createElement('span');
                dotElement.className = 'mycarousel-dot';
                dotElement.addEventListener('click', () => showImage(index));
                carouselDots.appendChild(dotElement);
            })
  

// const images = document.querySelectorAll('.carousel-item');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

//     console.log(carouselImages.scrollWidth);

let currentIndex = 0;

function showImage(index) {
  if (index >= imagesArray.length) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = imagesArray.length - 1;
  } else {
    currentIndex = index;
    console.log(currentIndex);
  }
  carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('.mycarousel-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

prevBtn.addEventListener('click', () => {
  showImage(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  showImage(currentIndex + 1);
});

setInterval(() => {
  showImage(currentIndex + 1);
}, 3000);

updateDots();