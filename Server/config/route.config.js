// import JwtPassport from "passport-jwt";
// import { UserModel } from "../Database/User";

// const JWTStrategy = JwtPassport.Strategy;
// const ExtractJwt = JwtPassport.ExtractJwt;

// const options = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: "ZomatoAPP",
// }

// export default (passport) => {
//     passport.UserModel ( new JWTStrategy(options, async(jwt_payload, done) => {
//             try {
//                 const doesUserExist = UserModel.findById(jwt_payload.user);
//                 if(!doesUserExist) return done(null, false);

//                 return done(null, doesUserExist);
//             } 
//             catch (error) {
//                 throw new Error(error);
//             }
//         })
//     );
// };