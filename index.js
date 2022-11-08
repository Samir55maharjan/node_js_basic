
import express from "express";
const app = express();
const PORT=8000;
// const EventEmitter = require("events");
import path from "path";
import fs from 'fs'
// import { addAbortSignal } from "stream";


const __dirname = path.resolve();

app.use(express.urlencoded());

const fn =__dirname + "/userList.csv";

app.get("/",(req, res)=>{
    
    res.sendFile(__dirname + "/src/regForm.html");
    

   
});


app.post("/", (req, res)=> {
    const {email, password}= req.body;
    const dataStr=`${email},${password}\n`;
    console.log(dataStr);

    fs.appendFile(fn, dataStr,  (error)=>{
        error && console.log(error);
        console.log("check the file");
    });
    // console.log("form received");
    res.send(`<h1>form received</h1>
    <p> <a href ="/loging"> Login now</a>
    </p>`);
})

app.get("/loging", (req, res)=> {
    res.sendFile(__dirname + "/src/loginForm.html");

    app.post("/loging", (req, res)=>{
        const {email, password}=req.body;
        const dataStr = `${email},${password}`;
    })
    fs.readFile(fn, (error, data) =>{
        error && console.log(error);
        const userList =data. toString();
        const usrArg = userList.split("\n");
        usrArg.includes(dataStr)
         ? res.send("logged in")
         : res.send("Invalid logged in info");
    
    })
    

});

app.listen(PORT, (error)=>{
    error 
    ?console.log(error)
    : console.log(`your server running at http://localhost:${PORT}`);
});