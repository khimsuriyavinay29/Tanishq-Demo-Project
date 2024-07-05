const categoryType = ["ALL JEWELLERY","GOLD","DIAMOND","EARRINGS","RINGS","BESTSELLERS","MIA","COLLECTIONS","WEDDING","GIFTING","GOLDEN HARVEST","MORE"];
const hoverIndices = [0,1,2,3,4];
const hoverIndecesForArray = [7,9,11];
const categoryTypeContent = [
    {"ALL JEWELLERY":[{"CATEGORY":["ALL JEWELLERY","EARRINGS","PENDANTS","FINGER RINGS","MANGALSUTRA","CHAINS","NOSE PIN","NECKLACES","NECKLACE SET","BANGLES","BRACELETS","PENDANTS & EARRING SET","GOLD COINS","GIFT CARD"]},
        {"GENDER":["WOMEN","MEN","KIDS & TEENS"]},
        {"PRICE BAND":["<25K","25K-50K","50K-1L","1L & ABOVE"]}]},
    {"GOLD":[{"CATEGORY":["BANGLES","BRACELETS","EARRINGS",
        "GOLD CHAINS","PENDANTS","RINGS","ENGAGEMENT RINGS","NECKLACES",
        "NOSE PINS","KADAS","MANGALSUTRAS","JHUMKAS","HOOP EARRINGS",
        "STUD EARRINGS","DROP EARRINGS","MAANG TIKKA","NECKLACE SET",
        "PENDANTS & EARRINGS SETS"]},
        {"MEN":["BRACELETS","CHAINS","ENGAGEMENT RINGS","KADAS","PENDANTS","RINGS"]},
        {"GOLD Coin":["SPECIAL COINS","1 GRAM","2 GRAM","4 GRAM","5 GRAM","8 GRAM","10 GRAM","25 GRAM","30 GRAM","50 GRAM","100 GRAM"]},
        {"METAL":["ROSE","WHITE","YELLOW"]}]},
    {"DIAMOND":[{"CATEGORY":["BANGLES","BRACELETS","MANGALSUTRA","NECKLACE SET","NECKLACES","NOSEPINS"]},
        {"EARRINGS":["DROP EARRINGS","HOOP EARRINGS","JHUMKAS","STUD EARRINGS"]},
        {"RINGS":["ENGAGEMENT RINGS"]},
        {"PENDANTS":["CASUAL WEAR","DAILY WEAR","PARTY WEAR","PENDANTS & EARRINGS SET","TRADITIONAL"]},
        {"PRICE":["<25K","25K - 50K","50K - 1L","1L & ABOVE"]}]},
    {"EARRINGS":[{"STYLE":["ALL EARRINGS","DROP & DANGLERS","HOOP & HUGGIES","JHUMKAS","STUDS & TOPS"]},
        {"METAL & STONES":["DIAMOND","GEMSTONE","GOLD","PLATINUM METAL","ROSE GOLD"]},
        {"OCCASION":["CASUAL WEAR","MODERN","TRADITIONAL","WEDDING","WORK WEAR"]},
        {"PRICE":["<25K","25K-50K","50K-1L","1L & ABOVE"]},
        {"GENDER":["WOMEN'S EARRINGS","KIDS & TEENS"]}]},
    {"RINGS":[{"ALL RINGS":["CASUAL RINGS","COUPLE RINGS","DIAMOND ENGAGEMENT RINGS","ENGAGEMENT RINGS","GOLD ENGAGEMENT RINGS",`MEN'S RINGS`,"PLATINUM ENGAGEMENT RINGS"]},
    {"BY METAL & STONES":["DIAMOND","GEMSTONE","GOLD","ROSE GOLD","SOLITAIRE","WHITE GOLD"]},
    {"PRICE RANGE":["<25K","25K-50K","50K-1L","1L & ABOVE"]}]},
    {"COLLECTIONS":["MODERN POLKI","GLAMDAYS","FESTIVAL OF DIAMONDS","STRING IT","CELESTE","DHAROHAR","KAKATIYA","JOY OF DRESSING","ENGAGEMENT RINGS","PRETTY IN PINK","TALES OF MYSTIQUE","STUNNING EVERY EAR","AVEER","DOR","RIVAAH X TARUN TAHILIANI"]},
    {"GIFTING":["GIFTS FOR LOVED ONES","GIFT CARDS","CORPORATE GIFTING"]},
    {"MORE":["EXCHANGE PROGRAM","DIGITAL GOLD","GOLD RATE","BOOK AN APPOINTMENT","BLOGS","CURRENCY SELECTOR","ENCIRCLE","TATA NEUPASS","FAQ","BRANDS"]},
]


document.addEventListener("DOMContentLoaded",(event) =>{
    event.preventDefault();
    
    // console.log(categoryTypeContent);

    const categoryTypeUl = document.getElementById("category-type");

    categoryType.forEach((category,index) =>{
        const categoryLi = document.createElement("li")
        
        categoryLi.innerHTML = category;
        categoryLi.className = "li py-3 px-1"
        categoryTypeUl.appendChild(categoryLi);
        
        if(hoverIndices.includes(index)){
            const hoverContainer = document.createElement("div");
            hoverContainer.className = "hover-container";   
            categoryLi.appendChild(hoverContainer);
            
            categoryLi.addEventListener("mouseenter", () => {
                hoverContainer.style.display = "block";
                hoverContainer.innerHTML="";                
                
                const categoryData = categoryTypeContent.find(item => Object.keys(item)[0] === category);
                
                if (categoryData) {
                    const subcategories = Object.values(categoryData)[0];
                    
                    // console.log(subcategories);
                    const subcategoryDiv = document.createElement("div");
                    
                    subcategories.forEach(subcategoryObj => {
                        const subcategoryName = Object.keys(subcategoryObj)[0];
                        
                        const subcategoryList = subcategoryObj[subcategoryName];
                        // console.log(subcategoryList);

                        subcategoryDiv.className = "category-container d-flex justify-content-between";
                        
                        const categoryMainUl = document.createElement("ul");

                        categoryMainUl.classList = "category-list list-unstyled text-nowrap px-3 fw-bold";
                        categoryMainUl.innerHTML = `${subcategoryName}:`
                        
                        
                        subcategoryList.forEach(item => {
                            // console.log(item)
                            const subcategoryItemLi = document.createElement("li");
                            subcategoryItemLi.className = "mb-1 text-dark fw-lighter"
                            subcategoryItemLi.innerHTML = item;
                            categoryMainUl.appendChild(subcategoryItemLi);
                        });

                        hoverContainer.appendChild(subcategoryDiv);
                        subcategoryDiv.append(categoryMainUl);

                        // subcategoryDiv.appendChild(subcategoryTitle);
                        // subcategoryDiv.appendChild(subcategoryUl);
                        // hoverContainer.appendChild(subcategoryDiv);
                    });
                }
            });
    
            categoryLi.addEventListener("mouseleave", () => {
                hoverContainer.style.display = "none";   
            });
        }

        else if (hoverIndecesForArray.includes(index)) {
            const hoverContainer = document.createElement("div");
            hoverContainer.className = "hover-container";
            categoryLi.appendChild(hoverContainer);
      
            categoryLi.addEventListener("mouseenter", () => {
              hoverContainer.style.display = "block";
              hoverContainer.innerHTML = "";
      
              const categoryData = categoryTypeContent.find(item => Object.keys(item)[0] === category);
            //   console.log(categoryData);
      
              if (categoryData) {
                const categoryArray = Object.values(categoryData)[0];
                const categoryUl = document.createElement("ul");
                categoryUl.className = "list-unstyled";

                 
                hoverContainer.appendChild(categoryUl)

                categoryArray.forEach((item,index) => {

                const categoryLi = document.createElement("li")
                categoryLi.className = "text-dark text-nowrap"
                categoryLi.innerHTML = item;
                
                categoryUl.appendChild(categoryLi);
                });
      
                  
              }
            });
      
            categoryLi.addEventListener("mouseleave", () => {
              hoverContainer.style.display = "none";
            });
          }
        // else if(hoverIndecesForArray.includes(index)){
        //     const hoverContainer = document.createElement("div");
        //     hoverContainer.className = "hover-container";   
        //     categoryLi.appendChild(hoverContainer);
            
        //     categoryLi.addEventListener("mouseenter", () => {
        //         hoverContainer.style.display = "block";
        //         hoverContainer.innerHTML="";
                
        //         const categoryData = categoryTypeContent.find(item => Object.keys(item)[0] === category);
        //         console.log(categoryData);

        //         const categoryUl = document.createElement("ul");
        //         categoryUl.className = "list-unstyled"
        //         categoryUl.innerHTML = "vinay"

        //         hoverContainer.appendChild(categoryUl);

        //         categoryData.forEach(item =>{
        //             const categoryLI = document.createElement("li")
        //             categoryLI.innerHTML = item;
        //             categoryUl.appendChild(categoryLi);
        //         })
        //     })
        //     categoryLi.addEventListener("mouseleave", () => {
        //         hoverContainer.style.display = "none";   
        //     });
        // }
    });
})