document.addEventListener("DOMContentLoaded", async (event) =>{
    event.preventDefault();

    
    let currentIndex = 0;
    let screenWidth = window.innerWidth;
    const userId = localStorage.getItem("userLoginId")

   

    document.getElementById('loginRemember').addEventListener('change', function() {
        var isChecked = this.checked;
        if(isChecked === true){
            console.log("Checkbox is checked: " + isChecked);
            localStorage.setItem("loginRemeber", isChecked)
        }
        else{
            console.log("Type of error");
        }
    });


    document.getElementById("userLogOut").addEventListener("click",() =>{
        localStorage.setItem("userLoginId", "");
        document.querySelector(".after-login-account").style.display = "none" 
        window.location.href = "../html/home.html"
    })

    
    if(userId === ""){
        document.querySelector(".nav-account-option-div").addEventListener("mouseenter",() =>{
            document.querySelector(".nav-account-option").style.display = "block"  
        })
    }else{
        document.querySelector(".nav-account-option-div").addEventListener("mouseenter",() =>{
            document.querySelector(".after-login-account").style.display = "flex"  
            document.getElementById("after-login-account-userName").innerHTML = localStorage.getItem("userLoginName")
        })
    }
    document.querySelector(".nav-account-option-div").addEventListener("mouseleave",() =>{
        document.querySelector(".nav-account-option").style.display = "none"  
        document.querySelector(".after-login-account").style.display = "none"  
    })


   
    const categoryData = await fetch("http://localhost:4500/api/category")

    try{
        if (!categoryData.ok) {
            console.log(categoryData);
            throw new Error('Network response was not ok');
        }
            const jsonCategoryData = await categoryData.json();
            // console.log(jsonCategoryData);

            renderCategories(jsonCategoryData);
            
    }
    catch(error){
        console.error('There was a problem with the fetch operation:', error);
    }

    function createCategoryHTML(category) {
        return `
            <div class="cle-img-1">
              <img
                alt="Dialy Wear Jewellery"
                class="img-fluid"
                src="${category.image}"
                title="${category.categoryName}"
              />
              <p>${category.categoryName}</p>
            </div>
        `;
    }

    function renderCategories(categorys) {
        const container = document.getElementById('cle-img');
        
        container.innerHTML = categorys.map(createCategoryHTML).join('');
    
        
    }   

// category type container start

    function updateScreenWidth() {
        screenWidth = window.innerWidth;
        // console.log("Updated screen width:", screenWidth);
        if(screenWidth >=991){
            currentIndex =0;
            updateCategoryTypeCarousel();
        }
    }
    
    window.addEventListener('resize', updateScreenWidth);
    
    try{
        const categoryTypeData = await fetch("http://localhost:4500/api/categoryType")
        
        const categoryTypeDatajson = await categoryTypeData.json();
        
        const sliceData1 = categoryTypeDatajson.slice(0,6);
        const sliceData2 = categoryTypeDatajson.slice(6,12);
        
        
        addNavigationDots();
        renderCategoryTypeData(sliceData1,sliceData2)
        
        updateCategoryTypeCarousel();
        updateScreenWidth();

}
catch(error){
    console.log("Tou have encounter an error",error);
}

function createCategoryTypeHTML(data){
    return `
            <div class="category-type-Card col-4 col-lg-2" data-id="${data._id}">
                <div class="w-100 rounded-1 d-flex flex-column justify-content-between border border-2">
                    <div class="w-100  rounded-1">
                        <img class="w-100 rounded-1 " src="${data.image}">
                    </div>
                    <div class="p-2 category-type-Card-heading">
                        <h6 class="h6 text-center text-tanishq-color mt-2 mb-1">${data.name}</h6>
                        <div class="row mb-1 category-type-Card-explore">
                            <p class="col-7 p-1 text-end">Explore</p>
                            <p class="col-5 my-1 ps-1 ">&#10095;</p>
                        </div>
                    </div>
                </div>
            </div>
    `
}

function renderCategoryTypeData(data1,data2){

    const container1 = document.getElementById("category-type-Card-wrapper1");
    const container2 = document.getElementById("category-type-Card-wrapper2");

    container1.innerHTML = data1.map(createCategoryTypeHTML).join("");
    container2.innerHTML = data2.map(createCategoryTypeHTML).join("");

    const categoryContainerCard = document.querySelectorAll(".category-type-Card");
    // console.log(categoryContainerCard);

    categoryContainerCard.forEach(card =>{
        card.addEventListener("click",(event) =>{
            event.preventDefault();

            window.location.href = "../html/home.html"
        })         
    })
}

function updateCategoryTypeCarousel() {
    const container1 = document.getElementById("category-type-Card-wrapper1");
    const container2 = document.getElementById("category-type-Card-wrapper2");
    const cardWidth = 3 * document.querySelector('.category-type-Card').offsetWidth + parseFloat(getComputedStyle(document.querySelector('.category-type-Card')).marginRight) * 2 + 5 ;
    
    // console.log(parseFloat(getComputedStyle(document.querySelector('.category-type-Card')).marginRight) * 2,document.querySelector('.category-type-Card').offsetWidth)

    const offset1 = -currentIndex * cardWidth;
    // console.log(offset1);
    const offset2 = -currentIndex * cardWidth;

    container1.style.transform = `translateX(${offset1}px)`;
    container2.style.transform = `translateX(${offset2}px)`;

    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function addNavigationDots() {
    const dotsContainer = document.getElementById("navigation-dots");
    dotsContainer.innerHTML = `
        <span class="dot" data-target="0"></span>
        <span class="dot" data-target="1"></span>
    `;

    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', (event) => {
            currentIndex = parseInt(event.target.dataset.target, 10);
            updateCategoryTypeCarousel();
        });
    });
}

//category type container end

// login model start

document.getElementById('loginButton').addEventListener('click', function() {
    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('modalContainer').style.display = 'block';
    
    if(localStorage.getItem("loginRemeber") === "true"){
        document.getElementById("loginUserName").value = localStorage.getItem("userLoginRemeberName")
        console.log(localStorage.getItem("userLoginRemeberName"),localStorage.getItem("loginRemeber"))
            }

        });

        document.getElementById('closeModal').addEventListener('click', function() {
            document.getElementById('modalOverlay').style.display = 'none';
            document.getElementById('modalContainer').style.display = 'none';
        });

        document.getElementById('modalOverlay').addEventListener('click', function() {
            document.getElementById('modalOverlay').style.display = 'none';
            document.getElementById('modalContainer').style.display = 'none';
        });
        
        

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
                let userId = data.data._id;
                let userName = data.data.userName;
                // console.log("----",accessToken)
                if (isadmin) {
                    localStorage.setItem("accessTokenAdmin", accessToken);
                    window.location.href = './addProduct.html';
                } else {
                    localStorage.setItem("userLoginId",userId)
                    localStorage.setItem("accessTokenuser", accessToken);
                    localStorage.setItem("userLoginName", userName);
                    localStorage.setItem("userLoginRemeberName",userName);
                    window.location.href = '../html/home.html';
                    document.getElementById('modalOverlay').style.display = 'none';
                    document.getElementById('modalContainer').style.display = 'none';
                    // console.log(userId,accessToken,userName);
                }
            } else {
                throw new Error('Data format is incorrect');
            }
        })
       
    })
        
// login model end

// Sign Up model start 

    document.getElementById('signUpButton').addEventListener('click', function() {
        document.getElementById('modalOverlayl-signUp').style.display = 'flex';
        document.getElementById('modalContainerl-signUp').style.display = 'flex'; 
    });
    document.getElementById('closeModal-signUp').addEventListener('click', function() {
        document.getElementById('modalOverlayl-signUp').style.display = 'none';
        document.getElementById('modalContainerl-signUp').style.display = 'none';
    });

    document.getElementById('modalOverlayl-signUp').addEventListener('click', function() {
        document.getElementById('modalOverlayl-signUp').style.display = 'none';
        document.getElementById('modalContainerl-signUp').style.display = 'none';
    });

    document.getElementById("userRegisteForm").addEventListener("submit",(event) =>{
        event.preventDefault();

        const email = document.getElementById('registerUserEmail').value;
        const userName = document.getElementById('registerUserName').value;
        const password = document.getElementById('registerUserPassword').value;
        const confirmPassword = document.getElementById('registerUserConirmPassword').value;

        console.log(confirmPassword);

        if(password === confirmPassword){
            const data = {
                email: email,
                userName: userName,
                password: password
            };

            fetch('http://localhost:4500/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert(`You are Successfully Registered, ${data.data.userName}}`);
                console.log(data);
                document.getElementById('modalOverlayl-signUp').style.display = 'none';
                document.getElementById('modalContainerl-signUp').style.display = 'none';
                ;
            })
            .catch(error => {
                alert('Error registering user');
                console.error('Error:', error);
            });
        }
        else{
            window.alert("somthin wrong")
        }
    
    })

// Sign Up

})

