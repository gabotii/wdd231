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

    // Function to fetch and display the weather data
    async function fetchWeather() {
        const apiKey = '410abe0b3f60e75a0aee07d6608d768b'; // Replace with your actual API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Santiago,CL&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Extract relevant weather information
            const currentTemp = data.main.temp;
            const highTemp = data.main.temp_max;
            const lowTemp = data.main.temp_min;
            const humidity = data.main.humidity;
            const weatherDescription = data.weather[0].description;
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

            // Update the HTML with the weather data
            document.getElementById('currentTemp').textContent = `${currentTemp} °C`;
            document.getElementById('highTemp').textContent = `${highTemp} °C`;
            document.getElementById('lowTemp').textContent = `${lowTemp} °C`;
            document.getElementById('humidity').textContent = `${humidity} %`;
            document.getElementById('weatherDescription').textContent = weatherDescription;
            document.getElementById('sunrise').textContent = sunrise;
            document.getElementById('sunset').textContent = sunset;
        // Add the sun icon if the weather is clear
        const weatherIcon = document.getElementById('weatherIcon');
        if (weatherDescription.toLowerCase().includes('clear')) {
            weatherIcon.textContent = '☀️';
        } else {
            weatherIcon.textContent = '';
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

    // Fetch the weather data when the page loads
    fetchWeather();

    // Function to fetch and display the weather forecast data
    async function fetchWeatherForecast() {
        const apiKey = '410abe0b3f60e75a0aee07d6608d768b'; // Replace with your actual API key
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=Santiago,CL&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Extract relevant forecast information for the next three days
            const forecast = data.list.filter((item, index) => index % 8 === 0).slice(0, 3);
            const forecastElement = document.getElementById('forecast');
            forecastElement.innerHTML = ''; // Clear previous content

            forecast.forEach(item => {
                const date = new Date(item.dt * 1000).toLocaleDateString();
                const temp = item.main.temp;
                const description = item.weather[0].description;

                const forecastItem = document.createElement('li');
                forecastItem.textContent = `${date}: ${temp} °C, ${description}`;
                forecastElement.appendChild(forecastItem);
            });
        } catch (error) {
            console.error('Error fetching weather forecast data:', error);
        }
    }

    // Fetch the weather forecast data when the page loads
    fetchWeatherForecast();

    // Function to generate spotlight members
    async function generateSpotlightMembers() {
        const container = document.getElementById('spotlight-members-container');
        try {
            // Fetch the member data from the JSON file
            const response = await fetch('data/members.json');
            const businesses = await response.json();

            // Filter the spotlight members
            const spotlightMembers = businesses.filter(
                (business) => business.membership_level === 'Gold' || business.membership_level === 'Silver'
            );

            // Randomly select three spotlight members
            const selectedSpotlightMembers = spotlightMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

            // Loop through the selected spotlight members and create the HTML for each card
            selectedSpotlightMembers.forEach((business) => {
                const cardHTML = `
                    <div class="spotlight-member">
                        <img src="${business.image}" alt="${business.name}" />
                        <h2>${business.name}</h2>
                        <p>Membership Level: ${business.membership_level}</p>
                        <p>${business.description}</p>
                        <a href="${business.website_url}" target="_blank">Visit Website</a>
                    </div>
                `;
                container.innerHTML += cardHTML;
            });
        } catch (error) {
            console.error('Error fetching member data:', error);
        }
    }

    // Call the function to generate the spotlight members
    generateSpotlightMembers();
});

document.addEventListener("DOMContentLoaded", () => {
        // Parse URL parameters
        const params = new URLSearchParams(window.location.search);

        // Get elements by their IDs and set their text content
        document.getElementById("first-name").textContent = params.get("first-name") || "N/A";
        document.getElementById("last-name").textContent = params.get("last-name") || "N/A";
        document.getElementById("title").textContent = params.get("title") || "N/A";
        document.getElementById("email").textContent = params.get("email") || "N/A";
        document.getElementById("phone").textContent = params.get("phone") || "N/A";
        document.getElementById("organization").textContent = params.get("organization") || "N/A";
        document.getElementById("description").textContent = params.get("description") || "N/A";
        document.getElementById("membershipLevel").textContent = params.get('membership-level') || "N/A";
        document.getElementById("timestamp").textContent = new Date().toLocaleString();
});

document.addEventListener('DOMContentLoaded', () => {
    const membershipForm = document.getElementById('membershipForm');
    if (!membershipForm) {
        console.error("Membership form not found on the page.");
        return;
    }

    membershipForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page
        try {
            // Collect form data
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const title = document.getElementById('title').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const organization = document.getElementById('organization').value;
            const description = document.getElementById('description').value;
            const membershipLevel = document.querySelector('input[name="membershipLevel"]:checked')?.value || "N/A"; // Get the selected membership level or "N/A"
            const timestamp = new Date().toISOString();

            // Create query string
            const queryParams = new URLSearchParams({
                'first-name': firstName,
                'last-name': lastName,
                'title': title,
                'email': email,
                'phone': phone,
                'organization': organization,
                'description': description,
                'membership-level': membershipLevel,
                'timestamp': timestamp
            }).toString();

            // Redirect to the thank you page with query parameters
            window.location.href = `thankyou.html?${queryParams}`;
        } catch (error) {
            console.error("Error processing form submission:", error);
            alert("An error occurred while submitting the form. Please check your input and try again.");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    try {
        // Attach modal functionality
        document.querySelectorAll(".membership-card").forEach(card => {
            try {
                const modal = card.querySelector("dialog.modal");
                const openButton = card.querySelector(".open-modal");
                const closeButton = modal.querySelector(".close-modal");

                if (!modal || !openButton || !closeButton) {
                    throw new Error("Modal or buttons not found in the card.");
                }

                openButton.addEventListener("click", () => modal.showModal());
                closeButton.addEventListener("click", () => modal.close());
            } catch (error) {
                console.error("Error attaching modal functionality for a card:", error);
            }
        });
    } catch (error) {
        console.error("Error initializing modal functionality:", error);
        alert("An error occurred while setting up modals. Please refresh the page.");
    }
});
  