import conn from '../db/db.js';

const userModel = {
    addReferral: (userData, callback) => {
        const {meeting_id,referred_by,name,mobile,status} = userData;
        conn.query("INSERT INTO referrals (meeting_id,referred_by,name,mobile,status) VALUES(?,?,?,?,?)",[meeting_id,referred_by,name,mobile,status],callback);
    },
    getReferral: (callback) =>{
        conn.query("SELECT r.*,u.name as username FROM referrals AS r LEFT JOIN users AS u ON r.referred_by = u.id",callback);
    },
    getReferralbyid: (id,callback) =>{
        conn.query("SELECT r.*,u.name AS username FROM referrals AS r LEFT JOIN users AS u ON r.referred_by = u.id WHERE r.id=?",[id],callback);
    },
    updateReferral: (id,userData,callback) => {
        const {meeting_id,referred_by,name,mobile,status} = userData;
        conn.query("UPDATE referrals SET meeting_id=?,referred_by=?,name=?,mobile=?,status=? where id=?",[meeting_id,referred_by,name,mobile,status,id],callback);
    },
    deleteReferral: (id,callback)=>{
        conn.query("DELETE FROM referrals WHERE id=?",[id],callback);
    },
    getuserbyemail: (useremail,callback) =>{
        conn.query("SELECT u.*,m.id AS member_id,m.user_id, m.trade_category, m.company_name, m.referred_by, m.join_date, m.profile_image, m.company_logo, m.address, m.dob, m.socialmedia_link, m.status As member_status FROM users AS u LEFT JOIN members AS m ON u.id= m.user_id WHERE u.email=?",[useremail],callback);
    },
    addlog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"ADD REFERRAL","ADDED REFERRAL","referrals",referrenceid,ip_address],callback);
    },
    insertupdatelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"UPDATE REFERRAL","UPDATED REFERRAL","referrals",referrenceid,ip_address],callback);
    },
    insertdeletelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"DELETE REFERRAL","DELETED REFERRAL","referrals",referrenceid,ip_address],callback);
    },
}

export default userModel;