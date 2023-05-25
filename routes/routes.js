const express = require('express');
const router = express.Router()
const {  CreateUser, LoginUser } = require('../controllers/usercontroller');
const {Uploads, Download, Unsafe, Delete } = require('../controllers/uploadcontroller');
const multer = require('multer');
const upload = multer({dest:'uploads/'})
const jwt = require("jsonwebtoken");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/authentication')

router
.post('/auth/register-user', async (req, res) => {
    await CreateUser("user", req, res)
});

  router
 .post('/auth/signin-user', async (req, res) => {
     await LoginUser("user", req, res);
 });

//admin
router
.post('/auth/register-admin', async (req, res) => {
    await CreateUser("admin", req, res)
});

router
.post('/auth/signin-admin', async (req, res) => {
    await LoginUser("admin", req, res);
});

router
.post('/upload',
verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin,
upload.single('image'),Uploads)

router
.post('/download', verifyToken,
Download);

router
.post('/unsafe', verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin ,
 Unsafe);

 router
    .delete('/delete-unsafe-files', Delete)
 
 

// router
// .route('/filestatus')
// .delete(userAuth, checkRole(["admin"]), FileAttribute);

module.exports = router;