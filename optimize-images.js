const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const optimizedDir = path.join(__dirname, 'assets', 'optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir);
}

// Image optimization settings
const optimizationSettings = {
    quality: 80,
    width: 1200, // Max width for images
    format: 'webp'
};

// Process each image
async function optimizeImages() {
    const files = fs.readdirSync(assetsDir);
    
    for (const file of files) {
        if (file.match(/\.(png|jpg|jpeg)$/i)) {
            const inputPath = path.join(assetsDir, file);
            const outputPath = path.join(optimizedDir, `${path.parse(file).name}.webp`);
            
            try {
                await sharp(inputPath)
                    .resize(optimizationSettings.width, null, {
                        withoutEnlargement: true,
                        fit: 'inside'
                    })
                    .webp({ quality: optimizationSettings.quality })
                    .toFile(outputPath);
                
                console.log(`Optimized ${file} -> ${path.basename(outputPath)}`);
            } catch (error) {
                console.error(`Error optimizing ${file}:`, error);
            }
        }
    }
}

optimizeImages().catch(console.error); 