import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'activities-db', // Use the Docker service name
    user: 'activity123',
    database: 'activities_db',
    password: 'activity123123',
    port: 3306, // Use the internal port of MySQL
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;