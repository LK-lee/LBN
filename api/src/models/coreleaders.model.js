import conn from '../db/db.js';

const userModel = {
   addleaders: (leadersData, callback) => {

        const values = leadersData.map(item => [
            item.member_id,
        
            item.designation,
            item.status
        ]);

        const sql = `
            INSERT INTO core_leaders
            (member_id,designation, status)
            VALUES ?
        `;

        conn.query(sql, [values], callback);
    },
    // getleaders: (callback) => {
    //     const sql = `
    //         SELECT cl.id,r.name AS designation,cl.status FROM core_leaders cl JOIN members m ON cl.member_id = m.id
    //         JOIN roles r ON cl.designation = r.id
    //     `;

    //     conn.query(sql, callback);
    // },
    // getmemberstoaddcoreleaders: (callback) => {
    //     conn.query("SELECT u.id, u.name FROM users u WHERE u.status = 'active' AND u.id IN ( SELECT member_id FROM core_leaders)",callback);
    // },
    // getdesignationstoaddcoreleaders: (callback) => {
    //     // conn.query("SELECT r.id, r.name FROM roles r WHERE r.id IN ( SELECT designation FROM core_leaders WHERE designation IS NOT NULL AND designation != r.id )",callback);
    //     conn.query("SELECT r.id, r.name FROM roles r LEFT JOIN core_leaders c ON r.id = c.designation WHERE c.designation IS NULL OR r.name = 'Coordinator'",callback);
    // },
    getmemberstoaddcoreleaders: (callback) => {
        conn.query(`
        SELECT u.id, u.name 
        FROM users u
        INNER JOIN members m ON u.id = m.user_id
        WHERE u.status = 'active'
    `, callback);
    },
    getdesignationstoaddcoreleaders: (callback) => {
       conn.query(`
        SELECT r.id, r.name 
        FROM roles r
        WHERE r.id = 4
        OR r.id NOT IN (
            SELECT designation 
            FROM core_leaders 
            WHERE designation IS NOT NULL
        )
    `, callback);
    },
    getcoreleaders: (callback)=>{
        conn.query("SELECT c.id , u.name, r.name AS designation,c.status FROM core_leaders AS c INNER JOIN users AS u ON c.member_id = u.id INNER JOIN roles AS r ON c.designation= r.id",callback);
    },
    getleaderbyid: (id,callback) =>{
        conn.query("SELECT * FROM core_leaders WHERE id=?",[id],callback);
    },
    updateleader: (id,userData,callback) => {
        const {member_id,designation,status} = userData;
        conn.query("UPDATE core_leaders SET member_id=?,  designation=?, status=? WHERE id=?",[member_id,designation,status,id],callback);
    },
    deleteleader: (id,callback)=>{
        conn.query("DELETE FROM core_leaders WHERE id=?",[id],callback);
    },
    getuserbyemail: (useremail,callback) =>{
        conn.query("SELECT u.*,m.id AS member_id,m.user_id, m.trade_category, m.company_name, m.referred_by, m.join_date, m.profile_image, m.company_logo, m.address, m.dob, m.socialmedia_link, m.status As member_status FROM users AS u LEFT JOIN members AS m ON u.id= m.user_id WHERE u.email=?",[useremail],callback);
    },
    addlog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"ADD CORE LEADER","ADDED CORE LEADER","core_leaders",referrenceid,ip_address],callback);
    },
    insertupdatelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"UPDATE CORE LEADER","UPDATED CORE LEADER","core_leaders",referrenceid,ip_address],callback);
    },
    insertdeletelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"DELETE CORE LEADER","DELETED CORE LEADER","core_leaders",referrenceid,ip_address],callback);
    },
}

export default userModel;