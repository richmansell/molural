const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Get Discord token from environment variable
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = '1473826089959952602';

console.log('🔍 Debugging info:');
console.log(`- DISCORD_TOKEN set: ${!!DISCORD_TOKEN}`);
console.log(`- CHANNEL_ID: ${CHANNEL_ID}`);

async function fetchLatestImages() {
    try {
        console.log('📡 Fetching messages from Discord API...');
        const response = await axios.get(
            `https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=100`,
            {
                headers: {
                    'Authorization': `Bot ${DISCORD_TOKEN}`
                }
            }
        );

        console.log(`✓ Got ${response.data.length} messages from Discord`);

        // Extract images from messages
        const images = [];
        for (const message of response.data) {
            // Check message attachments
            if (message.attachments && message.attachments.length > 0) {
                console.log(`- Message ${message.id}: ${message.attachments.length} attachment(s)`);
                for (const attachment of message.attachments) {
                    if (attachment.content_type && attachment.content_type.startsWith('image/')) {
                        console.log(`  ✓ Found image: ${attachment.filename}`);
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

        // Save to JSON file at repo root
        const outputPath = path.join(__dirname, '..', 'gallery-data.json');
        fs.writeFileSync(outputPath, JSON.stringify({ images }, null, 2), 'utf8');
        console.log(`✓ Fetched ${images.length} images from Discord`);
        console.log(`✓ Saved to ${outputPath}`);

    } catch (error) {
        console.error('❌ Error fetching Discord images:');
        console.error(`- Status: ${error.response?.status}`);
        console.error(`- Message: ${error.message}`);
        if (error.response?.data) {
            console.error(`- Response: ${JSON.stringify(error.response.data)}`);
        }
        process.exit(1);
    }
}

fetchLatestImages();
