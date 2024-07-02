document.addEventListener('DOMContentLoaded', () => {
    const productId = localStorage.getItem("viewProductId");
    if (!productId) {
        console.error('Product ID is missing.');
        return;
    }

    fetch(`http://localhost:4500/api/product/find/${productId}`)
        .then(response => response.json())
        .then(product => {
            if (!product) {
                console.error('Product not found.');
                return;
            }
            console.log(product);

        const subImages = document.getElementById("sub-img-div");

        for(let i=0; i<4; i++){
            const img = document.createElement('img');
            img.src = product.image;
            img.className = "product-subimg border rounded-circle mb-2";
            subImages.appendChild(img);
        }


            document.getElementById('productId').textContent = product._id;
            document.getElementById('breadcrumbProductName').textContent = product.title;
            document.getElementById('productMainImage').src = product.image;
            document.getElementById('productName').textContent = product.title;
            document.getElementById('productDescription').textContent = product.description;
            document.getElementById('productPrice').textContent = `₹${product.price}`;

            // document.getElementById('productSubImage1').src = product.image; // Example, use actual sub-images if available
            // document.getElementById('productSubImage2').src = product.image; // Example, use actual sub-images if available
            // document.getElementById('productSubImage3').src = product.image; // Example, use actual sub-images if available

        })
        .catch(error => console.error('Error fetching product:', error));


        const leftDiv = document.querySelector('.left-div');
        const rightDiv = document.querySelector('.right-div');

        leftDiv.addEventListener('scroll', () => {
            rightDiv.scrollTo({
                top: leftDiv.scrollTop,
                behavior: 'smooth'
            });
        });


        const minusIcon = document.getElementById("minus");
        const plusIcon = document.getElementById("plus");
        const viewQuntity = document.getElementById("quntity");
        let quntityCount = 1;

        minusIcon.addEventListener("click", () =>{
            if(quntityCount>0){
                quntityCount -= 1;
                viewQuntity.textContent = quntityCount + " N"
                console.log(quntityCount);
            }
            else{
                alert("enable to decrease");
            }
        })
        plusIcon.addEventListener("click", () =>{
            if(quntityCount>=0){
                quntityCount += 1;
                viewQuntity.textContent = quntityCount + " N"
                console.log(quntityCount);
            }
            else{
                alert("enable to increamant");
            }
        })
});