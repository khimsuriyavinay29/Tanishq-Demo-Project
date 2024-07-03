const categoryType = ["ALL JEWELLERY","GOLD","DIAMOND","EARRINGS","RINGS","BESTSELLERS","MIA","COLLECTIONS","WEDDING","GIFTING","GOLDEN HARVEST","MORE"];


document.addEventListener("DOMContentLoaded",(event) =>{
    event.preventDefault();

    const categoryTypeUl = document.getElementById("category-type");

    categoryType.forEach((category) =>{
        const categoryLi = document.createElement("li")
       
        categoryLi.innerHTML = category;
        categoryLi.className = "li"
        categoryTypeUl.appendChild(categoryLi);
    })

    console.log(categoryType);
})