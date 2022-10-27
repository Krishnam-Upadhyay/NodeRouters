const path = require('path');
const PORT = process.env.PORT || 5000;
const express = require('express');
const app= express();
const {logger} = require('./middleware/logEvents');
const cors =require('cors');
const errorHandler = require('./middleware/errorHandler');




//custome middleware logger

//custome middleware

app.use(logger);

//cross origin resorce sharing
const whiteList = ['https://www.google.com','http.//127.0.0.1:5000','http://localhost:5000'];
const corsOptions ={
    origin:(origin,callback)=>{
        if(whiteList.indexOf(origin)!==-1 || !origin){
            callback(null,true)
        }else{
            callback(new Error('not allowed by cors'))
        }
    },
    optionSuccessStatus :200
}
app.use(cors(corsOptions));



app.use(express.urlencoded({extended:false}));

//built middleware for json

app.use(express.json());

//server static files
app.use('/',express.static(path.join(__dirname,'./public')));
app.use('/subdir',express.static(path.join(__dirname,'./public')));

app.use('/',require('./routes/root'));
app.use('/subdir',require('./routes/subdir'));
app.use('/employees',require('./routes/api/employees'))


app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})

app.use(errorHandler);
app.listen(PORT,()=>{
    console.log('server started on the port 5000');
})



 

