



const jewellerySelect = document.getElementById("jewellery");


categoryList.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    jewellerySelect.appendChild(option);
  });
  
  document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 
  
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const selectedCategory = jewellerySelect.value;
    const fileInput = document.getElementById('myFile');
    const file = fileInput.files[0];
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', selectedCategory);
    formData.append('file', file);
  
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