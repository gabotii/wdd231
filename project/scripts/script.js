// Update lastModified
document.addEventListener('DOMContentLoaded', (event) => {
    const currentyear = document.querySelector("#currentyear");
    const lastModifiedElement = document.getElementById('lastModified');

    if (currentyear && lastModifiedElement) {
        currentyear.textContent = new Date().getFullYear();

        const date = new Date();
        const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const usDateFormat = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
        lastModifiedElement.textContent = usDateFormat;
    }
});
