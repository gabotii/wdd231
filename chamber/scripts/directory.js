document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const gridBtn = document.getElementById('gridBtn');
    const listBtn = document.getElementById('listBtn');
    const directory = document.getElementById('directory');
    const themeToggleBtn = document.getElementById('themeToggle');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        hamburger.textContent = hamburger.classList.contains('open') ? '✕' : '☰';
        hamburger.setAttribute('aria-expanded', 
            hamburger.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
        
        if (navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            navMenu.classList.add('hide');
        } else {
            navMenu.classList.remove('hide');
            navMenu.classList.add('show');
        }
    });

    // Grid and List view buttons
    gridBtn?.addEventListener('click', () => {
        directory.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        localStorage.setItem('viewPreference', 'grid');
    });

    listBtn?.addEventListener('click', () => {
        directory.classList.add('list-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        localStorage.setItem('viewPreference', 'list');
    });

    // Load saved view preference
    const savedView = localStorage.getItem('viewPreference');
    if (savedView === 'list') {
        listBtn?.click();
    }

    // Fetch and display members
    async function getMembers() {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error('Failed to fetch members data');
            }
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error('Error:', error);
            directory.innerHTML = '<p class="error">Error loading member data. Please try again later.</p>';
        }
    }

    function displayMembers(members) {
        directory.innerHTML = members.map(member => {
            const website = member.website_url ? member.website_url.replace(/^https?:\/\//, '') : ''; 
            return `
                <div class="business-card membership-${member.membershipLevel}">
                    <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="200" height="120">
                    <div class="business-info">
                        <h2>${member.name}</h2>
                        <p class="address">${member.address}</p>
                        <p class="phone">${member.phone}</p>
                        <p class="website"><a href="${member.website_url}" target="_blank" rel="noopener">${website}</a></p>
                        <p class="description">${member.description}</p>
                        ${getMembershipBadge(member.membershipLevel)}
                    </div>
                </div>
            `;
        }).join('');
        lazyLoadImages();
    }

    function getMembershipBadge(level) {
        switch(level) {
            case 3:
                return '<span class="badge gold">Gold Member</span>';
            case 2:
                return '<span class="badge silver">Silver Member</span>';
            case 1:
                return '<span class="badge bronze">Bronze Member</span>';
            default:
                return '';
        }
    }

    function lazyLoadImages() {
        const images = document.querySelectorAll('.business-card img');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.dataset.src = img.src;
            img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
            observer.observe(img);
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('show');
            navMenu.classList.add('hide');
            hamburger.classList.remove('open');
            hamburger.textContent = '☰';
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Theme toggle
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        theme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    });

    getMembers();
});

// Update copyright year and last modified date
document.getElementById('year').textContent = new Date().getFullYear();

const lastModified = new Date(document.lastModified);
document.getElementById('lastModified').textContent = lastModified.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});