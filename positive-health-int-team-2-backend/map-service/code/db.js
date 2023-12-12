import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'lfmerukkeiac5y5w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com', // Use the Docker service name
    user: 'b3dnby4powk1obc5',
    database: 'v3vogzlehrp1ucqr',
    password: 'xzpibaezgqlvionf',
    port: 3306, // Use the internal port of MySQL
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;