const sql = {};




const postAflag = `INSERT INTO redflags (created_on, title, type, createdBy, location, comment, status, image)
 VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
 const getAll = `SELECT * FROM redflags`;
 const findFlagbyId = `SELECT * FROM redflags WHERE id = $1`;
 const updateRedFlag = `UPDATE redflags SET location = $1  WHERE id = $2 AND status = 'draft'`;
 const deleteFlag = 'DELETE FROM redflags WHERE id = $1';





 sql.postAflag = postAflag;
 sql.getAll = getAll;
 sql.findFlagbyId = findFlagbyId;
 sql.updateRedFlag = updateRedFlag;
 sql.deleteFlag = deleteFlag;







export default sql;