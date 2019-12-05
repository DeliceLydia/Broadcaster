const sql = {};


const addUser = `INSERT INTO users(firstname, lastname, username, phoneNumber, email, password) 
VALUES ( $1, $2, $3, $4, $5, $6) Returning*`; 
const addAdmin = `INSERT INTO adminTable(firstname, lastname, username, phoneNumber, email, password, is_admin) 
VALUES ( $1, $2, $3, $4, $5, $6, $7) Returning*`; 
const findUser =  `SELECT * FROM users WHERE email = $1`;
const findUsername =  `SELECT * FROM users WHERE username = $1`;
const findNumber =  `SELECT * FROM users WHERE phoneNUmber = $1`;





sql.addUser = addUser;
sql.addAdmin = addAdmin;
sql.findUser = findUser;
sql.findUsername = findUsername;
sql.findNumber = findNumber;


export default sql;