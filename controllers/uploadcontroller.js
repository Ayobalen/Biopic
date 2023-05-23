  const File = require('../model/Filemodel');
  const User = require('../model/Usermodel');
  const cloudinary = require('cloudinary').v2;
 const { error } = require('console');
 const { response } = require('express');
 require('dotenv').config();
 const fs = require('fs');
 const multer = require('multer');
 const { v4: uuidv4 } = require('uuid');

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });

 // Set up Multer for file upload
const upload = multer({
    storage: multer.diskStorage({}),
    limits: {
      fileSize: 200 * 1024 * 1024, // 200MB
    },
  });

 // Upload file to Cloudinary
 exports.Uploads = async(req, res)=> {
    try{
  // Generate a unique filename for the uploaded file
   // Generate a unique filename for the uploaded file
   const filename = `${uuidv4()}_${req.file.originalname}`;
   // Upload file to Cloudinary
   const result = await cloudinary.uploader.upload(req.file.path, {
     folder: file_path, // Specify the folder name to store the file
     public_id: "uploads", // Set the public_id to the generated filename
   });
  //console.log(result)
   // Create a record in the database to store file details
   const file = await File.create({
     filename: result.original_filename,
     publicId: result.public_id,
   });

   // Remove the temporary file from the server
   fs.unlinkSync(req.file.path);

   console.log('File uploaded successfully', file );
}catch{
 if(error){
   console.log('Failed to upload file');
 }
}
// Express.js route for file download
exports.Download = async ( req, res) => {
    try{
    const fileId = req.params.fileId;

    // Retrieve file details from the database
    const file = await File.findByPk(fileId);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Generate a download URL for the specified file
    const downloadUrl = cloudinary.url(file.publicId);

    // Redirect to the download URL
    res.redirect(downloadUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to download file' });
  }
  };
}
