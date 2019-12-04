const sql = {};




const postAflag = `INSERT INTO redflags (created_on, title, type, createdBy, location, comment, status, image)
 VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
 const getAll = `SELECT * FROM redflags`;
 const findFlagbyId = `SELECT * FROM redflags WHERE id = $1`;
 const updateLocation = `UPDATE redflags SET location = $1  WHERE id = $2 `;
 const updateComment = `UPDATE redflags SET comment = $1  WHERE id = $2 `;
 const changeStatus = `UPDATE redflags SET status = $1 WHERE id = $2 `;
 const deleteFlag = 'DELETE FROM redflags WHERE id = $1';





 sql.postAflag = postAflag;
 sql.getAll = getAll;
 sql.findFlagbyId = findFlagbyId;
 sql.updateLocation = updateLocation;
 sql.updateComment = updateComment;
 sql.changeStatus = changeStatus;
 sql.deleteFlag = deleteFlag;







export default sql;