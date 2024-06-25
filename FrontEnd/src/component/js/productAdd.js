    const jewellerySelect = document.getElementById("jewellery");
      
      categoryList.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        jewellerySelect.appendChild(option);
      });

      const productForm = document.getElementById('productForm');
      productForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const selectedCategory = jewellerySelect.value;
        const fileInput = document.getElementById('myFile');
        const file = fileInput.files[0];

        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Price:', price);
        console.log('Selected Category:', selectedCategory);
        console.log('Selected File:', file);

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
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzkxYzg0ZjBiYTNkMTM4NTgzOTQ0MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxOTI5MzExNSwiZXhwIjoxNzE5NzI1MTE1fQ.R4_oRKRRMt57l5kIMlKSv1Iml1F2GFz4BbaE2hlwR1c'
            },
            body: formData
          });
    
          const result = await response.json();
          console.log('Response:', result);
        } catch (error) {
          console.error('Error uploading product:', error);
        }
      });
        // You can now use these variables to send data to your server or process them as needed
      