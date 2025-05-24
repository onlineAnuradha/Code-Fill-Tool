const translations = {
    'en': {
        'form-title': 'Add New Subtitle',
        'title': 'Title',
        'category': 'Category',
        'language': 'Language',
        'file-type': 'File Type',
        'year': 'Year',
        'english-download-url': 'English Subtitle Download URL',
        'sinhala-download-url': 'Sinhala Subtitle Download URL',
        'poster': 'Poster URL',
        'description': 'Description',
        'upload-date': 'Upload Date',
        'downloads': 'Downloads',
        'submit': 'Submit',
        'json-preview': 'Live JSON Preview',
        'subtitles': 'Subtitles'
    },
    'si': {
        'form-title': 'නව උපසිරැසි එකතු කරන්න',
        'title': 'මාතෘකාව',
        'category': 'වර්ගය',
        'language': 'භාෂාව',
        'file-type': 'ගොනු වර්ගය',
        'year': 'වර්ෂය',
        'english-download-url': 'ඉංග්‍රීසි උපසිරැසි බාගත කිරීමේ URL',
        'sinhala-download-url': 'සිංහල උපසිරැසි බාගත කිරීමේ URL',
        'poster': 'පෝස්ටර් URL',
        'description': 'විස්තරය',
        'upload-date': 'උඩුගත කළ දිනය',
        'downloads': 'බාගත කිරීම්',
        'submit-btn': 'උපසිරැසි එකතු කරන්න',
        'available-subtitles': 'පවතින උපසිරැසි',
        'download': 'බාගත කරන්න',
        'added': 'එකතු කළ දිනය'
    },
    'ta': {
        'form-title': 'புதிய வசன வரிகளைச் சேர்க்கவும்',
        'title': 'தலைப்பு',
        'category': 'வகை',
        'language': 'மொழி',
        'file-type': 'கோப்பு வகை',
        'year': 'ஆண்டு',
        'english-download-url': 'ஆங்கில வசன வரிகள் பதிவிறக்க URL',
        'sinhala-download-url': 'சிங்கள வசன வரிகள் பதிவிறக்க URL',
        'poster': 'போஸ்டர் URL',
        'description': 'விளக்கம்',
        'upload-date': 'பதிவேற்றிய தேதி',
        'downloads': 'பதிவிறக்கங்கள்',
        'submit-btn': 'வசன வரிகளைச் சேர்க்கவும்',
        'available-subtitles': 'கிடைக்கும் வசன வரிகள்',
        'download': 'பதிவிறக்கம்',
        'added': 'சேர்க்கப்பட்டது'
    }
};

let currentLanguage = 'en';

function changeLanguage(lang) {
    currentLanguage = lang;
    updatePageLanguage();
}

function updatePageLanguage() {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });

    // Update dynamic content
    updateSubtitleCards();
}