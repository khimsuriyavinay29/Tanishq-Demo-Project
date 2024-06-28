

document.getElementById("loginForm").addEventListener("submit",function(event){
    event.preventDefault();

    const loginData = {
        userName: document.getElementById('userName').value,
        password: document.getElementById('userPassword').value
    };
    // console.log(localStorage.getItem("accessTokenAdmin"))
    localStorage.setItem("accessTokenAdmin", "");    

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
                console.log("----",accessToken)
                if (isadmin) {
                    localStorage.setItem("accessTokenAdmin", accessToken);
                    window.location.href = './form-product.html';
                } else {
                    localStorage.setItem("accessTokenuser", accessToken);
                    window.location.href = './home.html';
                }
            } else {
                throw new Error('Data format is incorrect');
            }
        })
    })
    
// const isadmin= data.data.isAdmin;
// // console.log(data);

// console.log(data);

// if(isadmin){
//         window.location.href = './form-product.html';
//         localStorage.setItem("accessTokenAdmin",data.data.accessToken);
    
//     }
//     else{
//         window.location.href = './home.html';
//     localStorage.setItem("accessTokenuser",data.data.accessToken);
// }