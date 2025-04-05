# Real Estate Website

## Project Overview
This web application allows users to search for properties available for sale or rent. It provides detailed property information such as price, size, location, and amenities, along with images. Users can browse listings, view property images, and see locations on a map.

## Features:
- Property Search: Users can search for properties by title or location using the search bar.

- Filters: Properties can be filtered by status (for sale or for rent), and results can be sorted by price (low to high or high to low).

- Property Listings: A list of available properties, displaying basic information such as the title, location, price, and description.

- Image Slider: Properties are displayed in an image slider for a quick preview of the property images.

P-roperty Details Modal: Clicking on a property or any image in the slider or gallery opens a modal with more detailed information about the property, including images, a description, and a Google Map showing the property location.

- Pagination: Users can browse through multiple pages of listings with the pagination controls.

- Responsive Design: The website is designed to be responsive, ensuring it works well on different screen sizes, from mobile to desktop.

## Requirements
- Install [Node.js](https://nodejs.org/) (includes npm)
- Install Sass to compile SCSS into CSS

## Setup Guide
1. Clone the project:
   ```sh
   git clone https://github.com/your-username/real-estate-website.git
   cd real-estate-website
   ```
2. Install required packages:
   ```sh
   npm install
   ```
3. Compile SCSS to CSS:
   ```sh
   npm run sass
   ```
4. Start a local server:
   ```sh
   npm run start
   ```
5. Open `index.html` in a browser or go to `http://localhost:3000` if using a local server.

## Technologies Used:

- **HTML5** To structure the content.

- **CSS/SCSS** For styling the website, with SCSS used for easier maintenance and dynamic styling.

- **JavaScript(ES6)**  To add interactivity to the website, such as image sliders, modals, and dynamic property loading.

- **Latitude and Longitude** for displaying property locations on a map

## How It Works:

- The property data (title, description, images, price, and location) is stored in a JSON file (real_estates.json), which is fetched and displayed dynamically.

- The slider component allows users to see images of the properties in a carousel format.

- Property Details Modal: When a user clicks on a property listing, an image in the slider, or any gallery image, a modal opens with detailed information about the property, including images, a description, and a Google Map showing the exact location.

- Filters and search: Users can filter properties based on whether they are for sale or for rent and can sort properties by price. There’s also a search bar for location or title-based searches.

## Pages:

- Home (index.html): The main page displaying the property slider and a list of properties for sale or rent.

- Gallery (gallery.html): A dedicated gallery page where users can view more images and details of properties.

- Company (company.html): Information about the company behind the real estate website.

- Team (team.html): A page showcasing the team behind the platform.

- Contacts (contacts.html): Contact information and a contact form for users to get in touch with the real estate agency.

## Additional Features:

- Property Pagination: Pagination allows users to navigate through multiple pages of properties.

- Property Modal: When a user clicks on a property listing, an image in the slider, or any image in the gallery, a modal opens with detailed information about the property, including images and a Google Map embedded with the location of the property.

- Google Map Integration: The modal includes a map that displays the exact location of the property based on the provided latitude and longitude coordinates.