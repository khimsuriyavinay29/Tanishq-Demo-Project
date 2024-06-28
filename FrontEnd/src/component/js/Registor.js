function registerUser(event) {
    event.preventDefault();

    const email = document.getElementById('userEmail').value;
    const userName = document.getElementById('userName').value;
    const password = document.getElementById('userPassword').value;

    const data = {
        email: email,
        userName: userName,
        password: password
    };
    console.log(JSON.stringify(data));

    fetch('http://localhost:4500/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(data)
        
    })
    .then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('User registered successfully');
        console.log(data); 
    })
    .catch(error => {
        alert('Error registering user');
        console.error('Error:', error);
    });
}

document.getElementById('registerForm').addEventListener('submit', registerUser);