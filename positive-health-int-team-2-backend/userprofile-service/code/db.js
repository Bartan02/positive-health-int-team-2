import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'esilxl0nthgloe1y.chr7pe7iynqr.eu-west-1.rds.amazonaws.com', // Use the Docker service name
    user: 'hkww3s8g6etv632p',
    database: 'd71yhycrx0a45a6q',
    password: 'piljx82oqym8ior4',
    port: 3306, // Use the internal port of MySQL
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;