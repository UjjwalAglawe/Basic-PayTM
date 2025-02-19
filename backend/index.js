const express = require('express');
const mainRouter=require("./routes/index");
require("./db");
const cors = require("cors");

const app=express();
// app.use(cors());

app.use(cors({ 
    origin: "*",  
    methods: ["GET", "POST", "PUT", "DELETE"],  
    allowedHeaders: ["Content-Type", "Authorization"]  
}));

app.use(express.json());

console.log("hi");

app.use("/api/v1",mainRouter);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});