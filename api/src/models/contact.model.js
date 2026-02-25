import conn from '../db/db.js';

const userModel = {
    addcontacts: (userData, callback) => {
        const {first_name,last_name,email,mobile,trade,message} = userData;
        const date = new Date().toISOString().split('T')[0];
        conn.query("INSERT INTO contacts (first_name,last_name,email,mobile,trade,message,date) VALUES(?,?,?,?,?,?,?)",[first_name,last_name,email,mobile,trade,message,date],callback);
    },
    getcontacts: (callback) =>{
        conn.query("SELECT * FROM contacts ORDER BY id DESC",callback);
    },
    getcontactbyid: (id,callback) =>{
        conn.query("SELECT * FROM contacts WHERE id=?",[id],callback);
    },
    updatecontact: (id,userData,callback) => {
        const {first_name,last_name,email,mobile,trade,message} = userData;
        conn.query("UPDATE contacts SET first_name=?,last_name=?,email=?,mobile=?,trade=?,message=? WHERE id=?",[first_name,last_name,email,mobile,trade,message,id],callback);
    },
    deletecontact: (id,callback)=>{
        conn.query("DELETE FROM contacts WHERE id=?",[id],callback);
    },
    countofcontacts: (callback)=>{
        conn.query("SELECT COUNT(*) AS contactscount FROM contacts", callback);
    }
}

export default userModel;