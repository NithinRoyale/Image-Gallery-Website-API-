

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, set, push , ref, get, child, update } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB78syYL7IBWxr4cxeFwI54tSsRiwXH9ls",
    authDomain: "image-gallery-api-257d8.firebaseapp.com",
    databaseURL: "https://image-gallery-api-257d8-default-rtdb.firebaseio.com",
    projectId: "image-gallery-api-257d8",
    storageBucket: "image-gallery-api-257d8.appspot.com",
    messagingSenderId: "590720156198",
    appId: "1:590720156198:web:0bf983a4dcad7284e71ce7"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);
// const dbRef = firebase.database().ref();


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
    const randomWords = ['random', 'baby', 'car', 'bird', 'pink', 'Night', 'Drink', 'sky', 'ocean','People','abstract'];
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
    // const downloadLocation = `https://api.unsplash.com/photos/${result.id}/download?client_id=${accessKey}`;


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
        svg1.setAttribute("width", "48");
        svg1.setAttribute("height", "48");
        svg1.setAttribute("viewBox", "0 0 24 24");
        svg1.setAttribute("fill", "black");

        const path1_1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1_1.setAttribute("d", "M14 5H6c-1.103 0-2 .897-2 2v16l6-3.601L16 23V7c0-1.103-.897-2-2-2zm0 14.467-4-2.399-4 2.399V7h8v12.467z");
        const path1_2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1_2.setAttribute("d", "M18 1h-8c-1.103 0-2 .897-2 2h8c1.103 0 2 .897 2 2v10.443l2 2.489V3c0-1.103-.897-2-2-2z");

        svg1.appendChild(path1_1);
        svg1.appendChild(path1_2);
        icon1.appendChild(svg1);

        let isClicked = false;

        icon1.addEventListener("click", () => {
            if (!isClicked) {
                const userId = auth.currentUser.uid;
                const imageId = result.id;
        
                // Reference to the user's imageIds in the database
                const userImageListRef = ref(db, `UsersAuthList/${userId}/imageIds`);
        
                // Check if the imageId already exists
                get(userImageListRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        const imageIds = snapshot.val();
                        const imageIdExists = Object.values(imageIds).includes(imageId);
        
                        if (!imageIdExists) {
                            // Add imageId only if it doesn't exist
                            push(userImageListRef, imageId)
                                .then(() => {
                                    console.log("Image ID added successfully!");
                                })
                                .catch((error) => {
                                    console.error("Error adding Image ID:", error);
                                });
                        } else {
                            console.log("Image ID already exists, not adding again.");
                        }
                    } else {
                        // No existing imageIds, so directly add the first one
                        push(userImageListRef, imageId)
                            .then(() => {
                                console.log("Image ID added successfully!");
                            })
                            .catch((error) => {
                                console.error("Error adding Image ID:", error);
                            });
                    }
                }).catch((error) => {
                    console.error("Error retrieving Image IDs:", error);
                });




                icon1.innerHTML = "";

                // SVG2 (changed state)
                const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg2.setAttribute("width", "48");
                svg2.setAttribute("height", "48");
                svg2.setAttribute("viewBox", "0 0 24 24");
                svg2.setAttribute("fill", "#2f88ff");

                const path2_1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path2_1.setAttribute("d", "M16.999 23V7c0-1.103-.897-2-2-2h-8c-1.103 0-2 .897-2 2v16l6-3.601 6 3.601z");
                path2_1.setAttribute("fill", "#2f88ff");
                path2_1.setAttribute("stroke", "black");
                path2_1.setAttribute("stroke-width", "2");

                const path2_2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path2_2.setAttribute("d", "M15.585 3h1.414c1.103 0 2 .897 2 2v10.443l2 2.489V3c0-1.103-.897-2-2-2h-8c-1.103 0-2 .897-2 2h6.586z");
                path2_2.setAttribute("fill", "none");
                path2_2.setAttribute("stroke", "black");
                path2_2.setAttribute("stroke-width", "1.5");

                svg2.appendChild(path2_1);
                svg2.appendChild(path2_2);
                icon1.appendChild(svg2);

                isClicked = true;
            }
        });

        const icon2 = document.createElement("div");
        icon2.classList.add("icon");
        const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg2.setAttribute("width", "48");
        svg2.setAttribute("height", "48");
        svg2.setAttribute("viewBox", "0 0 48 48");

        // Creating the new paths for the SVG
        const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path4.setAttribute("fill", "#2f88ff");
        path4.setAttribute("fill-rule", "evenodd");
        path4.setAttribute("stroke", "#000");
        path4.setAttribute("stroke-linecap", "round");
        path4.setAttribute("stroke-width", "4");
        path4.setAttribute("stroke-linejoin", "round");
        path4.setAttribute("d", "M23.9999 29.0001L12 17.0001L19.9999 17.0001L19.9999 6.00011L27.9999 6.00011L27.9999 17.0001L35.9999 17.0001L23.9999 29.0001Z");
        const path5 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path5.setAttribute("d", "M42 37L6 37");
        path5.setAttribute("fill", "none");
        path5.setAttribute("stroke", "#000");
        path5.setAttribute("stroke-linecap", "round");
        path5.setAttribute("stroke-width", "4");
        const path6 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path6.setAttribute("d", "M34 44H14");
        path6.setAttribute("fill", "none");
        path6.setAttribute("stroke", "#000");
        path6.setAttribute("stroke-linecap", "round");
        path6.setAttribute("stroke-width", "4");

       
        svg2.appendChild(path4);
        svg2.appendChild(path5);
        svg2.appendChild(path6);
        icon2.appendChild(svg2);

        icon2.addEventListener("click", () => {

            const downloadLink = document.createElement("a");
            downloadLink.href = result.links.download;
            downloadLink.target = "_blank";
            downloadLink.download = 'downloaded-image.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });


        // svg2.appendChild(path3);
        // downloadLink.appendChild(svg2);
        // icon2.appendChild(downloadLink);

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

// Expose searchImages to the global scope
window.searchImages = searchImages;

// Automatically load images on page load
document.addEventListener("DOMContentLoaded", () => {
    searchImages(true);
});

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    searchImages(true);
});

showMore.addEventListener("click", () => {
    searchImages(false);
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

displayRandomImages();
