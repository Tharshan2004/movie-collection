# Movie Collection Browser

A clean and interactive web application that allows users to browse through popular movie collections using data from The Movie DB (TMDB) API. This project was built as a technical demonstration for a job interview.

**✨ Live Demo Link:** [**movie-collection208.netlify.app**](https://movie-collection208.netlify.app/)


## Features

-   **Interactive Collection Switching:** Users can manually select from a predefined list of popular movie collections.
-   **Dynamic Content Loading:** All movie data is fetched asynchronously from the TMDB API.
-   **User-Friendly Interface:** Includes clear loading states and error messages for a smooth user experience.
-   **Responsive Design:** The layout is fully responsive and works well on both desktop and mobile devices.

## How to Run Locally

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Tharshan2004/movie-collection.git
    cd movie-collection
    ```
2.  **Open in Browser**
    -   Simply open the `index.html` file in any modern web browser.

## Technical Note on "RecyclerView"

The term "RecyclerView" is native to Android development and prized for its memory efficiency. For this web-based task, I have interpreted its core principle as the requirement to **dynamically generate a list of UI elements from a data source**. This application demonstrates that pattern by fetching an array of movie data and mapping it to a grid of movie cards in the DOM.
