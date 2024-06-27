

document.getElementById("loginForm").addEventListener("submit",function(event){
    event.preventDefault();

    const loginData = {
        userName: document.getElementById('userName').value,
        password: document.getElementById('userPassword').value
    };

    fetch("http://localhost:4500/api/auth/login",{
        method : "POST",
        headers :{
            'content-type' : 'application/json'
        },
        body : JSON.stringify(loginData)
    })
    .then(loginFetchData => {
        if(loginFetchData.ok){
            return loginFetchData.json();
        }
    })

    .then(data =>{
        // const isadmin= data.data.isAdmin;
        // console.log(data);
        
        console.log(data);
        
        // if(isadmin){
            //     window.location.href = './form-product.html';
            //     localStorage.setItem("accessTokenAdmin",data.data.accessToken);
            
            // }
            // else{
                // window.location.href = './home.html';
        //     localStorage.setItem("accessTokenuser",data.data.accessToken);
        // }
    })

})