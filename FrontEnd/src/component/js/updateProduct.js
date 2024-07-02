
const productCategory = document.getElementById("productCategory");

categoryList.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    productCategory.appendChild(option);
});

document.addEventListener('DOMContentLoaded', async () => {
    
    const productId = localStorage.getItem("updateProductId");

    console.log(productId);


    const productName = document.getElementById('productName');
    const productDescription = document.getElementById('productDescription');
    const productPrice = document.getElementById('productPrice');
    const productCategory = document.getElementById('productCategory');
    
    fetch(`http://localhost:4500/api/product/find/${productId}`)

    .then(response => {return response.json()})
    .then(products =>{
        console.log(products);
        
        productName.value =products.title
        productDescription.value =products.description
        productPrice.value =products.price
        productCategory.value =products.category
    })

});


        
