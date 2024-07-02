
const categoryList = ["Gold", "Diamond", "Earrings", "Rings", "Best Seller"];
const productCategory = document.getElementById("productCategory");



document.addEventListener("DOMContentLoaded",async function(event){
    event.preventDefault();

    categoryList.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        productCategory.appendChild(option);
    });


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
        <div class="all-product-card" data-id="${product._id}">
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
            <div class="w-100 mb-2 d-flex justify-content-center">
                    <button class="btn btn-primary py-2 mx-1 update-product-btn" data-id="${product._id}">Update Item</button>
                    <button class="btn btn-danger py-2 mx-1 delete-product-btn" data-id="${product._id}">Delete Item</button>
            </div>
        </div>
    `;
}

function renderProducts(products) {
    const container = document.getElementById('all-product-container');
    container.innerHTML = products.map(createProductHTML).join('');

    const productCards = document.querySelectorAll(".all-product-card");
    productCards.forEach(card =>{ 
        card.addEventListener('click', (event) =>{
            if(event.target.closest('button')){
                return;
            }
            const viewProductId = card.getAttribute('data-id');
            localStorage.setItem("viewProductId", viewProductId);
            window.location.href ="../html/ViewProduct.html";
        })
    })

    const updateButtons = document.querySelectorAll('.update-product-btn');
    updateButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            // const product = products.find(prod => prod._id === productId);
            // localStorage.setItem("updateProductObject", JSON.stringify(product));
            
            localStorage.setItem("updateProductId", productId);
            // console.log('Product object stored in localStorage:', product);


            window.location.href="../html/updateProduct.html";
        });
        // console.log(button.getAttribute('data-id'));
    });

    const deleteButtons = document.querySelectorAll('.delete-product-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            console.log(`Delete product with ID: ${productId}`);
        });
    });
}

document.getElementById('productForm').addEventListener('submit', async (event) => {
    
    event.preventDefault();
  
    const title = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = document.getElementById('productPrice').value;
    const selectedCategory = productCategory.value;
    const fileInput = document.getElementById('productImage');
    const file = fileInput.files[0];
  
    const formData = new FormData();

    formData.append('price', price);
    formData.append('title', title);
    formData.append('file', file);
    formData.append('description', description);
    formData.append('category', selectedCategory);
  
    try {
      const response = await fetch('http://localhost:4500/api/product', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("accessTokenAdmin")}`
        },
        body: formData
      });
  
      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Success:', data); 
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  });