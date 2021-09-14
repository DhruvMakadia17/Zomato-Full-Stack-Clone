//Env Variables
require("dotenv").config();

//Libraries
import express from "express";
import cors from "cors"; //Cross Origin Server
import helmet from "helmet";
import passport from "passport";

//Google Auth Configs
import googleAuthConfig from "./config/google.config";
//import routeConfig from "./config/route.config";

//Microservices Routes
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu";
import Image from "./API/Image";
import Order from "./API/Order";
import Reviews from "./API/Reviews";
import User from "./API/User";


// Database Connection
import ConnectDB from "./Database/connection";

const zomato = express();

//Application Middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

//Passport Config
googleAuthConfig(passport);
//routeConfig(passport);

//Application Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/review", Reviews);
zomato.use("/user", User);



zomato.get("/", (req,res)=> res.json({message: "Setup Success"}));
zomato.listen(4000, ()=> 
    ConnectDB().then(() => console.log("Server Is Running🚀"))
    .catch(() => console.log("Server is running without database connection😴😪..."))
);

