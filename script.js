const accessKey = "Ek485KnFknl5W2ZA03lJfTHvv7yfJvGhhd9hV21HndU";

const formElement = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");

// const showMore =document.getElementById("show-more-button");
const showMore = document.getElementById("show-more-button"); // Corrected targetting of Show More button



const searchRes = document.querySelector(".search-result");
// const icon = document.querySelector(".icon");

let random = 0;
let inputData = "";
let pageNo = 1;

function displayRandomImages (){
    random = 1;
    searchImages();
}


async function searchImages (){

    
    inputData = searchInput.value;
    if(random === 1)
    {
        const randomWords = ['random', 'pink', 'red', 'blue', 'orange', 'black', 'white', "sky","water"];
        const randomTerm = [Math.floor(Math.random() * randomWords.length)];

        inputData = randomTerm;
        random = 1;

        
    }

    const url =`https://api.unsplash.com/search/photos?page=${pageNo}&query=${inputData}&client_id=${accessKey}`;

    

    const responce = await fetch(url);
    const data = await responce.json();

    const results = data.results;

    if(pageNo===1)
    {
        searchResults.innerHTML = "";
    }

    // results.map((result) =>{
    //     const imageContainer = document.createElement("div");
    //     imageContainer.classList.add("search-result");
        
    //     const image = document.createElement("img");
    //     image.src = result.urls.small;
    //     image.alt = result.alt_description;

    //     const imageLink =document.createElement("a");
    //     imageLink.href = result.links.html;
    //     imageLink.target = "_blank";
    //     imageLink.textContent = result.alt_description;

    //     const icon = document.createElement("div"); // Create the icon element
    //     icon.classList.add("icon");


    //     imageContainer.appendChild(image);
    //     imageContainer.appendChild(imageLink);
    //     imageContainer.appendChild(icon)
    //     searchResults.appendChild(imageContainer);


    // });
    

    
    results.map((result) => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("search-result");
        
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        const iconContainer = document.createElement("div");
        iconContainer.classList.add("icon-container");

        const icon1 = document.createElement("div"); 
        icon1.classList.add("icon");
        icon1.style.paddingTop = "15px";

        

        // const img = document.createElement("img");
        // img.src = "https://stock.adobe.com/images/cross-or-plus-symbol-decoration-illustration-vector/493405934";
      
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", "2.25em");
        svg.setAttribute("height", "2.25em");
        svg.setAttribute("viewBox", "0 0 48 48");

        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M24.0605 10L24.0239 38");
        path1.setAttribute("fill", "none");
        path1.setAttribute("stroke", "#000");
        path1.setAttribute("stroke-linecap", "round");
        path1.setAttribute("stroke-linejoin", "round");
        path1.setAttribute("stroke-width", "4");

        let isClicked = false;

        icon1.addEventListener("click", () => {
            if (!isClicked) {
              // Change the SVG when clicked
                icon1.innerHTML = ""; // Clear previous content
                const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                newSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                newSvg.setAttribute("width", "2.25em");
                newSvg.setAttribute("height", "2.25em");
                newSvg.setAttribute("viewBox", "0 0 16 16");
                const newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                newPath.setAttribute("fill", "none");
                newPath.setAttribute("stroke", "black");
                newPath.setAttribute("stroke-linecap", "round");
                newPath.setAttribute("stroke-linejoin", "round");
                newPath.setAttribute("stroke-width", "1.5");
                newPath.setAttribute("d", "m2.75 8.75l3.5 3.5l7-7.5");
                newSvg.appendChild(newPath);
                icon1.appendChild(newSvg);
                isClicked = true;
            }
          });



        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "M10 24L38 24");
        path2.setAttribute("fill", "none");
        path2.setAttribute("stroke", "#000");
        path2.setAttribute("stroke-linecap", "round");
        path2.setAttribute("stroke-linejoin", "round");
        path2.setAttribute("stroke-width", "4");


        const icon2 = document.createElement("div"); 
        icon2.classList.add("icon");


        const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg2.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg2.setAttribute("width", "2em");
        svg2.setAttribute("height", "2em");
        svg2.setAttribute("viewBox", "0 0 48 48");

        const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path3.setAttribute("d", "M39.236 42.5H8.764M24 33.924V5.5M12.287 22.211L24 33.924l11.713-11.713");
        path3.setAttribute("fill", "none");
        path3.setAttribute("stroke", "black");
        path3.setAttribute("stroke-linecap", "round");
        path3.setAttribute("stroke-linejoin", "round");
        path3.setAttribute("stroke-width", "4");

        const downloadLink = document.createElement("a");
        downloadLink.href = result.links.html;
        downloadLink.target = "_blank";



        svg.appendChild(path1);
        svg.appendChild(path2);
        svg2.appendChild(path3);

        icon1.appendChild(svg);

        downloadLink.appendChild(svg2);
        icon2.appendChild(downloadLink);


        imageContainer.appendChild(image);
        imageContainer.appendChild(imageLink);
        
        iconContainer.appendChild(icon1); 
        iconContainer.appendChild(icon2); 
        imageContainer.appendChild(iconContainer)
        searchResults.appendChild(imageContainer);
    });
    


    pageNo++;

    if(pageNo>1)
    {
        showMore.style.display="block";
    }
}

formElement.addEventListener("submit", (event) =>{
    event.preventDefault();
    pageNo=1;
    searchImages();
    showMore.style.display = "block";
});

showMore.addEventListener("click", () =>{
    
    searchImages();
});




searchRes.addEventListener("mouseover",function() {
    icon.style.display='block';
});

searchRes.addEventListener("mouseout",() =>{
    icon.style.display='none';
});





// searchResults.addEventListener("mouseover", function(event) {
//     const searchResult = event.target.closest(".search-result"); // Find the closest ancestor with class .search-result
//     if (searchResult) {
//         const icon = searchResult.querySelector(".icon"); // Find the icon within the search result
//         if (icon) {
//             icon.style.display = 'block'; // Show the icon
//         }
//     }
// });

// searchResults.addEventListener("mouseout", function(event) {
//     const searchResult = event.target.closest(".search-result"); // Find the closest ancestor with class .search-result
//     if (searchResult) {
//         const icon = searchResult.querySelector(".icon"); // Find the icon within the search result
//         if (icon) {
//             icon.style.display = 'none'; // Hide the icon
//         }
//     }
// });


