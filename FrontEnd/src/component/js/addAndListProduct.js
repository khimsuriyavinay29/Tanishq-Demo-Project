document.addEventListener("DOMContentLoaded",function(event){
    event.preventDefault()

    fetch("http://localhost:4500/api/product")

    .then(response => {return response.json()})
    .then(products =>{
        console.log(products);
        renderProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));
});
function createProductHTML(product) {
    return `
        <div class="all-product-card">
            <div class="all-product-card-img">
                <img class="border p-1" src="${product.image}" alt="${product.title}">
                <i class="fa-regular fa-heart"></i>
            </div>
            <div class="all-product-card-content">
                <div class="all-product-card-content-div">
                    <p class="product-stoke-message">only 1 left in stock</p>
                    <h3 class="product-heading">${product.title}</h3>
                    <p class="product-price">₹${product.price}</p>
                </div>
            </div>
        </div>
    `;
}

function renderProducts(products) {
    const container = document.getElementById('all-product-container');
    container.innerHTML = products.map(createProductHTML).join('');
}