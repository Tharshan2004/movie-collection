// --- 1. CONFIGURATION ---

// IMPORTANT: Replace with your actual API key from TMDB
const API_KEY = '630df3c1d1f3245c7f0ba84b3b475521';

// Define the movie collections you want to choose from.
// You can find more collection IDs by searching on the TMDB website.
const COLLECTIONS = [
    { id: 10, name: 'Star Wars' },
    { id: 86311, name: 'The Avengers' },
    { id: 645, name: 'James Bond' },
    { id: 1241, name: 'Harry Potter' },
    { id: 295, name: 'Pirates of the Caribbean' },
];

// --- 2. GET HTML ELEMENTS ---

const chooserContainer = document.getElementById('collection-chooser');
const loader = document.getElementById('loader');
const movieListContainer = document.getElementById('movie-list');
const errorMessageContainer = document.getElementById('error-message');
const currentCollectionTitle = document.getElementById('current-collection-title');

// --- 3. CORE FUNCTIONS ---

/**
 * Fetches and displays movies for a given collection ID.
 * @param {number} collectionId The ID of the collection to fetch.
 * @param {string} collectionName The name of the collection for the title.
 */
async function fetchAndDisplayMovies(collectionId, collectionName) {
    // Show loading spinner and hide previous results/errors
    loader.style.display = 'block';
    errorMessageContainer.style.display = 'none';
    movieListContainer.innerHTML = '';
    currentCollectionTitle.textContent = `Loading: ${collectionName} Collection...`;

    try {
        const apiUrl = `https://api.themoviedb.org/3/collection/${collectionId}?api_key=${API_KEY}&language=en-US`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`API request failed. Status: ${response.status}`);
        }

        const data = await response.json();
        displayMovies(data);

    } catch (error) {
        console.error("Error fetching movies:", error);
        errorMessageContainer.textContent = 'Sorry, could not load movies. Please try again later.';
        errorMessageContainer.style.display = 'block';
        currentCollectionTitle.textContent = '';
    } finally {
        // This always runs, whether the fetch succeeded or failed
        loader.style.display = 'none';
    }
}

/**
 * Renders the movie data into HTML cards on the page.
 * @param {object} collectionData The full collection data from the API.
 */
function displayMovies(collectionData) {
    // Clear any previous movie cards
    movieListContainer.innerHTML = '';
    
    // Update the title
    currentCollectionTitle.textContent = `Showing: ${collectionData.name}`;

    collectionData.parts.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';

        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
            <div class="movie-card-content">
                <h3>${movie.title}</h3>
                <p><strong>Release Date:</strong> ${movie.release_date}</p>
                <p>${movie.overview.substring(0, 150)}...</p> 
            </div>
        `;
        movieListContainer.appendChild(movieCard);
    });
}

/**
 * Creates the collection choice buttons and adds them to the page.
 */
function createCollectionButtons() {
    COLLECTIONS.forEach(collection => {
        const button = document.createElement('button');
        button.className = 'collection-btn';
        button.textContent = collection.name;
        // Store the ID and name in the button's dataset for easy access
        button.dataset.collectionId = collection.id;
        button.dataset.collectionName = collection.name;
        chooserContainer.appendChild(button);
    });
}

// --- 4. EVENT LISTENERS AND INITIALIZATION ---

// Listen for clicks on the button container
chooserContainer.addEventListener('click', (event) => {
    // Check if a collection button was clicked
    if (event.target.matches('.collection-btn')) {
        const button = event.target;
        const collectionId = button.dataset.collectionId;
        const collectionName = button.dataset.collectionName;

        // Remove 'active' class from all buttons
        document.querySelectorAll('.collection-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        // Add 'active' class to the clicked button
        button.classList.add('active');
        
        // Fetch movies for the selected collection
        fetchAndDisplayMovies(collectionId, collectionName);
    }
});

// Function to start the app
function initializeApp() {
    createCollectionButtons();
    // Set the first button as active and load its collection by default
    if (COLLECTIONS.length > 0) {
        const firstButton = chooserContainer.querySelector('.collection-btn');
        firstButton.classList.add('active');
        fetchAndDisplayMovies(COLLECTIONS[0].id, COLLECTIONS[0].name);
    }
}

// Start the application!
initializeApp();