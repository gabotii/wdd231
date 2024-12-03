document.addEventListener("DOMContentLoaded", () => {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    const messageElement = document.getElementById("visitMessage");

    if (lastVisit) {
        const daysElapsed = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysElapsed < 1) {
            messageElement.textContent = "Back so soon! Awesome!";
        } else {
            messageElement.textContent = `You last visited ${daysElapsed} day${daysElapsed > 1 ? "s" : ""} ago.`;
        }
    } else {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    }

    localStorage.setItem("lastVisit", now);

    // Lazy loading images
    const lazyImages = document.querySelectorAll("img.lazy");
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
});