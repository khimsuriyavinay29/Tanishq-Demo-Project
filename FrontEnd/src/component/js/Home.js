document.addEventListener("DOMContentLoaded", async (event) =>{
    event.preventDefault();

    
    const categoryData = await fetch("http://localhost:4500/api/category")

    try{
        if (!categoryData.ok) {
            console.log(categoryData);
            throw new Error('Network response was not ok');
        }
            const jsonCategoryData = await categoryData.json();
            // console.log(jsonCategoryData);

            renderCategories(jsonCategoryData);
            
    }
    catch(error){
        console.error('There was a problem with the fetch operation:', error);
    }

    function createCategoryHTML(category) {
        return `
            <div class="cle-img-1">
              <img
                alt="Dialy Wear Jewellery"
                class="img-fluid"
                src="${category.image}"
                title="${category.categoryName}"
              />
              <p>${category.categoryName}</p>
            </div>
        `;
    }

    function renderCategories(categorys) {
        const container = document.getElementById('cle-img');
        
        container.innerHTML = categorys.map(createCategoryHTML).join('');
    
        
    }   
    
    
    const productData = await fetch("http://localhost:4500/api/product")

    const jsonProductData = await productData.json();
    // console.log(jsonProductData);

    renderProducts(jsonProductData)

    function createProductHTML(product){
        return `
            <div class="img-sec" data-id="${product._id}">
              <div class="img-http">
                <img
                    class="tile-image w-100 aspect-ratio-img"
                    src="${product.image}"
                    alt="${product.title}"
                    title="${product.title}"
                />
              </div>
              <div class="pos-i">
                <i class="fa-regular fa-heart fa-xl"></i>
              </div>
              <div class="img-pos">
                <span>Only 1 left in stock</span>
                <h5>${product.title}</h5>
                <p>₹ ${product.price}</p>
              </div>
            </div>

        `
    }
    
    function renderProducts(products){
        const container = document.getElementById("sec-img-position")

        container.innerHTML = products.map(createProductHTML).join('');

        const productCards = document.querySelectorAll(".img-sec");
        
        productCards.forEach(card =>{ 
        card.addEventListener('click', (event) =>{
            event.preventDefault();

            const viewProductId = card.getAttribute('data-id');
            console.log(viewProductId);
            localStorage.setItem("viewProductId", viewProductId);
            window.location.href ="../html/ViewProduct.html";
        })
    })
    }


})

