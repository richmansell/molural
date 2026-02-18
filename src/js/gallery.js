// Gallery management - Discord webhook submissions and carousel display

// Configuration - update this with your Discord webhook URL
const DISCORD_WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL_HERE';
const SUBMISSIONS_STORAGE_KEY = 'molural_submissions';

class GalleryManager {
    constructor(canvasManager) {
        this.canvasManager = canvasManager;
        this.submitBtn = document.getElementById('submitBtn');
        this.carouselContainer = document.getElementById('carouselImages');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentIndex = 0;
        this.submissions = [];

        this.setupEventListeners();
        this.loadSubmissions();
    }

    setupEventListeners() {
        this.submitBtn.addEventListener('click', () => this.handleSubmit());
        this.prevBtn.addEventListener('click', () => this.previousImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());
    }

    handleSubmit() {
        // Get canvas as JPEG
        const imageData = this.canvasManager.canvas.toDataURL('image/jpeg', 0.95);
        
        if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL === 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
            alert('Gallery submission not configured.\n\nTo enable submissions, ask the creator to set up a Discord webhook.');
            return;
        }

        this.submitBtn.disabled = true;
        this.submitBtn.textContent = '⏳ Submitting...';

        // Send to Discord webhook as file
        this.sendToDiscord(imageData);
    }

    sendToDiscord(imageData) {
        // Convert data URL to blob
        fetch(imageData)
            .then(res => res.blob())
            .then(blob => {
                const formData = new FormData();
                formData.append('file', blob, 'artwork.jpg');
                formData.append('payload_json', JSON.stringify({
                    content: '🎨 New artwork submitted!',
                    username: 'Molural Gallery'
                }));

                return fetch(DISCORD_WEBHOOK_URL, {
                    method: 'POST',
                    body: formData
                });
            })
            .then(response => {
                if (response.ok) {
                    this.submitBtn.textContent = '✅ Submitted!';
                    setTimeout(() => {
                        this.submitBtn.textContent = '🎨 Submit to Gallery';
                        this.submitBtn.disabled = false;
                    }, 2000);
                    
                    // Save to local storage
                    this.saveLocally(imageData);
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }
            })
            .catch(error => {
                console.error('Submission error:', error);
                this.submitBtn.textContent = '❌ Error - Try again';
                this.submitBtn.disabled = false;
                setTimeout(() => {
                    this.submitBtn.textContent = '🎨 Submit to Gallery';
                }, 3000);
            });
    }

    saveLocally(imageData) {
        const submission = {
            id: Date.now(),
            image: imageData,
            timestamp: new Date().toLocaleString()
        };

        this.submissions.unshift(submission); // Add to front
        if (this.submissions.length > 5) {
            this.submissions.pop(); // Keep only 5 latest
        }

        localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(
            this.submissions.map(s => ({ id: s.id, image: s.image, timestamp: s.timestamp }))
        ));

        this.renderCarousel();
    }

    loadSubmissions() {
        const stored = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
        if (stored) {
            this.submissions = JSON.parse(stored);
        }
        this.renderCarousel();
    }

    renderCarousel() {
        if (this.submissions.length === 0) {
            this.carouselContainer.innerHTML = '<p class="no-submissions">No submissions yet. Create and submit your first artwork!</p>';
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'none';
            return;
        }

        this.carouselContainer.innerHTML = '';

        // Show 5 images at a time
        for (let i = 0; i < Math.min(5, this.submissions.length); i++) {
            const idx = (this.currentIndex + i) % this.submissions.length;
            const submission = this.submissions[idx];
            
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'carousel-image-item';
            
            const img = document.createElement('img');
            img.src = submission.image;
            img.alt = `Submission ${submission.id}`;
            img.title = submission.timestamp;
            
            imgWrapper.appendChild(img);
            this.carouselContainer.appendChild(imgWrapper);
        }

        this.prevBtn.style.display = this.submissions.length > 5 ? 'block' : 'none';
        this.nextBtn.style.display = this.submissions.length > 5 ? 'block' : 'none';
    }

    previousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.submissions.length) % this.submissions.length;
        this.renderCarousel();
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.submissions.length;
        this.renderCarousel();
    }
}
