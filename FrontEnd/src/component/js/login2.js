

document.getElementById("loginForm").addEventListener("submit",function(event){
    event.preventDefault();

    const loginData = {
        userName: document.getElementById('loginUserName').value,
        password: document.getElementById('loginUserPassword').value
    };
   
    localStorage.setItem("accessTokenAdmin", "");    
    localStorage.setItem("accessTokenUser", "");    

    fetch("http://localhost:4500/api/auth/login",{
        method : "POST",
        headers :{
            'content-type' : 'application/json'
        },
        body : JSON.stringify(loginData)
    })
    .then(loginFetchData => {
        console.log(loginFetchData);
        if(loginFetchData.ok){
            return loginFetchData.json();
        }
        else if (loginFetchData.status === 401) {
            throw new Error('Unauthorized: Invalid username or password');
        } else {
            throw new Error('Network response was not ok');
        }
    })
        .then(data => {
            if (data && data.data) {
                const isadmin = data.data.isAdmin;
                let accessToken = data.data.accessToken;
                // console.log("----",accessToken)
                if (isadmin) {
                    localStorage.setItem("accessTokenAdmin", accessToken);
                    window.location.href = './addProduct.html';
                } else {
                    localStorage.setItem("accessTokenuser", accessToken);
                    window.location.href = './home.html';
                }
            } else {
                throw new Error('Data format is incorrect');
            }
        })
    })
    