// Get the client
import mysql from 'mysql2/promise';


const getConnection = async () => {
  // Create the connection to database
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodejspro',
    password: '123456',
    port: 3306
  });

  return connection;


}





export default getConnection;