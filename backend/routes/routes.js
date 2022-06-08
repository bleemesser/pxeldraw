const express = require('express');
const User = require('../models/User');
const router = express.Router();
const UserSchema = require('../models/User')
const ImageSchema = require('../models/Image')

router.get('/finduser', (req, res) => {
    UserSchema.findOne({
            username: req.body.username
        })
        .then((user) => {
            console.log(req)
            if (user == null) {
                res.send('your username cannot be null')
                console.log('user search for ' + req.body.username + ' failed')
            } else {
                console.log('sending user data for user ' + req.body.username)
                console.log(user)
                res.send(user)
            }
        })
        .catch((err) => {
            console.error(err)
            res.send('could not find user')
        })
})
router.get('/findallusers',(req,res) => {
    UserSchema.find({}) 
    .then((users) => {
        res.send(users)
    })
})
router.get('/findallimages', (req,res)=>{
    ImageSchema.find({})
    .then((images) => {
        //console.log('searching for images with owner ' + req.body.owner)
        //console.log(images)
        for (let i = 0; i < Object.keys(images).length; i++) { // removing delete keys from generally accessible query
            images[i].delkey = undefined
            images = JSON.parse(JSON.stringify(images))
            //console.log(images[i])
        }
        res.send(images)
    })
    .catch((err) => {
        console.error(err)
        res.send('image search failed')
    })
})
router.get('/findallimages-admin', (req,res)=>{
    ImageSchema.find({})
    .then((images) => {
        console.log("admin get request made")
        if (req.query.token === "password"){
            res.send(images)
        }
        else {
            res.send('access denied')
        }
        //console.log('searching for images with owner ' + req.body.owner)
        //console.log(images)
    })
    .catch((err) => {
        console.error(err)
        res.send('image search failed')
    })
})
router.get('/findimage', (req,res) => {
    ImageSchema.findOne({
        owner:req.query.owner,
        name:req.query.name
    })
    .then((image) =>{
        console.log("finding image with name " + req.query.name + " and owner " + req.query.owner)
        image.delkey = undefined;
        res.send(image);
    })
    .catch((err) => {
        console.error(err)
        res.send('image search failed')
    })
})
router.get('/findimages', (req, res) => {
    ImageSchema.find({
            owner: req.query.owner
        })
        .then((images) => {
            console.log('searching for images with owner ' + req.query.owner);
            //console.log(req)
            //console.log(images)
            for (let i = 0; i < Object.keys(images).length; i++) { // removing delete keys from generally accessible query
                images[i].delkey = undefined
                images = JSON.parse(JSON.stringify(images))
                //console.log(images[i])
            }
            res.send(images)
        })
        .catch((err) => {
            console.error(err)
            res.send('image search failed')
        })
})
router.post('/signup', (req, res) => {
    UserSchema.create({
            username: req.body.username,
            email: req.body.email
        })
        .then(() => {
            console.log('created user with name ' + req.body.username)
            res.send('success')
        })
        .catch((err) => {
            console.error(err)
            res.send('user creation failed')
        })
})
router.post('/login', (req, res) => {
    UserSchema.findOne({
            username: req.body.username,
            email: req.body.email
        })
        .then((user) => {
            if (user === null) {
                console.log('login failed for user ' + req.body.username)
                res.send(false)
            } else {
                console.log(req.body.username + " logged in")
                res.send(true)
            }
        })
        .catch((err) => {
            console.error(err)
            res.send('something went wrong while logging in')
        })
})
router.post('/saveimage', (req, res) => {

    ImageSchema.create({
            imageData:req.body.imageData,
            owner:req.body.owner,
            name:req.body.name,
            createdDate: new Date(),
            delkey: Math.random().toString(36).replace(/[^a-z]+/g, '')
        })
        .then((image) => {
            console.log('created new image owned by ' + req.body.owner)
            res.send('success')
        })
        .catch((err) => {
            console.log(req)

            console.error(err)
            res.send('something went wrong, try again')
        })
});
router.delete('/deluser', (req, res) => {
    UserSchema.deleteOne({
            username: req.body.username,
            email: req.body.email
        })
        .then(() => {
            console.log("deleting user " + req.body.username)
            res.send('deleted user')
        })
        .catch((err) => {
            console.error(err)
            res.send('failed')
        })
});
router.delete('/clearimg',(req,res)=> {
    ImageSchema.deleteMany({})
    .then(() => {
        console.log("cleared all images");
        res.send('success')
    })
    .catch((err) => {
        console.error(err)
        res.send('failed')
    })
});
router.delete('/clearuser',(req,res)=> {
    UserSchema.deleteMany({})
    .then(() => {
        console.log("cleared all users");
        res.send('success')
    })
    .catch((err) => {
        console.error(err)
        res.send('failed')
    })  
})
router.delete('/delimg', (req, res) => {
    ImageSchema.deleteOne({
            owner: req.body.owner,
            delkey: req.body.delkey
        })
        .then(() => {
            console.log("deleting image")
            res.send('deleted image')
        })
        .catch((err) => {
            console.error(err)
            res.send('failed')
        })
})
module.exports = router;