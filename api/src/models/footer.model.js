import conn from '../db/db.js';

const userModel = {
    addfooter: (userData, callback) => {
        const {address,email,number,map} = userData;
        conn.query("INSERT INTO footer(address,email,number,map) VALUES(?,?,?,?)",[address,email,number,map],callback);
    },
    getfooters: (callback) =>{
        conn.query("SELECT * FROM footer",callback);
    },
    getfooterbyid: (id,callback) =>{
        conn.query("SELECT * FROM footer WHERE id=?",[id],callback);
    },
    updatefooter: (id,userData,callback) => {
        const {address,email,number,map} = userData;
        conn.query("UPDATE footer SET address=?,email=?,number=?,map=? WHERE id=?",[address,email,number,map,id],callback);
    },
    deletefooter: (id,callback)=>{
        conn.query("DELETE FROM footer WHERE id=?",[id],callback);
    },
}

export default userModel;