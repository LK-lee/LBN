import conn from '../db/db.js';

const userModel = {
    addmeetings: (userData, callback) => {
        const {meeting_title,meeting_date,meeting_type,meeting_time,meeting_mode,meeting_place,status} = userData;
        conn.query("INSERT INTO meetings (meeting_title,meeting_date,meeting_type,meeting_time,meeting_mode,meeting_place,status) VALUES(?,?,?,?,?,?,?)",[meeting_title,meeting_date,meeting_type,meeting_time,meeting_mode,meeting_place,status],callback);
    },
    getmeetings: (callback) =>{
        conn.query("SELECT m.*,COUNT(a.status) AS total_attendance,SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_count,SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) AS absent_count FROM meetings AS m LEFT JOIN attendance AS a ON m.id = a.meeting_id GROUP BY m.id ORDER BY m.id DESC",callback);
    },
    getmeetingid: (callback) =>{
        const date = new Date().toISOString().split('T')[0];
        conn.query("SELECT * FROM meetings WHERE meeting_date=?",[date],callback);
    },
    getmembersattendance: (id,callback) => {
        conn.query("SELECT m.id,m.meeting_date, m.meeting_time,m.meeting_type,m.meeting_mode,m.meeting_place,a.status, u.name,u.email FROM meetings AS m INNER JOIN attendance AS a ON m.id = a.meeting_id INNER JOIN users AS u ON a.member_id = u.id WHERE m.id = ?", [id],callback);
    },
    getmeetingbyid: (id,callback) =>{
        conn.query("SELECT * FROM meetings WHERE id=?",[id],callback);
    },
    updatemeeting: (id,userData,callback) => {
        const {meeting_title,meeting_date,meeting_type,meeting_time,meeting_mode,meeting_place,status} = userData;
        conn.query("UPDATE meetings SET meeting_title=?,meeting_date=?,meeting_type=?,meeting_time=?,meeting_mode=?,meeting_place=?,status=? WHERE id=?",[meeting_title,meeting_date,meeting_type,meeting_time,meeting_mode,meeting_place,status,id],callback);
    },
    deletemeeting: (id,callback)=>{
        conn.query("DELETE FROM meetings WHERE id=?",[id],callback);
    },
    countofmeetings: (callback)=>{
        conn.query("SELECT COUNT(*) AS meetingscount FROM meetings", callback);
    },
    getuserbyemail: (useremail,callback) =>{
        conn.query("SELECT u.*,m.id AS member_id,m.user_id, m.trade_category, m.company_name, m.referred_by, m.join_date, m.profile_image, m.company_logo, m.address, m.dob, m.socialmedia_link, m.status As member_status FROM users AS u LEFT JOIN members AS m ON u.id= m.user_id WHERE u.email=?",[useremail],callback);
    },
    addlog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"ADD MEETING","ADDED MEETING","meetings",referrenceid,ip_address],callback);
    },
    insertupdatelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"UPDATE MEETING","UPDATED MEETING","meetings",referrenceid,ip_address],callback);
    },
    insertdeletelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"DELETE MEETING","DELETED MEETING","meetings",referrenceid,ip_address],callback);
    },
}

export default userModel;