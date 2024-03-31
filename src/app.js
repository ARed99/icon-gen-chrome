const sharp = require('sharp');
const imageUrl = document.getElementById("image-url").value;
const create_btn = document.getElementById('btn-create');
const IMAGE_ASPECT_RATIOS = {
    "16x16": 16,
    "24x24": 24,
    "32x32": 32,
    "48x48": 48,
    "57x57": 57,
    "64x64": 64,
    "72x72": 72,
    "96x96": 96,
    "120x120": 120,
    "128x128": 128,
    "144x144": 144,
    "152x152": 152,
    "195x195": 195,
    "228x228": 228,
    "256x256": 256,
    "512x512": 512,
    "1024x1024": 1024
};


function reizeImage(aspect_ratio) {
    sharp(imageUrl)
        .resize(aspect_ratio)
        .toBuffer()
        .then((data) => {
            console.log(`${aspect_ratio} : ${data}`)
        })
}

function start() {
    if (imageUrl === "") return;
    for (const image_ratio in IMAGE_ASPECT_RATIOS) {
        const aspect_ratio = IMAGE_ASPECT_RATIOS[image_ratio]

        reizeImage(aspect_ratio)
    }

}





create_btn.addEventListener('click', start())