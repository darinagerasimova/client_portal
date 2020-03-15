import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt'
import {User, validatePassword} from "../models/User";

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        User.findOne({username: username}).exec().then(async user => {
            if (!user) return done(null, false);
            if (!(await validatePassword(user, password))) return done(null, false);
            return done(null, user)
        }).catch(e => done(e));
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: 'secret'
    }, (jwtPayload, done) => {
        return User.findById(jwtPayload._id).exec().then(user => {
            if (!user) return done(null, false);
            return done(null, user)
        }).catch(e => {
            console.log(e);
            done(e)
        });
    }
));