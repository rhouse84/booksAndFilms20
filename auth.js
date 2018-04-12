const GoogleStrategy = require('passport-google-oauth-2').OAuth2Strategy;
require('dotenv');
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            callbackURL: process.env.CALLBACKURL
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
}; 