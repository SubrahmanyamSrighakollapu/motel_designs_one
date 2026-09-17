import mysql from 'mysql2/promise';
import 'dotenv/config';
export const pool=mysql.createPool({host:process.env.DB_HOST||'127.0.0.1',port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER||'motel_app',password:process.env.DB_PASSWORD,database:process.env.DB_NAME||'motel',waitForConnections:true,connectionLimit:10,queueLimit:100,dateStrings:true,timezone:'Z',charset:'utf8mb4',multipleStatements:false});
