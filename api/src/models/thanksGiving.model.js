import conn from '../db/db.js';

const userModel = {
    addThanknote: (userData, callback) => {
        const {meeting_id,given_by,given_to,amount,notes} = userData;
        conn.query("INSERT INTO thank_you_notes (meeting_id,given_by,given_to,amount,notes) VALUES(?,?,?,?,?)",[meeting_id,given_by,given_to,amount,notes],callback);
    },
     getThanksnote: (callback) =>{
        conn.query("SELECT m.meeting_title,ub.name AS given_by_name, ut.name AS given_to_name,t.amount,t.notes,t.created_at FROM thank_you_notes t LEFT JOIN users ub ON ub.id = t.given_by LEFT JOIN users ut ON ut.id = t.given_to LEFT JOIN meetings m ON m.id=meeting_id",callback);
    },
    getThanksnoteamount: (callback) =>{
        conn.query("SELECT sum(amount) AS totalamount FROM thank_you_notes",callback);
    },
    getThanksnotebyid: (id,callback) =>{
        conn.query("SELECT * FROM thank_you_notes WHERE id=?",[id],callback);
    },
    updateThanksnote: (id,userData,callback) => {
        const {meeting_id,given_by,given_to,amount,notes} = userData;
        conn.query("UPDATE thank_you_notes SET meeting_id=?,given_by=?,given_to=?,amount=?,notes=? where id=?",[meeting_id,given_by,given_to,amount,notes,id],callback);
    },
    deleteThanksnote: (id,callback)=>{
        conn.query("DELETE FROM thank_you_notes WHERE id=?",[id],callback);
    },
    getuserbyemail: (useremail,callback) =>{
        conn.query("SELECT u.*,m.id AS member_id,m.user_id, m.trade_category, m.company_name, m.referred_by, m.join_date, m.profile_image, m.company_logo, m.address, m.dob, m.socialmedia_link, m.status As member_status FROM users AS u LEFT JOIN members AS m ON u.id= m.user_id WHERE u.email=?",[useremail],callback);
    },
    addlog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"ADD THANK YOU NOTE","ADDED THANK YOU NOTE","thank_you_notes",referrenceid,ip_address],callback);
    },
    insertupdatelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"UPDATE THANK YOU NOTE","UPDATED THANK YOU NOTE","thank_you_notes",referrenceid,ip_address],callback);
    },
    insertdeletelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"DELETE THANK YOU NOTE","DELETED THANK YOU NOTE","thank_you_notes",referrenceid,ip_address],callback);
    },
    getUserTransactions: (useremail, callback) => {
        const query = `(SELECT 'Given' AS status, t.id, u2.name AS given_to_name, u.name AS given_by_name, m.meeting_title, t.amount FROM users AS u LEFT JOIN thank_you_notes AS t ON u.id = t.given_by LEFT JOIN users AS u2 ON u2.id = t.given_to LEFT JOIN meetings AS m ON m.id = t.meeting_id WHERE u.email = ? AND t.id IS NOT NULL) UNION ALL (SELECT 'Received' AS status, t.id, u.name AS given_to_name, u2.name AS given_by_name, m.meeting_title, t.amount FROM users AS u LEFT JOIN thank_you_notes AS t ON u.id = t.given_to LEFT JOIN users AS u2 ON u2.id = t.given_by LEFT JOIN meetings AS m ON m.id = t.meeting_id WHERE u.email = ? AND t.id IS NOT NULL) ORDER BY id DESC;
        `;
        conn.query(query, [useremail, useremail], callback);
    },
    getAllTransactions: (callback) => {
        const query = `SELECT t.id, COALESCE(m.meeting_title, 'General Meeting') AS meeting_title, giver.name AS given_by_name, receiver.name AS given_to_name, t.amount, 'Transaction' AS status FROM thank_you_notes t LEFT JOIN users giver ON giver.id = t.given_by LEFT JOIN users receiver ON receiver.id = t.given_to LEFT JOIN meetings m ON m.id = t.meeting_id WHERE t.id IS NOT NULL ORDER BY t.id DESC
            `;
        conn.query(query, callback);
    },
}

export default userModel;