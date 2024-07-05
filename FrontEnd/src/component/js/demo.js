document.addEventListener("DOMContentLoaded", async (event) =>{
    event.preventDefault();

    try{
        const categoryTypeData = await fetch("http://localhost:4500/api/categoryType")
    
        const categoryTypeDatajson = await categoryTypeData.json();
        console.log(categoryTypeDatajson);

        renderCategoryTypeData(categoryTypeDatajson)

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
                        <div class="p-3 category-type-Card-heading">
                            <h6 class="h6 px-1 text-center text-tanishq-color">${data.name}</h6>
                            <div class="px-1 mb-2 category-type-Card-explore">
                                <p class="m-0">Explore</p>
                                <p class="m-0">&#10095;</p>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }

    function renderCategoryTypeData(data){

        const container = document.getElementById("category-type-Card-wrapper");

        container.innerHTML = data.map(createCategoryTypeHTML).join("");

        const categoryContainerCard = document.querySelectorAll(".category-type-Card");
        console.log(categoryContainerCard);

        categoryContainerCard.forEach(card =>{
            card.addEventListener("click",(event) =>{
                event.preventDefault();

                window.location.href = "../html/home.html"
            })         
        })
    }

})