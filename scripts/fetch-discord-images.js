const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Get Discord token from environment variable
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = '1473826089959952602';

async function fetchLatestImages() {
    try {
        const response = await axios.get(
            `https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=100`,
            {
                headers: {
                    'Authorization': `Bot ${DISCORD_TOKEN}`
                }
            }
        );

        // Extract images from messages
        const images = [];
        for (const message of response.data) {
            // Check message attachments
            if (message.attachments && message.attachments.length > 0) {
                for (const attachment of message.attachments) {
                    if (attachment.content_type && attachment.content_type.startsWith('image/')) {
                        images.push({
                            url: attachment.url,
                            timestamp: new Date(message.timestamp).toLocaleString(),
                            filename: attachment.filename
                        });
                        if (images.length >= 5) break;
                    }
                }
            }
            if (images.length >= 5) break;
        }

        // Save to JSON file
        const outputPath = path.join(__dirname, 'gallery-data.json');
        fs.writeFileSync(outputPath, JSON.stringify({ images }, null, 2), 'utf8');
        console.log(`✓ Fetched ${images.length} images from Discord`);

    } catch (error) {
        console.error('Error fetching Discord images:', error.message);
        process.exit(1);
    }
}

fetchLatestImages();
