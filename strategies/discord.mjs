import passport from "passport";
import { Strategy } from "passport-local"; // discord, 3rd-party..


passport.use(
    new Strategy({
        clientID: 'u get from the 3rd-party',
        clientSecret: 'u get from the 3rd-party',
        callbackURL: 'u get from the 3rd-party',
        scope: ['identify', 'guilds'] //
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
    }
    )
)