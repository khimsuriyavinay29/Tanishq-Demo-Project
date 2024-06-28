

document.getElementById("getProduct").addEventListener("click",function(event){
    event.preventDefault();

    fetch("http://localhost:4500/api/product")

    .then(response => {return response.json()})
    .then(products =>{renderProducts(products)});

})

function createProductHTML(product) {
    return `
      <div class="img-sec-seller">
        <div class="img-http-seller">
          <img
            class="tile-image aspect-ratio-img"
            src="${product.image}"
            alt="${product.title}"
            title="${product.title}"
            width="100px"
            height="100px"
          />
        </div>
        <div class="pos-i-seller">
          <i class="fa-regular fa-heart fa-xl"></i>
        </div>
        <div class="img-pos-seller">
          <h1>${product.title}</h1>
          <p>₹${product.price}</p>
        </div>
      </div>
    `;
  }
  
   function renderProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = products.map(createProductHTML).join('');
  }
  
  