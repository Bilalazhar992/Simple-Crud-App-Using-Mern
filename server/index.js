require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const productroutes=require("./routes/productRoutes")
const userroutes=require("./controllers/userControllers")



// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/user", userroutes);
app.use("/api/products", productroutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));