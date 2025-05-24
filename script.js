// Store subtitles in memory (in a real application, this would be in a database)
let subtitles = [];

// Function to generate clean ID from title
function generateCleanId(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '') // Remove all special characters and spaces
        .trim();
}

// Function to update JSON preview
function updateJsonPreview() {
    const formData = {
        title: document.getElementById('title').value,
        id: document.getElementById('generatedId').value,
        category: document.getElementById('category').value,
        language: document.getElementById('language').value,
        fileType: document.getElementById('fileType').value,
        uploadDate: document.getElementById('uploadDate').value,
        year: document.getElementById('year').value,
        englishDownloadUrl: document.getElementById('englishDownloadUrl').value,
        sinhalaDownloadUrl: document.getElementById('sinhalaDownloadUrl').value,
        posterUrl: document.getElementById('posterUrl').value,
        description: document.getElementById('description').value,
        downloads: parseInt(document.getElementById('downloadCount').value) || 0
    };

    document.getElementById('jsonPreview').textContent = 
        JSON.stringify(formData, null, 2);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set up form submission handler
    const form = document.getElementById('subtitleForm');
    form.addEventListener('submit', handleFormSubmit);

    // Set up title input handler for automatic ID generation
    const titleInput = document.getElementById('title');
    const generatedIdInput = document.getElementById('generatedId');
    
    titleInput.addEventListener('input', (e) => {
        const cleanId = generateCleanId(e.target.value);
        generatedIdInput.value = cleanId || 'ID will be generated automatically';
        updateJsonPreview();
    });

    // Set up upload date handler for automatic year filling
    const uploadDateInput = document.getElementById('uploadDate');
    const yearInput = document.getElementById('year');

    uploadDateInput.addEventListener('change', (e) => {
        const date = new Date(e.target.value);
        if (!isNaN(date.getFullYear())) {
            yearInput.value = date.getFullYear();
            updateJsonPreview();
        }
    });

    // Set up real-time JSON preview for all form inputs
    const formInputs = form.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', updateJsonPreview);
        input.addEventListener('change', updateJsonPreview);
    });

    // Initial language setup and JSON preview
    updatePageLanguage();
    updateJsonPreview();
});

// Function to generate clean ID from title
function generateCleanId(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '') // Remove all special characters and spaces
        .trim();
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const newSubtitle = {
        id: generateCleanId(title),
        title: title,
        category: document.getElementById('category').value,
        language: document.getElementById('language').value,
        fileType: document.getElementById('fileType').value,
        year: document.getElementById('year').value,
        englishDownloadUrl: document.getElementById('englishDownloadUrl').value,
        sinhalaDownloadUrl: document.getElementById('sinhalaDownloadUrl').value,
        posterUrl: document.getElementById('posterUrl').value,
        description: document.getElementById('description').value,
        uploadDate: document.getElementById('uploadDate').value,
        downloadCount: parseInt(document.getElementById('downloadCount').value) || 0,
        dateAdded: new Date().toISOString()
    };

    // Add to subtitles array
    subtitles.unshift(newSubtitle);

    // Update the display
    updateSubtitleCards();

    // Reset the form
    event.target.reset();
    document.getElementById('generatedId').value = '';
    document.getElementById('year').value = '';
    document.getElementById('downloadCount').value = '0';
}

// Create a single subtitle card
function createSubtitleCard(subtitle) {
    const card = document.createElement('div');
    card.className = 'subtitle-card';

    const uploadDate = new Date(subtitle.uploadDate).toLocaleDateString();
    const dateAdded = new Date(subtitle.dateAdded).toLocaleDateString();

    card.innerHTML = `
        <img src="${subtitle.posterUrl}" alt="${subtitle.title}" class="card-poster">
        <div class="card-content">
            <h3 class="card-title">${subtitle.title}</h3>
            <div class="card-meta">
                <div>${subtitle.category} | ${subtitle.language} | ${subtitle.year} | ${subtitle.fileType}</div>
                <div>${translations[currentLanguage]['upload-date']}: ${uploadDate}</div>
            </div>
            <p class="card-description">${subtitle.description}</p>
            <div class="download-links">
                <a href="${subtitle.englishDownloadUrl}" 
                   class="download-link" 
                   onclick="incrementDownloads('${subtitle.id}', 'english')">
                    ${translations[currentLanguage]['download']} (English)
                </a>
                <a href="${subtitle.sinhalaDownloadUrl}" 
                   class="download-link" 
                   onclick="incrementDownloads('${subtitle.id}', 'sinhala')">
                    ${translations[currentLanguage]['download']} (Sinhala)
                </a>
            </div>
            <div class="download-count">
                ${translations[currentLanguage]['downloads']}: ${subtitle.downloadCount}
            </div>
            <div class="date-added">
                ${translations[currentLanguage]['added']}: ${dateAdded}
            </div>
        </div>
    `;

    return card;
}

// Increment download count
function incrementDownloads(id, language) {
    const subtitle = subtitles.find(s => s.id === id);
    if (subtitle) {
        subtitle.downloadCount++;
        updateSubtitleCards();
    }
}

// Update the subtitle cards display
function updateSubtitleCards() {
    const container = document.getElementById('subtitleCards');
    container.innerHTML = '';

    if (subtitles.length === 0) {
        container.innerHTML = `<p class="no-subtitles">${translations[currentLanguage]['no-subtitles']}</p>`;
        return;
    }

    subtitles.forEach(subtitle => {
        const card = createSubtitleCard(subtitle);
        container.appendChild(card);
    });
}

// Increment download count
function incrementDownloads(id, type) {
    const subtitle = subtitles.find(s => s.id === id);
    if (subtitle) {
        subtitle.downloadCount++;
        updateSubtitleCards();
    }
}

// Function to format date according to current language
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 
                                 currentLanguage === 'si' ? 'si-LK' : 'ta-LK');
}

// Add some sample data (remove this in production)
function addSampleData() {
    const sampleSubtitles = [
        {
            id: 1,
            title: "Sample Movie 1",
            posterUrl: "https://via.placeholder.com/300x450",
            year: "2023",
            language: "English",
            fileType: ".srt",
            englishLink: "#",
            sinhalaLink: "#",
            description: "A sample movie description that showcases the layout and design of our subtitle cards.",
            uploadDate: new Date().toISOString(),
            downloadCount: 125
        },
        {
            id: 2,
            title: "නමුනා චිත්‍රපටය 2",
            posterUrl: "https://via.placeholder.com/300x450",
            year: "2023",
            language: "සිංහල",
            fileType: ".srt",
            englishLink: "#",
            sinhalaLink: "#",
            description: "සිංහල භාෂාවෙන් නිර්මාණය කරන ලද චිත්‍රපටයක් සඳහා උපසිරැසි.",
            uploadDate: new Date().toISOString(),
            downloadCount: 87
        }
    ];

    subtitles = sampleSubtitles;
    updateSubtitleCards();
}

// Add sample data when the page loads
addSampleData();