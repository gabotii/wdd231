document.addEventListener("DOMContentLoaded", () => {
    const messageElement = document.getElementById("visitMessage");
    const viewCounterElement = document.getElementById("viewCounter");

    // Handle last visit message
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (lastVisit) {
        const daysElapsed = Math.floor((now - parseInt(lastVisit, 10)) / (1000 * 60 * 60 * 24));
        if (daysElapsed < 1) {
            messageElement.textContent = "Back so soon! Awesome!";
        } else {
            messageElement.textContent = `You last visited ${daysElapsed} day${daysElapsed > 1 ? "s" : ""} ago.`;
        }
    } else {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    }
    localStorage.setItem("lastVisit", now.toString());

    // Handle view counter
    let viewCount = parseInt(localStorage.getItem("viewCount"), 10) || 0;
    viewCount++;
    localStorage.setItem("viewCount", viewCount.toString());

    viewCounterElement.textContent = `You have visited this page ${viewCount} time${viewCount > 1 ? "s" : ""}.`;

    // Lazy loading images with a limit
    const lazyImages = document.querySelectorAll("img.lazy");
    const imageLimit = 3; // Set the maximum number of times an image can be viewed

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const imgId = img.getAttribute("data-id"); // Unique ID for the image
                let imgViewCount = parseInt(localStorage.getItem(`imgViewCount-${imgId}`), 10) || 0;

                if (imgViewCount < imageLimit) {
                    const lazySrc = img.getAttribute("src-lazy"); // Get the lazy-loaded image source
                    if (lazySrc) {
                        img.src = lazySrc; // Set the actual source
                        img.removeAttribute("src-lazy"); // Remove the lazy attribute
                        img.classList.remove("lazy"); // Remove the lazy class

                        // Increment the view count for the image
                        imgViewCount++;
                        localStorage.setItem(`imgViewCount-${imgId}`, imgViewCount.toString());
                    }
                } else {
                    // Unobserve the image if view limit is reached
                    observer.unobserve(img);
                    img.src = "images/loading.webp"; // Placeholder for the limit reached
                }
            }
        });
    });

    lazyImages.forEach((img, index) => {
        img.setAttribute("data-id", index); // Assign a unique ID to each image
        observer.observe(img); // Observe each lazy image
    });
});
