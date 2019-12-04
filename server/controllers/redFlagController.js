import { validateRedFlag, validateModify} from '../validations/redFlagValidation';
import responseMessage from '../helpers/response';
import moment from 'moment';
import pool from '../config/connect';
import sql from '../helpers/redFlagQuery';



class RedFlags {
    static async postRedFlag(req, res) {
        const { error } = validateRedFlag.validation(req.body);
        if (error) { 
          const message = error.details.map(item => item.message.replace(/"/g, '')).join(', ');
          return responseMessage.errorMessage(res, 400,  message);}
        const { title, type, location, comment, image} = req.body;
        const created_on = moment().format('LL');
        const createdby =  req.user.id;
        const status = 'draft';
        const result = await pool.query(sql.postAflag, [ created_on , title, type, createdby, location, comment, status, image]);
        return responseMessage.successUser(res, 201, 'Created red flag record', {created_on, title, type, createdby, location, comment, status, image});
      }

 // GetAll//
static async getAll(req, res) {
    const redflags = await pool.query(sql.getAll);
  if (!redflags.rows[0]) { return responseMessage.errorMessage(res, 404, 'no red flags found'); }
  else { return responseMessage.successUser(res, 200, redflags.rows); }
}

// GetOne//
static async getOne(req, res) {
    const id = req.params.id;
    const {rows} = await pool.query(sql.findFlagbyId, [id]);
    if (!rows.length > 0) { return responseMessage.errorMessage(res, 404, 'red flag not found') }
    else { return responseMessage.successUser(res, 200, rows[0]); }
  }

 // Update Location //
static async updateLocation(req, res) {
    const { error } = validateModify.validation(req.body);
    if (error) {  
    const message = error.details.map(item => item.message.replace(/"/g, '')).join(', ');
    return responseMessage.errorMessage(res, 400,  message);} 
    
    const flagId = req.params.id;
    const findFlag = await pool.query(sql.findFlagbyId, [flagId]);
    if(findFlag.rowCount===0){return responseMessage.errorMessage(res, 404, 'red flag of that ID is not found');}
    
    if(findFlag.rows[0].status !== 'draft'){return responseMessage.errorMessage(res, 400, 'Sorry you are not allowed to change the location');}
    
    if(findFlag.rows[0].createdby !== req.user.id) {return responseMessage.errorMessage(res, 400, 'you are not allowed to update this redflag location you are not the owner!');}
    await pool.query(sql.updateLocation, [req.body.location, flagId]);
    const{id, title, type, createdby} = findFlag.rows[0];
    return responseMessage.successUser(res, 200, "updated red-flag record's location", {
        id, title, type, createdby,location: req.body.location})
    }
// Update comment //
static async updateComment(req, res) {
    const { error } = validateModify.validation(req.body);
    if (error) {  
    const message = error.details.map(item => item.message.replace(/"/g, '')).join(', ');
    return responseMessage.errorMessage(res, 400,  message);} 
    
    const flagId = req.params.id;
    const findFlag = await pool.query(sql.findFlagbyId, [flagId]);
    if(findFlag.rowCount===0){ return responseMessage.errorMessage(res, 404, 'red flag of that ID is not found');}
    
    if(findFlag.rows[0].status !== 'draft'){return responseMessage.errorMessage(res, 400, 'Sorry you are not allowed to change the location');}
    
    if(findFlag.rows[0].createdby !== req.user.id) {return responseMessage.errorMessage(res, 400, 'you are not allowed to update this redflag comment you are not the owner!');}
    await pool.query(sql.updateComment, [req.body.comment, flagId]);
    const{id, title, type, createdby, location} = findFlag.rows[0];
    return responseMessage.successUser(res, 200, "updated red-flag record's comment", {
        id, title, type, createdby, location, comment: req.body.comment})
    }

// Status //
static async changeStatus(req, res) {
    if(req.user.is_admin !== true){ return responseMessage.errorMessage(res, 403, 'Sorry this service is strictly for the admin')}
    
    const flagId = req.params.id;
    const findFlag = await pool.query(sql.findFlagbyId, [flagId]);
    if(findFlag.rowCount===0){return responseMessage.errorMessage(res, 404, 'red flag of that ID is not found');}
    
    if(findFlag.rows[0].status !== 'draft'){return responseMessage.errorMessage(res, 400, 'Sorry you are not allowed to change the status');}
    await pool.query(sql.changeStatus, [req.body.status, flagId]);
    return responseMessage.successUser(res, 200, "updated red-flag record's status", {status : req.body.status})

}
  
// Delete One //
  
static async deleteRedflag(req, res) {
    const flagid = req.params.id;
    const findFlag = await pool.query(sql.findFlagbyId, [flagid]);
    if (findFlag.rowCount===0) { return responseMessage.errorMessage(res, 404, 'red flag with that ID is not found'); }
    if (findFlag.rows[0].createdby !== req.user.id) {
      return responseMessage.errorMessage(res, 400, 'you are not allowed to delete this record!')}
      await pool.query(sql.deleteFlag, [flagid]);
     return responseMessage.successWithNoData(res, 200, 'red-flag record has been deleted')
    }
  }
  
 export default RedFlags;