import mysql from 'mysql';

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lbn_website",
    port: "3306"
})

export default conn;