import multer from "multer"; // Import multer



// Multer configuration
const upload = multer({
    dest: 'uploads/' // Specify the upload directory
  });

export default upload;