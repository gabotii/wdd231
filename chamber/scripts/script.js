document.addEventListener('DOMContentLoaded', () => { 
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('animateme');
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Mobile menu toggle functionality
    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.textContent = navLinks.classList.contains('active') ? '✖' : '☰';
    });

    // Set the last modified date in the footer
    const lastModifiedDateElement = document.getElementById("lastModifiedDate");
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
    lastModifiedDateElement.textContent = formattedDate;

    // Toggle Dark Mode functionality
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    // Add dark mode styles dynamically
    const darkModeStyles = document.createElement("style");
    darkModeStyles.textContent = `
        .dark-mode {
            background-color: #121212;
            color: #ffffff;
        }

        .dark-mode header {
            background-color: #333;
        }

        .dark-mode .bg-light {
            background-color: #444 !important;
            color: #ffffff;
        }

        .dark-mode footer {
            background-color: #222;
        }

        .dark-mode .card {
            background-color: #555;
            color: #ffffff;
        }
    `;
    document.head.appendChild(darkModeStyles);

    // Function to fetch and generate business cards
    async function generateBusinessCards() {
        const container = document.getElementById('members-container');
        try {
            // Fetch the member data from the JSON file
            const response = await fetch('data/members.json');
            const businesses = await response.json();

            // Loop through the businesses and create the HTML for each card
            businesses.forEach(business => {
                const cardHTML = `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${business.image}" class="card-img-top" alt="${business.name}" loading="lazy">
                            <div class="card-body">
                                <h5 class="card-title">${business.name}</h5>
                                <p class="card-text">${business.membership_level} Member</p>
                                <p><strong>Address:</strong> ${business.address}</p>
                                <p><strong>Phone:</strong> ${business.phone}</p>
                                <p><a href="${business.website_url}" class="btn btn-primary" target="_blank">Visit Website</a></p>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += cardHTML;
            });
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    }

    // Call the function to generate the cards
    generateBusinessCards();

    // Toggle between Grid and List View
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const membersContainer = document.getElementById('members-container');

    // Set the default view to grid
    membersContainer.classList.add('grid-view');

    gridViewBtn.addEventListener('click', () => {
        membersContainer.classList.remove('list-view');
        membersContainer.classList.add('grid-view');
    });

    listViewBtn.addEventListener('click', () => {
        membersContainer.classList.remove('grid-view');
        membersContainer.classList.add('list-view');
    });
});