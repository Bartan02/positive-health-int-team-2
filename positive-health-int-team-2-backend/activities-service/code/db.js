import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'exbodcemtop76rnz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com', // Use the Docker service name
    user: 'kh98s0ttzeqkl9co',
    database: 'c0yta5zrjsskpyia',
    password: 'ficum10h8xfj1bs9',
    port: 3306, // Use the internal port of MySQL
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;