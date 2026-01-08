## Overview of Structure and Approach

This is a single page vacation hotel room rental website created using **Vanilla HTML ,CSS and Javascript** (no frameworks).

I designed the page with a clear, logical flow that works well on both desktop and mobile devices:

Header
    A clean white header containing the logo and navigation menu (with a mobile hamburger toggle).
Breadcrumb
    A subtle gray bar showing the user's current location in the site hierarchy (e.g., Park Shore Rentals > USA > Florida > Destin).
Main Content Area
    The layout splits into two columns on desktop:
    Left column (main content):
        Property title and key details (rating, bedrooms, bathrooms, guests)
        Image gallery (one large main image + two smaller thumbnails) and clicking the show more button turns on the image slider and shows all the images inside the image gallery using a slider and different view for mobile devices
        Brief property description with a "Show more"  button that when clicked shows much more details and can be collapsed back
        Location section with text info and an embedded Google Maps iframe
    Right column (sticky booking card):
        The booking sidebar stays fixed in place while scrolling (until it reaches the footer), making it easy for users to check prices and availability at any time.The prices also updates dynamically depending on the number of nights the user is staying per night being 2026$.
Reviews Section
    A dedicated white section below the main content displaying customer reviews in a responsive grid (3 columns on desktop, 1 column on mobile).
Favourite Section
    A favourite section above the footer where a property can be marked with favourite (Heart Icon) and the changes
    persist through out local storage and remains after reload.This is done by storing a unique identifier in the local
    storage.
Footer
    A dark footer with categorized links, legal information, and copyright details.

This structure ensures a smooth user experience: visitors see the most important information (images, description, and booking options) right away, while the sticky sidebar keeps the call-to-action always accessible without feeling intrusive.

## BREAKPOINTS ##
- **Mobile** (up to 448px)
- **Tablet** (449px – 991px)
- **Desktop** (992px and up)

## Assumptions and Limitations ##
(i)-Font Awesome is included via CDN for icons (stars, features, notes).
(ii)-No CSS variables
(iii)-Very minimal accessiblity
(iv)Images could be compressed


## Acknowledgements ##
All the images are taken freely from internet 


