import app from './app.js';
import conn from './db/db.js';
import 'dotenv/config.js';

conn.connect((err)=>{
    if(err){
        console.log("Error");
    }else{
        console.log("Connected");
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running in the PORT ${process.env.PORT}`);
})