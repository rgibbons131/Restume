// Must install passport, passport-google-oauth2, and express-session
const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/login', (req, res) => {
    res.send("<a href='/auth/google'> Authenticate with Google: </a>")
})

router.get('/auth/google', 
    passport.authenticate('google', {scope: ['email', 'profile'] })
);

// What is the home page to successfully redirect to?
router.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/api-docs',
        failureRedirect: '/auth/failure'
    })
);

router.get('/auth/failure', (req, res) => {
    res.send('Something went wrong.')
})

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });

    req.session.destroy()
    res.send('Goodbye')
});

module.exports = router;