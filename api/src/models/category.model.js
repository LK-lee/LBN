import conn from '../db/db.js';

const userModel = {
    addcategory: (userData, callback) => {
        const {name} = userData;
        conn.query("INSERT INTO trade_category (name) VALUES(?)",[name],callback);
    },
    getcategory: (callback) =>{
        conn.query("SELECT * FROM trade_category WHERE id NOT IN (SELECT trade_category FROM members)",callback);
    },
    getallcategories: (callback) =>{
        conn.query("SELECT * FROM trade_category",callback);
    },
    getcategorybyid: (id,callback) =>{
        conn.query("SELECT * FROM trade_category WHERE id=?",[id],callback);
    },
    updatecategory: (id,userData,callback) => {
        const {name} = userData;
        conn.query("UPDATE trade_category SET name=? WHERE id=?",[name,id],callback);
    },
    deletecategory: (id,callback)=>{
        conn.query("DELETE FROM trade_category WHERE id=?",[id],callback);
    },
    getuserbyemail: (useremail,callback) =>{
        conn.query("SELECT u.*,m.id AS member_id,m.user_id, m.trade_category, m.company_name, m.referred_by, m.join_date, m.profile_image, m.company_logo, m.address, m.dob, m.instagram_link,m.linkedin_link,m.whatsapp_link, m.status As member_status FROM users AS u LEFT JOIN members AS m ON u.id= m.user_id WHERE u.email=?",[useremail],callback);
    },
    addlog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"ADD CATEGORY","ADDED CATEGORY","trade_category",referrenceid,ip_address],callback);
    },
    insertupdatelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"UPDATE CATEGORY","UPDATED CATEGORY","trade_category",referrenceid,ip_address],callback);
    },
    insertdeletelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"DELETE CATEGORY","DELETED CATEGORY","trade_category",referrenceid,ip_address],callback);
    },
}

export default userModel;