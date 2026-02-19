const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Get Discord token from environment variable
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = '1473826089959952602';
const IMAGES_DIR = path.join(__dirname, '..', 'gallery-images');

console.log('🔍 Debugging info:');
console.log(`- DISCORD_TOKEN set: ${!!DISCORD_TOKEN}`);
console.log(`- CHANNEL_ID: ${CHANNEL_ID}`);

// Ensure gallery-images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

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
            console.log(`\nMessage ${message.id}:`);
            console.log(`  - Attachments: ${message.attachments?.length || 0}`);
            
            // Check message attachments
            if (message.attachments && message.attachments.length > 0) {
                for (const attachment of message.attachments) {
                    if (attachment.content_type && attachment.content_type.startsWith('image/')) {
                        console.log(`  ✓ Found image: ${attachment.filename}`);
                        
                        // Download image
                        const imageBuffer = await axios.get(attachment.url, { responseType: 'arraybuffer' });
                        const ext = path.extname(attachment.filename) || '.jpg';
                        const localFilename = `${message.id}${ext}`;
                        const localPath = path.join(IMAGES_DIR, localFilename);
                        
                        fs.writeFileSync(localPath, imageBuffer.data);
                        console.log(`  ✓ Saved to: ${localFilename}`);
                        
                        images.push({
                            url: `https://richmansell.github.io/molural/gallery-images/${localFilename}`,
                            timestamp: new Date(message.timestamp).toLocaleString(),
                            filename: attachment.filename,
                            messageId: message.id
                        });
                        
                        if (images.length >= 5) break;
                    }
                }
            }
            
            // Also check embeds for image URLs (fallback)
            if (images.length < 5 && message.embeds && message.embeds.length > 0) {
                for (const embed of message.embeds) {
                    if (embed.image?.url) {
                        console.log(`  ✓ Found embed image`);
                        
                        try {
                            const imageBuffer = await axios.get(embed.image.url, { responseType: 'arraybuffer' });
                            const localFilename = `embed_${message.id}.jpg`;
                            const localPath = path.join(IMAGES_DIR, localFilename);
                            
                            fs.writeFileSync(localPath, imageBuffer.data);
                            console.log(`  ✓ Saved embed to: ${localFilename}`);
                            
                            images.push({
                                url: `https://richmansell.github.io/molural/gallery-images/${localFilename}`,
                                timestamp: new Date(message.timestamp).toLocaleString(),
                                filename: embed.title || 'embed-image',
                                messageId: message.id
                            });
                        } catch (e) {
                            console.log(`  ✗ Failed to download embed image`);
                        }
                        
                        if (images.length >= 5) break;
                    }
                }
            }
            
            if (images.length >= 5) break;
        }

        // Save to JSON file at repo root
        const outputPath = path.join(__dirname, '..', 'gallery-data.json');
        fs.writeFileSync(outputPath, JSON.stringify({ images }, null, 2), 'utf8');
        console.log(`\n✓ Fetched ${images.length} images from Discord`);
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
