import conn from '../db/db.js';

const userModel = {
    checkchangepass: (userData, callback) =>{
        const {email} = userData;
        conn.query("SELECT * FROM users WHERE email= ?",[email],callback);
    },
    changepassword : (userData1, callback) =>{
        const {email, password} = userData1;
        conn.query("UPDATE users SET password = ? WHERE email = ?",[password,email],callback);
    },
    addlog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"CHANGE PASSWORD","PASSWORD CHANGED","users",referrenceid,ip_address],callback);
    },
    getuserbyemail: (email,callback) =>{
        conn.query("SELECT u.*,m.id AS member_id,m.user_id, m.trade_category, m.company_name, m.referred_by, m.join_date, m.profile_image, m.company_logo, m.address, m.dob, m.socialmedia_link, m.status As member_status FROM users AS u LEFT JOIN members AS m ON u.id= m.user_id WHERE u.email=?",[email],callback);
    },
}

export default userModel;