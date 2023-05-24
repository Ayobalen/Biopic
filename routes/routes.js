const express = require('express');
const router = express.Router()
const {  userAuth, CreateUser, LoginUser, checkRole } = require('../controllers/usercontroller');
const {Uploads, Download, FileAttribute, Delete, } = require('../controllers/uploadcontroller');
// var passport = require('passport')
// require('./passport')(passport)
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
//userAuth, 
async(req, res) => {
    await Uploads(req.user, req, res) 

});

router
.post('/download', 
//userAuth, 
async(req, res) => {
    await Download(req.user, req, res) 
});

 router.delete('/delete-unsafe-files', async(req, res) => { 
    await Delete(req.user, req, res)
 })

// router
// .route('/listfiles')
// .get(userAuth, checkRole(["admin"]), Listfiles)

// router
// .route('/filestatus')
// .delete(userAuth, checkRole(["admin"]), FileAttribute);

router
.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        res.json('successfully logged out')
    })
    res.clearCookie('connect.sid');
    
    //res.redirect('/')
});

module.exports = router;