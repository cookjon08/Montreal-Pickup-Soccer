# Capstone Project - Montreal Pickup Soccer

## Overview

Montreal Pickup Soccer is an app where you can post and view game listings for "pickup" soccer games around the city. Pickup is a common term to describe loosely-organized, free-to-play, open-to-all soccer games, usually held in many of Montreal's parcs and open green spaces.

## Table of Contents

- [Usage](#usage)
- [Frontend Implementation](#frontend-implementation)
- [Backend Implementation](#backend-implementation)
- [Stretch Goals](#stretch-goals)

## Usage

You can perform the following actions:

- **Post game**: Fill out a form and select which neighbourhood, parc and field the game will be held.
- **View map**: See the location of the game using the city's official athletic fields API and HERE map services.
- **Edit game**: Edit certain form info after posting the game.
- **Delete game**: Delete the game from the Gameboard.

## Frontend Implementation

### Overview

The frontend is built with **React** and **styled-components** for dynamic styling.

### Key Components

- **Home Page (Home.js)**: Displays the name, an animated soccer ball using Font Awesome, and links to the game submission form, the board of game listings, and the about page.
- **About Page (About.js)**: Details the intent of the project.
- **Gameboard Page (Games.js)**: Displays all the available game postings with functionality to view map and edit and delete games.
- **Start Game Page (StartGame.js)**: Allows users to submit their game by filling out a form.

### Styling

- **Styled Components**: Used extensively for individual component styling, ensuring modular and reusable styles.

### Interactivity

- **State Management**: React's `useState` and `useEffect` hooks are used for managing component states and fetching from the backend.

## Backend Implementation

### Overview

The backend is implemented using **Node.js** and **Express.js**, following RESTful principles. **MongoDB** is used as the database to store and manage the application data.

### Core Functionalities

- **GET /fields/:hood**: Fetches all fields from the database.
- **GET /fields-by-parc/:parc**: Fetches a field based on its parc index from the database.
- **GET /games**: Fetches all games from the database.
- **GET /game/:id**: Fetches a game by its unique ID.
- **POST /create-game**: Add a game to the database.
- **PUT /manage-game/:id**: Edit a game based on its unique ID.
- **DELETE /delete-game/:id**: Deletes a game based on its unique ID.
