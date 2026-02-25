import conn from '../db/db.js';

const userModel = {
    addrole: (userData, callback) => {
        const {name,description} = userData;
        conn.query("INSERT INTO roles (name,description) VALUES(?,?)",[name,description],callback);
    },
    getroles: (callback) =>{
        conn.query("SELECT * FROM roles",callback);
    },
    getrolebyid: (id,callback) =>{
        conn.query("SELECT * FROM roles WHERE id=?",[id],callback);
    },
    updaterole: (id,userData,callback) => {
        const {name,description} = userData;
        conn.query("UPDATE roles SET name=?,description=? WHERE id=?",[name,description,id],callback);
    },
    deleterole: (id,callback)=>{
        conn.query("DELETE FROM roles WHERE id=?",[id],callback);
    },
    getuserbyemail: (useremail,callback) =>{
        conn.query("SELECT u.*,m.id AS member_id,m.user_id, m.trade_category, m.company_name, m.referred_by, m.join_date, m.profile_image, m.company_logo, m.address, m.dob, m.socialmedia_link, m.status As member_status FROM users AS u LEFT JOIN members AS m ON u.id= m.user_id WHERE u.email=?",[useremail],callback);
    },
    addlog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"ADD ROLE","ADDED ROLE","roles",referrenceid,ip_address],callback);
    },
    insertupdatelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"UPDATE ROLE","UPDATED ROLE","roles",referrenceid,ip_address],callback);
    },
    insertdeletelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"DELETE ROLE","DELETED ROLE","roles",referrenceid,ip_address],callback);
    },
}

export default userModel;