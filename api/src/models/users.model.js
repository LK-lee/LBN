import conn from '../db/db.js';

const userModel = {
    addusers: (userData, callback) => {
        const {name,email,password,mobile,role,status} = userData;
        conn.query("INSERT INTO users (name,email,password,mobile,role,status) VALUES(?,?,?,?,?,?)",[name,email,password,mobile,role,status],callback);
    },
    addmembers: (userData1, callback) => {
        const {user_id,referred_by,status,trade_category,company_name,join_date,address,dob,instagram_link,linkedin_link,whatsapp_link,profile_image,company_logo} = userData1;
        let columns = ["user_id","status","trade_category","company_name","join_date","address","dob","profile_image","company_logo"];
        let values = [user_id,status,trade_category,company_name,join_date,address,dob,profile_image,company_logo];
        if (referred_by) {
            columns.push("referred_by");
            values.push(referred_by);
        }
        if (instagram_link) {
            columns.push("instagram_link");
            values.push(instagram_link);
        }
        if (linkedin_link) {
            columns.push("linkedin_link");
            values.push(linkedin_link);
        }
        if (whatsapp_link) {
            columns.push("whatsapp_link");
            values.push(whatsapp_link);
        }
        const placeholders = columns.map(() => "?").join(",");
        const sql = `INSERT INTO members (${columns.join(",")}) VALUES (${placeholders})`;
        conn.query(sql, values, callback);
    },
    getusers: (callback) =>{
        conn.query("SELECT u.*,m.id AS mem_id,m.user_id, m.trade_category,t.name AS trade_category_name, m.company_name, m.referred_by, m.join_date, m.profile_image, m.company_logo, m.address, m.dob, m.instagram_link,m.linkedin_link,m.whatsapp_link, m.status As member_status FROM users AS u LEFT JOIN members AS m ON u.id= m.user_id LEFT JOIN trade_category AS t ON m.trade_category = t.id",callback);
    },
    getmembers: (callback) =>{
        conn.query("SELECT * FROM members",callback);
    },
    getuserbyid: (id,callback) =>{
        conn.query("SELECT u.*,m.id AS mem_id,m.user_id, m.trade_category,t.name AS trade_category_name, m.company_name, m.referred_by, m.join_date, m.profile_image, m.company_logo, m.address, m.dob, m.instagram_link,m.linkedin_link,m.whatsapp_link, m.status As member_status FROM users AS u LEFT JOIN members AS m ON u.id= m.user_id LEFT JOIN trade_category AS t ON m.trade_category = t.id WHERE u.id=?",[id],callback);
    },
    updateuser: (id,userData,callback) => {
        const {name,email,mobile,role,status} = userData;
        conn.query("UPDATE users SET name=?,email=?,mobile=?,role=?,status=? WHERE id=?",[name,email,mobile,role,status,id],callback);
    },
    updatemembers: (userData1, callback) => {
        const {user_id,status,trade_category,company_name,join_date,address,dob,instagram_link,linkedin_link,whatsapp_link,profile_image,company_logo,referred_by} = userData1;

        let fields = [];
        let values = [];

        if (status) {
            fields.push("status = ?");
            values.push(status);
        }
        if (trade_category) {
            fields.push("trade_category = ?");
            values.push(trade_category);
        }
        if (company_name) {
            fields.push("company_name = ?");
            values.push(company_name);
        }
        if (join_date) {
            fields.push("join_date = ?");
            values.push(join_date);
        }
        if (address) {
            fields.push("address = ?");
            values.push(address);
        }
        if (dob) {
            fields.push("dob = ?");
            values.push(dob);
        }
        fields.push("instagram_link = ?");
        values.push(instagram_link || null); // If empty, set to null

        fields.push("linkedin_link = ?");
        values.push(linkedin_link || null); // If empty, set to null

        fields.push("whatsapp_link = ?");
        values.push(whatsapp_link || null);
        // if (instagram_link) {
        //     fields.push("instagram_link = ?");
        //     values.push(instagram_link);
        // }
        // if (linkedin_link) {
        //     fields.push("linkedin_link = ?");
        //     values.push(linkedin_link);
        // }
        // if (whatsapp_link) {
        //     fields.push("whatsapp_link = ?");
        //     values.push(whatsapp_link);
        // }
        if (profile_image) {
            fields.push("profile_image = ?");
            values.push(profile_image);
        }
        if (company_logo) {
            fields.push("company_logo = ?");
            values.push(company_logo);
        }

        if (referred_by) {
            fields.push("referred_by = ?");
            values.push(referred_by);
        }

        if (!fields.length) {
            return callback({ message: "No fields to update" }, null);
        }

        const sql = `UPDATE members SET ${fields.join(", ")} WHERE user_id = ?`;
        values.push(user_id);

        conn.query(sql, values, callback);
    },
    deleteuser: (id,callback)=>{
        conn.query("DELETE FROM users WHERE id=?",[id],callback);
    },
    deletemember: (user_id,callback)=>{
        conn.query("DELETE FROM members WHERE user_id=?",[user_id],callback);
    },
    checkemailrole: (userData, callback) => {
        const {email,role} = userData;
        conn.query("SELECT * FROM users WHERE email=? AND role=?",[email,role],callback);
    },
    getuserbyemail: (useremail,callback) =>{
        conn.query("SELECT u.*,m.id AS member_id,m.user_id, m.trade_category,t.name AS trade_name, m.company_name, m.referred_by, m.join_date, m.profile_image, m.company_logo, m.address, m.dob, m.instagram_link,m.linkedin_link,m.whatsapp_link, m.status As member_status FROM users AS u LEFT JOIN members AS m ON u.id= m.user_id LEFT JOIN trade_category AS t ON m.trade_category = t.id WHERE u.email=?",[useremail],callback);
    },
    getuseremail: (email,callback) =>{
        conn.query("SELECT u.*,m.id AS member_id,m.user_id, m.trade_category, m.company_name, m.referred_by, m.join_date, m.profile_image, m.company_logo, m.address, m.dob, m.instagram_link,m.linkedin_link,m.whatsapp_link, m.status As member_status FROM users AS u LEFT JOIN members AS m ON u.id= m.user_id WHERE u.email=?",[email],callback);
    },
    addlog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"ADD MEMBER","ADDED MEMBER","members & users",referrenceid,ip_address],callback);
    },
    insertupdatelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"UPDATE MEMBER","UPDATED MEMBER","members & users",referrenceid,ip_address],callback);
    },
    insertdeletelog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"DELETE MEMBER","DELETED MEMBER","members & users",referrenceid,ip_address],callback);
    },
    insertloginlog: (logData,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"LOGIN SUCCESS","MEMBER LOGINED","users",referrenceid,ip_address],callback);
    },
    insertloginfailedlog: (logData1,callback)=>{
        const {userid,memberid,role,referrenceid,ip_address} = logData1;
        conn.query("INSERT INTO application_logs(user_id,member_id,user_type,action,description,reference_table,reference_id,ip_address) VALUES(?,?,?,?,?,?,?,?)",[userid,memberid,role,"LOGIN FAILED","MEMBER LOGIN FAILED","users",referrenceid,ip_address],callback);
    },
    getapplog: (callback)=>{
        conn.query("SELECT * FROM application_logs ORDER BY id DESC",callback);
    },
    totalusers: (callback)=>{
        conn.query("SELECT COUNT(*) as totalusers FROM users",callback);
    },
    deleteLogsByDate: (startDate, endDate, callback) => {
        const sql = `DELETE FROM application_logs WHERE DATE(created_at) BETWEEN ? AND ?`;
        conn.query(sql, [startDate, endDate], callback);
    },
}

export default userModel;