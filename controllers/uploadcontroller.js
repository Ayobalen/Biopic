    const File = require('../model/Filemodel');
    const cloudinary = require('cloudinary').v2;
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
  exports.Uploads = async (req, res) => {
    try {
      const { image } = req.body;
      const filename = `${uuidv4()}`;
      
      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        folder: 'uploads', // Specify the folder name to store the file
        public_id: filename, // Set the public_id to the generated filename
      });
    //  Create a record in the database to store file details
      const file = await File.create({
        filename: result.original_filename,
        publicId: result.public_id
      });
      return res.status(200).json({status :'success', result});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: 'error', message: 'Failed to upload file' });
    }
  };

  // Express.js route for file download
    exports.Download = async (req, res) => {
      try {
        const { publicId } = req.body;

        const downloadUrl = cloudinary.url(publicId, {
          secure: true,
          attachment: true,
        });

        res.status(200).json({ downloadUrl });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to download file' });
      }
    };

      exports.Unsafe = async (req, res) => {
        try{
      const file = await File.findOne(req.params.publicId);
      if(!file){
        return res.status(404).json({ status: 'error', message: 'File does not exist' });
      }
      file.is_safe = false;
      file.save();
      return res.status(200).json({ status: 'success', message: 'File marked as unsafe successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: 'error', message: 'Failed' });
    }
      }

      exports.Delete = async (req, res) => {
    try{
        // Get the list of unsafe files from Cloudinary
        const result = await cloudinary.api.resources({ type: 'upload', tags: 'is_safe:false' });

        // Iterate over the list and delete each file
        const deletePromises = result.resources.map((resource) => {
          return cloudinary.uploader.destroy(resource.public_id);
        });
        // Wait for all files to be deleted
        await Promise.all(deletePromises);
    
        res.status(200).json({ message: 'Unsafe files deleted successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 'error', message: 'Failed' });
    }
      };

    exports.History = async (req, res) => {
    try {
      // Retrieve the upload history using the Cloudinary API
      const result = await cloudinary.api.resources();


      // Extract the relevant file information from the result
      const files = result.resources.map(file => ({
        publicId: file.public_id,
        url: file.url,
        createdAt: file.created_at
      }));

      res.status(200).json({ message: 'Unsafe files deleted successfully', files });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 'error', message: 'Failed' });
    }
  }
    


