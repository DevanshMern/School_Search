import mysql from "mysql"
import dotenv from "dotenv"
dotenv.config()
export const connection = mysql.createConnection({
    host: process.env.DB_host_name,
    user: process.env.DB_user_name,
    password: process.env.DB_user_password,
    database: process.env.DB_database_name
})
connection.connect(function (err) {
    if (err) {
        console.log("Error in the connection")
        console.log(err)
    }
    else {
        console.log(`Database Connected`)
    }
})