const accessKey = "Ek485KnFknl5W2ZA03lJfTHvv7yfJvGhhd9hV21HndU";

const formElement = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");
const sidebarIcons = document.querySelectorAll('.sidebar-icons');
const dropdownLinks = document.querySelectorAll('.dropdown-content div');

let inputData = "";
let pageNo = 1;

function getRandomSearchTerm() {
    const randomWords = ['random', 'baby', 'car', 'birds', 'pink', 'Night', 'Drink', 'sky', 'water'];
    return randomWords[Math.floor(Math.random() * randomWords.length)];
}

function displayRandomImages() {
    searchInput.value = getRandomSearchTerm();
    searchImages(true);
}

async function searchImages(isNewSearch = false) {
    if (isNewSearch) {
        pageNo = 1;
        searchResults.innerHTML = "";
    }

    inputData = searchInput.value || getRandomSearchTerm();

    const url = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    results.forEach((result) => {
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
        const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg1.setAttribute("width", "2.25em");
        svg1.setAttribute("height", "2.25em");
        svg1.setAttribute("viewBox", "0 0 48 48");
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M24.0605 10L24.0239 38");
        path1.setAttribute("fill", "none");
        path1.setAttribute("stroke", "#000");
        path1.setAttribute("stroke-linecap", "round");
        path1.setAttribute("stroke-linejoin", "round");
        path1.setAttribute("stroke-width", "4");
        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "M10 24L38 24");
        path2.setAttribute("fill", "none");
        path2.setAttribute("stroke", "#000");
        path2.setAttribute("stroke-linecap", "round");
        path2.setAttribute("stroke-linejoin", "round");
        path2.setAttribute("stroke-width", "4");

        svg1.appendChild(path1);
        svg1.appendChild(path2);
        icon1.appendChild(svg1);

        let isClicked = false;
        icon1.addEventListener("click", () => {
            if (!isClicked) {
                icon1.innerHTML = "";
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

        

        const icon2 = document.createElement("div");
        icon2.classList.add("icon");
        const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
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

        svg2.appendChild(path3);
        downloadLink.appendChild(svg2);
        icon2.appendChild(downloadLink);

        imageContainer.appendChild(image);
        imageContainer.appendChild(imageLink);
        iconContainer.appendChild(icon1);
        iconContainer.appendChild(icon2);
        imageContainer.appendChild(iconContainer);
        searchResults.appendChild(imageContainer);
    });

    pageNo++;
    showMore.style.display = "block"; // Show the "Show More" button
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    searchImages(true);
});

showMore.addEventListener("click", () => {
    searchImages();
});

sidebarIcons.forEach(icon => {
    if (icon.getAttribute('data-query')) {
        icon.addEventListener('click', () => {
            searchInput.value = icon.getAttribute('data-query').trim();
            searchImages(true);
        });
    }
});

dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        searchInput.value = link.getAttribute('data-query').trim();
        searchImages(true);
    });
});


