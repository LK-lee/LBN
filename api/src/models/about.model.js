import conn from '../db/db.js';

const userModel = {
    addabout: (userData, callback) => {
        const { image, title, para1, para2, para3, para4 } = userData;

        const fields = ["image", "title", "para1", "para2"];
        const values = [image, title, para1, para2];

        if (para3) {
            fields.push("para3");
            values.push(para3);
        }

        if (para4) {
            fields.push("para4");
            values.push(para4);
        }

        const placeholders = fields.map(() => "?").join(",");

        const sql = `INSERT INTO about (${fields.join(",")}) VALUES (${placeholders})`;

        conn.query(sql, values, callback);
    },
    getabout: (callback) =>{
        conn.query("SELECT * FROM about",callback);
    },
    getaboutbyid: (id,callback) =>{
        conn.query("SELECT * FROM about WHERE id=?",[id],callback);
    },
    updateabout: (id, userData, callback) => {
        const { image, title, para1, para2, para3, para4 } = userData;

        const fields = [];
        const values = [];

        if (image) { fields.push("image=?"); values.push(image); }
        if (title) { fields.push("title=?"); values.push(title); }
        if (para1) { fields.push("para1=?"); values.push(para1); }
        if (para2) { fields.push("para2=?"); values.push(para2); }
        if (para3) { fields.push("para3=?"); values.push(para3); }
        if (para4) { fields.push("para4=?"); values.push(para4); }

        if (fields.length === 0) {
            return callback(null, { message: "No data to update" });
        }

        const sql = `UPDATE about SET ${fields.join(", ")} WHERE id=?`;
        values.push(id);

        conn.query(sql, values, callback);
    },
    deleteabout: (id,callback)=>{
        conn.query("DELETE FROM about WHERE id=?",[id],callback);
    }
}

export default userModel;