
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


// Function to resize an image
function resizeImage(file, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
      // Create an image element
      const img = new Image();
      img.onload = function() {
        // Calculate new dimensions while preserving aspect ratio
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
  
        // Create a canvas element
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
  
        // Draw image on canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
  
        // Convert canvas to data URL
        const dataURL = canvas.toDataURL('image/jpeg'); // Change format if needed
  
        resolve(dataURL);
      };
      img.onerror = reject;
  
      // Load image from file
      img.src = URL.createObjectURL(file);
    });
  }
  







function start() {
  console.log("clicked")
     // Event listener for file input change
  document.getElementById('imageInput').addEventListener('change', async function(event) {
    document.getElementById('result-box').innerHTML = ''

    const file =  fetch(document.getElementById('imageInput').value).then((resp) => resp.blob)
   console.log(file)
    if (file) {
      try {
        for(const image_ratio in IMAGE_ASPECT_RATIOS)
        {
          const aspect_ratio = IMAGE_ASPECT_RATIOS[image_ratio]
          console.log(aspect_ratio)
       
        const resizedDataURL = await resizeImage(file, aspect_ratio, aspect_ratio);

        const image_element = document.createElement('img')
        const image_aspect_ratio = document.createElement('h3')
        image_aspect_ratio.innerText = image_ratio
        image_element.src = resizedDataURL;
        image_element.style.display = 'none';
        image_element.style.display = 'block';
        document.getElementById('result-box').append(image_element)
        document.getElementById('result-box').append(image_aspect_ratio)
        }
        
      } catch (error) {
        console.error('Error resizing image:', error);
      }
    }
  });
  

}







create_btn.addEventListener('click', start)