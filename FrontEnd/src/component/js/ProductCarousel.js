document.addEventListener("DOMContentLoaded", async (event) => {
    event.preventDefault();

    const carousels = [
        {
            wrapper: document.getElementById("diamond-carousel-product-cardWrapper"),
            dots: document.getElementById('diamond-carousel-product-carouselDots'),
            prevBtn: document.getElementById('diamond-carousel-product-prevBtn'),
            nextBtn: document.getElementById('diamond-carousel-product-nextBtn'),
            category: "Diamond"
        },
        {
            wrapper: document.getElementById("gold-carousel-product-cardWrapper"),
            dots: document.getElementById('gold-carousel-product-carouselDots'),
            prevBtn: document.getElementById('gold-carousel-product-prevBtn'),
            nextBtn: document.getElementById('gold-carousel-product-nextBtn'),
            category: "Gold"
        }
    ];

    try {
        const response = await fetch("http://localhost:4500/api/product");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();

        carousels.forEach(carousel => {
            let currentIndex = 0;

            const filteredData = jsonData.filter(product => product.category.includes(carousel.category));
            const slicedData = filteredData.slice(0, 6);

            slicedData.forEach((product, index) => {
                const cardDiv = document.createElement("div");
                cardDiv.className = 'carousel-product-card-div border p-3';

                const imgDiv = document.createElement("div");
                imgDiv.className = "carousel-product-img-div";
                const heartIcon = document.createElement("i");
                heartIcon.className = "fa-regular fa-heart";

                const img = document.createElement("img");
                img.className = "carousel-product-img";
                img.src = product.image;
                img.alt = product.productName;
                imgDiv.appendChild(heartIcon);
                imgDiv.appendChild(img);

                const contentDiv = document.createElement("div");
                contentDiv.className = "carousel-product-content";
                const stockText = document.createElement("p");
                stockText.style.color = "red";
                stockText.textContent = `Only 1 is left`;

                const productName = document.createElement("h6");
                productName.innerHTML = `${product.title}`;
                productName.className = "text-nowrap text-truncate";
                const price = document.createElement("h5");
                price.innerHTML = `&#8377; ${product.price} `;
                contentDiv.appendChild(stockText);
                contentDiv.appendChild(productName);
                contentDiv.appendChild(price);

                cardDiv.appendChild(imgDiv);
                cardDiv.appendChild(contentDiv);

                carousel.wrapper.appendChild(cardDiv);

                if (index < 4) {
                    const dot = document.createElement("span");
                    dot.className = 'carousel-product-dot';
                    dot.addEventListener('click', () => {
                        currentIndex = index;
                        updateCarousel();
                    });
                    carousel.dots.appendChild(dot);
                }
            });

            const updateCarousel = () => {
                const cardWidth = document.querySelector('.carousel-product-card-div').offsetWidth + 
                                  2 * parseFloat(getComputedStyle(document.querySelector('.carousel-product-card-div')).marginRight);

                const offset = -currentIndex * cardWidth;
                carousel.wrapper.style.transform = `translateX(${offset}px)`;

                document.querySelectorAll('.carousel-product-dot').forEach((dot, index) => {
                    console.log('Dot index:', index, 'Current index:', currentIndex); // Debugging
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            };

            carousel.prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                } else {
                    currentIndex = slicedData.length - 4;
                    updateCarousel();
                }
            });

            carousel.nextBtn.addEventListener('click', () => {
                if (currentIndex < slicedData.length - 4) {
                    currentIndex++;
                    updateCarousel();
                } else {
                    currentIndex = 0;
                    updateCarousel();
                }
            });

            updateCarousel();
        });

    } catch (error) {
        console.error('Error fetching and displaying products:', error);
    }
});
