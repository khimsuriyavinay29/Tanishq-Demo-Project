document.addEventListener("DOMContentLoaded", async (event) =>{
    event.preventDefault();

    const goldCardWrapper = document.getElementById("gold-carousel-product-cardWrapper");
    const carouselDots = document.getElementById('gold-carousel-product-carouselDots');
    const prevBtn = document.getElementById('gold-carousel-product-prevBtn');
    const nextBtn = document.getElementById('gold-carousel-product-nextBtn');
    // const innerCardContainer = document.getElementById("inner-card-container");
    try {
        const response = await fetch("http://localhost:4500/api/product");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();

        console.log(jsonData)

        let currentIndex = 0;

        
        const categoryGold = "Gold"; 
        const filteredGoldData = jsonData.filter(product => product.category.includes(categoryGold));
        
        const slicedGoldData = filteredGoldData.slice(0, 6);
       
        
        slicedGoldData.forEach((product, index) => {
            const cardDiv = document.createElement("div");
            cardDiv.className = 'carousel-product-card-div border p-3';

           
            const imgDiv = document.createElement("div");
            imgDiv.className = "carousel-product-img-div";
            const heartIcon = document.createElement("i");
            heartIcon.className = "fa-regular fa-heart";
            
            const img = document.createElement("img");
            img.className = "carousel-product-img"
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
            productName.textContent = product.title; 
            productName.className = "text-nowrap text-truncate"
            const price = document.createElement("h5");
            price.textContent = `${product.price} `; 
            contentDiv.appendChild(stockText);
            contentDiv.appendChild(productName);
            contentDiv.appendChild(price);

            cardDiv.appendChild(imgDiv);
            cardDiv.appendChild(contentDiv);

            goldCardWrapper.appendChild(cardDiv);
            if (index < 4) {
            const dot = document.createElement("span");
            dot.className = 'carousel-product-dot';
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
            carouselDots.appendChild(dot);
        }
        });

        const updateCarousel = () => {
            // const cardWidth = document.querySelector('.card-div').offsetWidth;
            const cardWidth = document.querySelector('.carousel-product-card-div').offsetWidth + 2 * parseFloat(getComputedStyle(document.querySelector('.carousel-product-card-div')).marginRight);
            
            console.log(cardWidth);
            const offset = -currentIndex * cardWidth;
            goldCardWrapper.style.transform = `translateX(${offset}px)`;

            document.querySelectorAll('.carousel-product-dot').forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
            else{
                currentIndex = slicedGoldData.length - 4;
                updateCarousel();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < slicedGoldData.length - 4) {
                currentIndex++;
                updateCarousel();
            }
            else{
                currentIndex = 0;
                updateCarousel();
            }
        });

        updateCarousel(); 

    } catch (error) {
        console.error('Error fetching and displaying products:', error);
    }

})    