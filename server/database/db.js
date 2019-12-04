import pool from '../config/connect';


 const createTables = () => {
    const users = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(20) NOT NULL,
        lastname VARCHAR(20) NOT NULL,
        username VARCHAR(20) UNIQUE NOT NULL,
        phoneNumber VARCHAR(10) UNIQUE NOT NULL,
        email VARCHAR(30) UNIQUE NOT NULL,
        password VARCHAR(300) NOT NULL,
        is_admin BOOLEAN 
    );`
    const redflags = `
    CREATE TABLE IF NOT EXISTS redflags(
        id SERIAL PRIMARY KEY,
        created_on TIMESTAMP NOT NULL,
        title VARCHAR(20) NOT NULL,
        type VARCHAR(1000) NOT NULL,
        createdBy INTEGER NOT NULL,
        location  VARCHAR(20) NOT NULL,
        comment VARCHAR(1000) NOT NULL,
        status VARCHAR(50) NOT NULL,
        image VARCHAR(100)

    );`
    const queries = `${users};${redflags}`;
    pool.query(queries).then((res) => {
      console.log(res);
      pool.end();
      return res;
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
    
};
const dropTables = () => {
  const drop = `
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS redflags CASCADE;
  `;
  const Queries = `${drop}`;
  pool.query(Queries).then((res) => {
      pool.end();
      return res;
  })
      .catch((err) => {
          pool.end();
      });
};
export{createTables, dropTables};
require('make-runnable');
