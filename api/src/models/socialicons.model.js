import conn from '../db/db.js';

const userModel = {
    addsocialicon: (userData, callback) => {
        const {icon_name,link} = userData;
        conn.query("INSERT INTO social_icons (icon_name,link,status) VALUES(?,?,?)",[icon_name,link,'1'],callback);
    },
    getsocialicons: (callback) =>{
        conn.query("SELECT * FROM social_icons",callback);
    },
    getsocialiconbyid: (id,callback) =>{
        conn.query("SELECT * FROM social_icons WHERE id=?",[id],callback);
    },
    updatesocialicon: (id,userData,callback) => {
        const {icon_name,link,status} = userData;
        conn.query("UPDATE social_icons SET icon_name=?,link=?,status=? WHERE id=?",[icon_name,link,status,id],callback);
    },
    deletesocialicon: (id,callback)=>{
        conn.query("DELETE FROM social_icons WHERE id=?",[id],callback);
    },
}

export default userModel;