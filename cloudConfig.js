const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Add debugging
console.log('Loading Cloudinary config with:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET'
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Test the config
console.log('Cloudinary configured with:', {
  cloud_name: cloudinary.config().cloud_name,
  api_key: cloudinary.config().api_key,
  api_secret: cloudinary.config().api_secret ? 'SET' : 'NOT SET'
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'wanderlust-listings',
    allowedFormats: ['jpeg', 'png', 'jpg'] // Changed from allowed_formats
  }
});

module.exports = {
  cloudinary,
  storage
};