# Image Gallery Website

This website is an image gallery platform that utilizes the Unsplash API to display images based on user queries. It integrates functionalities such as real-time object detection using TensorFlow.js, user authentication with Firebase, and personalized search history. Users can upload images, detect objects, and search for related content. The site features a dynamic, user-friendly interface with responsive design powered by Bootstrap and JavaScript, enhancing the overall user experience.

## Hosted Link 

You can access the hosted version of the website [Image Gallery Website](https://nithinroyale.github.io/Image-Gallery-Website-API-/).

## Features

### 1. User Authentication & Profile Management
- Firebase Authentication is used to manage user accounts, login, and sign-out functionality. The current user’s UID is retrieved from Firebase for personalized data search using search history.
- **Profile Icon & Dropdown**: The profile icon is clickable, displaying a dropdown menu for user actions. The dropdown can be toggled and automatically closes if clicked outside.

### 2. Image Detection with TensorFlow.js
- The TensorFlow COCO-SSD Model is integrated to perform real-time image detection on user-uploaded images.
  - It processes the image using TensorFlow's COCO-SSD object detection model.
  - Detects objects and displays the label of the first detected object.
  - Automatically inputs the detected object label into the search bar and triggers a search.

### 3. Image Search and History
- **Image Search Functionality**:
  - Users can search for images by typing search terms or using the detected label from uploaded images.
  - The search term is normalized (converted to lowercase) before saving and processing.
  - The system prevents duplicate search terms and limits the search history to the last 10 unique searches.
- **Search History Management**:
  - The website stores the user's search history in Firebase Realtime Database under the user's data.
  - Searches are saved in the Searches list under the user's profile, avoiding duplicate entries.

### 4. Image Gallery Logo/Header
- Displays random images, leveraging the website’s backend to show images related to search terms, designed to load dynamically when the user interacts with the gallery.

### 5. User Interface (UI) Features
- **Search Button**: Users can manually click the search button, or it’s automatically triggered after an object detection event.
- **Top Button**: A "Scroll to Top" button appears when the user scrolls down, enhancing the navigation experience.
- **Popup Management**: The website includes popup elements to show messages or additional information to the user, styled using CSS and controlled by JavaScript.
- **Responsive Design & Animations**: Uses Bootstrap 5.2 for a responsive layout, ensuring a clean UI across different screen sizes. Hover effects and animations enhance interactivity.
- **Bookmark/Saved Icon**: This icon allows users to save their favorite images for easy access later.
- **Download Icon**: The download icon enables users to conveniently download images to their devices.
- **Show More Button** : Users can click the "Show More" button to load additional search results.

### 6. Session Management
- **Session Storage**: User sessions and profile information are maintained using JavaScript session storage.

### 7. Sign-out Functionality
- A sign-out button enables users to securely log out, redirecting them to the homepage (index.html) and clearing session data.

### 8. Unsplash API - JavaScript Functions
- The Unsplash API enables dynamic retrieval of high-resolution images through various endpoints, requiring authentication via an API key.

### 9. Error Handling
- **Firebase Error Handling**: In case of any errors while fetching or saving user data, appropriate error messages are logged to the console.
- **No Object Detected**: If no objects are detected in an uploaded image, a message informs the user.

## Technologies Used
- **Frontend**:
  - HTML5, CSS3, JavaScript (Vanilla JS and ES6+)
  - Bootstrap for responsive design
  - TensorFlow.js for object detection
- **Backend**:
  - Firebase Realtime Database for storing user data, search history, and authentication

## Conclusion
The website integrates advanced technologies like TensorFlow for real-time image detection, Firebase for user management and search history, and a clean UI design for an intuitive user experience. It is built to offer efficient search functionalities, personalized user sessions, and dynamic UI components.

## Contributors
- [Nithin](https://github.com/NithinRoyale/)


