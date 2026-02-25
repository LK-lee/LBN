import conn from '../db/db.js';

const userModel = {
    checkLogin: (userData, callback) =>{
        const {role,email} = userData;
        conn.query("SELECT * FROM users WHERE role=? AND email= ?",[role,email],callback);
    },
}

export default userModel;