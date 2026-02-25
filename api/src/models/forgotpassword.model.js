import pool from '../db/db.js';

const userModel = {
    checkemail: async (userData) => {
        const { email } = userData;
        try {
            return new Promise((resolve, reject) => {
                pool.query("SELECT * FROM users WHERE email = ?", [email], (error, results) => {
                    if (error) {
                        console.error("Database error in checkemail:", error);
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        } catch (error) {
            console.error("Database error in checkemail:", error);
            throw error;
        }
    },
    
    updatepassword: async (userData1) => {
        const { email, password } = userData1;
        try {
            return new Promise((resolve, reject) => {
                pool.query("UPDATE users SET password = ? WHERE email = ?", [password, email], (error, results) => {
                    if (error) {
                        console.error("Database error in updatepassword:", error);
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        } catch (error) {
            console.error("Database error in updatepassword:", error);
            throw error;
        }
    },
}

export default userModel;