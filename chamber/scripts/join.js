document.addEventListener('DOMContentLoaded', function() {
    // Set current timestamp
    document.getElementById('timestamp').value = new Date().toISOString();

    // Validate organizational title
    const orgTitleInput = document.getElementById('orgTitle');
    orgTitleInput.addEventListener('input', function() {
        const pattern = /^[A-Za-z\s-]{7,}$/;
        if (this.value && !pattern.test(this.value)) {
            this.setCustomValidity('Please enter at least 7 characters, using only letters, spaces, and hyphens.');
        } else {
            this.setCustomValidity('');
        }
    });
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const formData = document.getElementById('formData');
    const urlParams = new URLSearchParams(window.location.search);
    
    const requiredFields = [
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
        { name: 'email', label: 'Email' },
        { name: 'phone', label: 'Mobile Phone' },
        { name: 'orgName', label: 'Business/Organization Name' },
        { name: 'timestamp', label: 'Submission Date' }
    ];

    let html = '<ul>';
    requiredFields.forEach(field => {
        const value = urlParams.get(field.name);
        if (value) {
            html += `<li><strong>${field.label}:</strong> ${value}</li>`;
        }
    });
    html += '</ul>';

    formData.innerHTML = html;
});
