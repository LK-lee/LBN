import conn from '../db/db.js';

const userModel = {
    addattendance: (userData, callback) => {
        const {member_id,meeting_id,status} = userData;
        conn.query("INSERT INTO attendance (member_id,meeting_id,status) VALUES(?,?,?)",[member_id,meeting_id,status],callback);
    },
    getattendances: (callback) =>{
        conn.query("SELECT * FROM attendance",callback);
    },
    getattendancebyid: (id,callback) =>{
        conn.query("SELECT * FROM attendance WHERE id=?",[id],callback);
    },
    updateattendance: (id,userData,callback) => {
        const {member_id,meeting_id,status} = userData;
        conn.query("UPDATE attendance SET member_id=?,meeting_id=?,status=? WHERE id=?",[member_id,meeting_id,status,id],callback);
    },
    deleteattendance: (id,callback)=>{
        conn.query("DELETE FROM attendance WHERE id=?",[id],callback);
    },
    checkmeetingidinattendance: (checkmeetingid,callback) => {
        const {meeting_id} = checkmeetingid;
        conn.query("SELECT * FROM attendance WHERE meeting_id=?",[meeting_id],callback);
    },
    getuserbyemail: (useremail,callback) =>{
        conn.query("SELECT u.*,m.id AS member_id,m.user_id, m.trade_category, m.company_name, m.referred_by, m.join_date, m.profile_image, m.company_logo, m.address, m.dob, m.socialmedia_link, m.status As member_status FROM users AS u LEFT JOIN members AS m ON u.id= m.user_id WHERE u.email=?",[useremail],callback);
    },
    addlog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"ADD ATTENDANCE","ADDED ATTENDANCE","attendance",referrenceid,ip_address],callback);
    },
    insertupdatelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"UPDATE ATTENDANCE","UPDATED ATTENDANCE","attendance",referrenceid,ip_address],callback);
    },
    insertdeletelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"DELETE ATTENDANCE","DELETED ATTENDANCE","attendance",referrenceid,ip_address],callback);
    },
}

export default userModel;