//Env Variables
require("dotenv").config();

//Libraries
import express from "express";
import cors from "cors"; //Cross Origin Server
import helmet from "helmet";

//Microservices Routes
import Auth from "./API/Auth";

// Database Connection
import ConnectDB from "./Database/connection";

const zomato = express();

//Application Middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());

//Application Routes
zomato.use("/auth", Auth);

zomato.get("/", (req,res)=> res.json({message: "Setup Success"}));
zomato.listen(4000, ()=> 
    ConnectDB().then(() => console.log("Server Is Running🚀"))
    .catch(() => console.log("Server is running without database connection😴😪..."))
);